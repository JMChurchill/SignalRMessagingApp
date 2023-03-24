using ChatService.Models;

namespace ChatRepository
{
    public interface IRoomRepository
    {
        public Task<Room?> GetRoom(int roomId);
        public Task<List<Room>> GetRooms();
        public Task<bool> AddRoom(string name);
        public Task<bool> EditRoom(int id, string name);
        public Task<bool> DeleteRoom(int id);
    }
}
