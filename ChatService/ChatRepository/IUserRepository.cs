using ChatService.Models;

namespace ChatRepository
{
    public interface IUserRepository
    {
        public Task<int?> GetUserId(string userName);
        public Task<User> GetUser(int userId);
        public Task<User> GetUser(string username);
        public Task<bool> CreateUser(User newUser);
        public Task<bool> UpdateUser(int userId, string newName);
        public Task<List<User>> GetUsers();
        public Task<bool> DeleteUser(int userId);
    }
}
