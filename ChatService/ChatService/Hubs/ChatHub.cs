using ChatDatabase;
using ChatDataTypes.DTOs;
using ChatRepository;
using ChatService.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace ChatService.Hubs
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ChatHub : Hub
    {
        private readonly string _botUser;
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IRoomRepository _roomRepository;
        private readonly IDictionary<string, UserConnection> _connections;

        public ChatHub(IDictionary<string, UserConnection> connections, IMessageRepository messageRepository, IUserRepository userRepository, IRoomRepository roomRepository)
        {
            _botUser = "Chat Bot";
            _connections = connections;
            _messageRepository = messageRepository;
            _userRepository = userRepository;
            _roomRepository = roomRepository;
        }

        public override async Task<Task> OnDisconnectedAsync(Exception? exception)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Random rand = new Random();
                int number = rand.Next(0, 100);

                var roomName = (await _roomRepository.GetRoom(userConnection.RoomId)).Name;

                Message newMessage = new Message { Id = -1 * (number + 99), Text = $"{userConnection.User} has left {roomName}", User = new User { Name = _botUser } };

                Clients.Group(userConnection.RoomId.ToString()).SendAsync("ReceiveMessage", newMessage);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                var newMessage = await _messageRepository.CreateMessage(userConnection.RoomId, message, (int)userConnection.UserId);
                await Clients.Groups(userConnection.RoomId.ToString()).SendAsync("ReceiveMessage", newMessage);
            }
        }

        public async Task<bool> JoinRoom(UserConnectionDTO newUserConnection)
        {
            throw new HubException( message:"Woops");
            //throw new HubException("breaking the thing");
            var userIdString = Context.User.FindFirstValue(ClaimTypes.GroupSid);
            if(userIdString == null) throw new HubException("mainError", new HubException("reason"));
            if (!int.TryParse(userIdString, out int userId)) return false;
            if (userId != 0)
            {
                // get username from db
                var user = await _userRepository.GetUser(userId);
                UserConnection userConnection = new UserConnection { UserId = userId, RoomId = newUserConnection.RoomId, User = user.Name };
                userConnection.UserId = (int)userId;
                await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.RoomId.ToString());

                var roomName = (await _roomRepository.GetRoom(userConnection.RoomId)).Name;

                _connections[Context.ConnectionId] = userConnection;

                Random rand = new Random();
                int number = rand.Next(0, 100);

                Message newMessage = new Message { Id = -1 * (number + 99), Text = $"{userConnection.User} has joined {roomName}", User = new User { Name = _botUser } };

                await Clients.Group(userConnection.RoomId.ToString()).SendAsync("ReceiveMessage", newMessage);

                await SendConnectedUsers(userConnection.RoomId);
                return true;
            }
            else
            {
                return false;
            }

        }

        public Task SendConnectedUsers(int roomId)
        {
            var users = _connections.Values.Where(c => c.RoomId == roomId).Select(c => c.User).ToList();

            return Clients.Group(roomId.ToString()).SendAsync("UsersInRoom", users);
        }
    }
}
