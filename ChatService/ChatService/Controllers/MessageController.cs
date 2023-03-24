using ChatDatabase;
using ChatRepository;
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
        private readonly IMessageRepository _messageRepository;

        public MessageController(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }
        [HttpGet("room/{roomId}")]
        public async Task<ActionResult<List<Message>>> Get(int roomId)
        {
            var messages = await _messageRepository.GetDetailedMessagesByRoom(roomId);
            if (messages is null) return BadRequest("Unable to get messages");

            return Ok(messages);
        }
    }
}
