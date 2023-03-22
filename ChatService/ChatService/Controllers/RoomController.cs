using ChatDatabase;
using ChatService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly DataContext _context;
        public RoomController(DataContext dataContext)
        {
            _context = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Room>>> Get()
        {
            return Ok(await _context.Rooms.ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> Get(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room is null) return BadRequest("Room not found");
            return Ok(room);
        }
        [HttpPost]
        public async Task<ActionResult<List<Room>>> AddRoom(string name)
        {
            Room newRoom = new Room { Name = name };
            _context.Rooms.Add(newRoom);
            await _context.SaveChangesAsync();
            return Ok(await _context.Rooms.ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<Room>>> EditRoom(int id, string name)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room is null) return BadRequest("Room not found");

            room.Name = name;
            await _context.SaveChangesAsync();

            return Ok(await _context.Rooms.ToListAsync());
        }
        [HttpDelete]
        public async Task<ActionResult<List<Room>>> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room is null) return BadRequest("Room not found");
            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return Ok(await _context.Rooms.ToListAsync());
        }
    }
}
