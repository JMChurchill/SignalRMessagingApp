using ChatDataTypes.DTO;
using ChatRepository;
using ChatService.Models;
using ChatService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public AuthController(IConfiguration configuration, IUserService userService, ITokenService tokenService, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository, IRefreshTokenRepository refreshTokenRepository)
        {
            _configuration = configuration;
            _userService = userService;
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
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
            
            // Check if user exists
            if (await _userRepository.GetUser(user.Username) is not null) return BadRequest("User already exists");

            // Create user object
            User newUser = new User { Name = user.Username };
            // Add user to DB
            if (await _userRepository.CreateUser(newUser)) return Ok(newUser.Name);
            return BadRequest("User could not be created");
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDTO loginUser)
        {
            // Check if user exists (just want to test JWT auth no need to create passwords)
            User User = await _userRepository.GetUser(loginUser.Username);
            if (User is null) return BadRequest("User does not exist");

            // Create token
            string token = _tokenService.CreateToken(User);

            // refresh token lasts for 1 days
            var refreshToken = _tokenService.CreateRefreshToken(User);
            if (refreshToken is null) return BadRequest();

            // add token to db
            var isUpdated = await _refreshTokenRepository.AddToken(refreshToken);

            if (!isUpdated) return BadRequest();

            _tokenService.setRefreshToken(refreshToken.Token, _httpContextAccessor);

            return Ok(token);
        }

        [HttpGet("refresh")]
        public async Task<ActionResult<string>> Refresh()
        {
            string? refreshToken = _httpContextAccessor?.HttpContext?.Request.Cookies["refreshToken"];

            if (refreshToken is null)  return Unauthorized();

            // check if valid
            var storedToken = await _refreshTokenRepository.GetToken(refreshToken);

            if (storedToken is null) return Unauthorized();

            /// if refresh token valid use refresh token to generate new JWT
            // Check if token expired
            bool isLive = _tokenService.CheckTokenIsNotExpired(refreshToken);
            if (!isLive) return Unauthorized();

            var userId = _tokenService.GetUserId(refreshToken);
            if (userId == 0) return Unauthorized();

            User user = await _userRepository.GetUser(userId);
            

            string newToken = _tokenService.CreateToken(user);

            return Ok(newToken);
        }


    }
}
