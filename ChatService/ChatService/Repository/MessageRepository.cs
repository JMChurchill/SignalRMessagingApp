using ChatDatabase;
using ChatService.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Repository
{
    public class MessageRepository
    {
        private readonly DataContext _context;
        public MessageRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<List<Message>?> GetMessagesByRoom(int roomId)
        {
            var room = await _context.Messages.Where(m => m.RoomId == roomId).ToListAsync();
            if (room is null) return null;
            return room;
        }
        public async Task<List<Message>?> GetDetailedMessagesByRoom(int roomId)
        {
            var room = await _context.Messages.Where(m => m.RoomId == roomId).Include(m => m.User).ToListAsync();
            if (room is null) return null;
            return room;
        }
        public async Task<Message> CreateMessage(int roomId, string message, int userId)
        {
            Message newMessage = new Message() { Text = message, RoomId = roomId, UserId = userId};
            _context.Messages.Add(newMessage);
            await _context.SaveChangesAsync();
            return newMessage;
        }

    }
}
