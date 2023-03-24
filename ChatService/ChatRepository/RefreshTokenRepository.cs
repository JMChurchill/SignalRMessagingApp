using ChatDatabase;
using ChatDataTypes;
using ChatRepository;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Repository
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly DataContext _context;
        public RefreshTokenRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<RefreshToken?> GetToken(string refreshToken)
        {
            var token = await _context.RefreshTokens.Where(rt=> rt.Token == refreshToken).FirstOrDefaultAsync();
            return token;
        }

        public async Task<bool> AddToken(RefreshToken refreshToken)
        {
            await _context.RefreshTokens.AddAsync(refreshToken);
            var updated = _context.SaveChanges();

            if (updated > 0) return true;
            return false;
        }
    }
}
