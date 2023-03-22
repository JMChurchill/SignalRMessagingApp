using ChatDatabase;
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
    }
}
