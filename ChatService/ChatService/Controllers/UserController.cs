using ChatDatabase;
using ChatService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext dataContext)
        {
            _context = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _context.Users.ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user is null) return BadRequest("User not found");
            return Ok(user);
        }
        [HttpPost]
        public async Task<ActionResult<List<User>>> AddUser(string name)
        {
            User newUser = new User { Name = name };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<User>>> EditUser(int id, string name)
        {
            User newUser = new User { Name = name };
            var user = await _context.Users.FindAsync(id);
            if (user is null) return BadRequest("User not found");

            user.Name = name;
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }
        [HttpDelete]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user is null) return BadRequest("User not found");
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }
    }
}
