using ChatService.Models;

namespace ChatRepository
{
    public interface IMessageRepository
    {
        public Task<List<Message>?> GetMessagesByRoom(int roomId);
        public Task<List<Message>?> GetDetailedMessagesByRoom(int roomId);
        public Task<Message> CreateMessage(int roomId, string message, int userId);
    }
}
