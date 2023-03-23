using ChatDatabase;
using ChatDataTypes.DTO;
using ChatService.Models;
using ChatService.Repository;
using ChatService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static System.Net.WebRequestMethods;

namespace ChatService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthController(DataContext dataContext, IConfiguration configuration, IUserService userService, ITokenService tokenService, IHttpContextAccessor httpContextAccessor)
        {
            _context = dataContext;
            _configuration = configuration;
            _userService = userService;
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
        }
        [HttpGet, Authorize]
        public ActionResult<string> getFromToken()
        {
            var username = _userService.GetId();
            return Ok(username);
        }
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(UserDTO user)
        {
            UserRepository userRepository = new UserRepository(_context);
            // Check if user exists
            if (await userRepository.GetUser(user.Username) is not null) return BadRequest("User already exists");

            // Create user object
            User newUser = new User { Name = user.Username };
            // Add user to DB
            if (await userRepository.CreateUser(newUser)) return Ok(newUser.Name);
            return BadRequest("User could not be created");
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDTO loginUser)
        {
            UserRepository userRepository = new UserRepository(_context);
            // Check if user exists (just want to test JWT auth no need to create passwords)
            User User = await userRepository.GetUser(loginUser.Username);
            if (User is null) return BadRequest("User does not exist");

            // Create token
            string token = _tokenService.CreateToken(User);

            // refresh token lasts for 1 days
            var refreshToken = _tokenService.CreateRefreshToken(User);
            if (refreshToken is null) return BadRequest();

            RefreshTokenRepository refreshRepository = new RefreshTokenRepository(_context);

            // add token to db
            var isUpdated = await refreshRepository.AddToken(refreshToken);

            if (!isUpdated) return BadRequest();

            _tokenService.setRefreshToken(refreshToken.Token, _httpContextAccessor);

            return Ok(token);
        }

        [HttpGet("refresh")]
        public async Task<ActionResult<string>> Refresh()
        {
            string? refreshToken = _httpContextAccessor?.HttpContext?.Request.Cookies["refreshToken"];

            if (refreshToken is null)  return Unauthorized();

            RefreshTokenRepository refreshTokenRepository = new RefreshTokenRepository(_context);
            // check if valid
            var storedToken = await refreshTokenRepository.GetToken(refreshToken);

            if (storedToken is null) return Unauthorized();

            /// if refresh token valid use refresh token to generate new JWT
            // Check if token expired
            bool isLive = _tokenService.CheckTokenIsNotExpired(refreshToken);
            if (!isLive) return Unauthorized();

            var userId = _tokenService.GetUserId(refreshToken);
            if (userId == 0) return Unauthorized();

            UserRepository userRepository = new UserRepository(_context);
            User user = await userRepository.GetUser(userId);
            

            string newToken = _tokenService.CreateToken(user);

            return Ok(newToken);
        }


    }
}
