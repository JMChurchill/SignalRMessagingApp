using ChatDataTypes;
using ChatService.Models;

namespace ChatService.Services
{
    public interface ITokenService
    {
        bool CheckTokenIsNotExpired(string refreshToken);
        string CreateToken(User user);
        RefreshToken CreateRefreshToken(User user);
        void setRefreshToken(string token, IHttpContextAccessor http);
        int GetUserId(string token);
    }
}
