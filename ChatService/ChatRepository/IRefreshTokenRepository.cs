using ChatDataTypes;

namespace ChatRepository
{
    public interface IRefreshTokenRepository
    {
        public Task<RefreshToken?> GetToken(string refreshToken);
        public Task<bool> AddToken(RefreshToken refreshToken);
    }
}
