using ChatDatabase;
using ChatService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessageController : ControllerBase
    {
        private readonly DataContext _context;
        public MessageController(DataContext dataContext)
        {
            _context = dataContext;
        }
        [HttpGet("room/{roomId}")]
        public async Task<ActionResult<List<Message>>> Get(int roomId)
        {
            var messages = await _context.Messages.Where(m=>m.RoomId == roomId).Include(m => m.User).ToListAsync();
            if (messages is null) return BadRequest("Unable to get messages");
            return Ok(messages);
        }
    }
}
