using ChatDatabase;
using ChatRepository;
using ChatService.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<int?> GetUserId(string userName)
        {
            var user = await _context.Users.Where(u => u.Name == userName).FirstOrDefaultAsync();
            if (user is null) return null;
            return user.Id;
        }
        public async Task<User> GetUser(int userId)
        {
            var user = await _context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            if (user is null) return null;
            return user;
        }
        public async Task<User> GetUser(string username)
        {
            var user = await _context.Users.Where(u => u.Name == username).FirstOrDefaultAsync();
            if (user is null) return null;
            return user;
        }
        public async Task<bool> CreateUser(User newUser)
        {
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateUser(int userId, string newName)
        {
            var user = await GetUser(userId);
            user.Name = newName;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> DeleteUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
