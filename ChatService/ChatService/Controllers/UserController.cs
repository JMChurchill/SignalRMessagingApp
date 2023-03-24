using ChatRepository;
using ChatService.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _userRepository.GetUsers());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = await _userRepository.GetUser(id);
            if (user is null) return BadRequest("User not found");

            return Ok(user);
        }
        [HttpPost]
        public async Task<ActionResult<List<User>>> AddUser(string name)
        {
            User newUser = new User { Name = name };
            await _userRepository.CreateUser(newUser);

            return Ok(await _userRepository.GetUsers());
        }
        [HttpPut]
        public async Task<ActionResult<List<User>>> EditUser(int id, string name)
        {
            var user = await _userRepository.GetUser(id);
            if (user is null) return BadRequest("User not found");

            if (!await _userRepository.UpdateUser(id, name)) return BadRequest("Unable to update user");

            return Ok(await _userRepository.GetUsers());
        }
        [HttpDelete]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var user = await _userRepository.GetUser(id);
            if (user is null) return BadRequest("User not found");

            if (!await _userRepository.DeleteUser(id)) return BadRequest("Unable to delete user");

            return Ok(await _userRepository.GetUsers());
        }
    }
}
