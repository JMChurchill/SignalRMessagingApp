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
    public class RoomController : ControllerBase
    {
        private readonly IRoomRepository _roomRepository;

        public RoomController(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Room>>> Get()
        {
            return Ok(await _roomRepository.GetRooms());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> Get(int id)
        {
            var room = await _roomRepository.GetRoom(id);
            if (room is null) return BadRequest("Room not found");
            return Ok(room);
        }
        [HttpPost]
        public async Task<ActionResult<List<Room>>> AddRoom(string name)
        {
            if (!await _roomRepository.AddRoom(name)) return BadRequest("Unable to add room");
            return Ok(await _roomRepository.GetRooms());
        }
        [HttpPut]
        public async Task<ActionResult<List<Room>>> EditRoom(int id, string name)
        {
            var room = await _roomRepository.GetRoom(id);
            if (room is null) return BadRequest("Room not found");

            if (! await _roomRepository.EditRoom(id, name)) return BadRequest("Unable to edit room");

            return Ok(await _roomRepository.GetRooms());
        }
        [HttpDelete]
        public async Task<ActionResult<List<Room>>> DeleteRoom(int id)
        {
            var room = await _roomRepository.GetRoom(id);
            if (room is null) return BadRequest("Room not found");

            if (!await _roomRepository.DeleteRoom(id)) return BadRequest("Unable to delete room");

            return Ok(await _roomRepository.GetRooms());
        }
    }
}
