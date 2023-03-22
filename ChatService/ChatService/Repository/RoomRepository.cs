using ChatDatabase;
using ChatService.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Repository
{
    public class RoomRepository
    {
        private readonly DataContext _context;
        public RoomRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<Room?> GetRoom(int roomId)
        {
            var room = await _context.Rooms.FindAsync(roomId);
            if (room is null) return null;
            return room;
        }
    }
}
