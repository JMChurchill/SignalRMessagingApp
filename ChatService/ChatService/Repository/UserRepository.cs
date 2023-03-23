using ChatDatabase;
using ChatDataTypes.DTO;
using ChatService.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Repository
{
    public class UserRepository
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
    }
}
