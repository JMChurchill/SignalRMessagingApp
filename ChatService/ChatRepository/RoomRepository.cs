using ChatDatabase;
using ChatRepository;
using ChatService.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Repository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly DataContext _context;
        public RoomRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<bool> AddRoom(string name)
        {
            Room newRoom = new Room { Name = name };
            _context.Rooms.Add(newRoom);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteRoom(int id)
        {
            var room = await GetRoom(id);
            if (room is null) return false;
            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> EditRoom(int id, string name)
        {
            var room = await GetRoom(id);
            if (room is null) return false;

            room.Name = name;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Room?> GetRoom(int roomId)
        {
            var room = await _context.Rooms.FindAsync(roomId);
            if (room is null) return null;
            return room;
        }

        public async Task<List<Room>> GetRooms()
        {
            return await _context.Rooms.ToListAsync();
        }
    }
}
