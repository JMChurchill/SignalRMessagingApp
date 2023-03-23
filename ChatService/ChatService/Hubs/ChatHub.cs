﻿using ChatDatabase;
using ChatDataTypes.DTO;
using ChatService.Models;
using ChatService.Repository;
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
        private readonly DataContext _context;
        MessageRepository _messageRepository;
        UserRepository _userRepository;
        private readonly IDictionary<string, UserConnection> _connections;

        public ChatHub(IDictionary<string, UserConnection> connections, DataContext context)
        {
            _botUser = "Chat Bot";
            _connections = connections;
            _context = context;
            _messageRepository = new MessageRepository(context);
            _userRepository = new UserRepository(context);
        }

        public override async Task<Task> OnDisconnectedAsync(Exception? exception)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Random rand = new Random();
                int number = rand.Next(0, 100);

                RoomRepository roomRepository = new RoomRepository(_context);
                var roomName = (await roomRepository.GetRoom(userConnection.RoomId)).Name;

                Message newMessage = new Message { Id = -1 * (number + 99), Text = $"{userConnection.User} has left {roomName}", User = new User { Name = _botUser } };

                //await Clients.Group(userConnection.RoomId.ToString()).SendAsync("ReceiveMessage", newMessage);

                Clients.Group(userConnection.RoomId.ToString()).SendAsync("ReceiveMessage", newMessage);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                var messages = await _messageRepository.GetDetailedMessagesByRoom(userConnection.RoomId);
                var newMessage = await _messageRepository.CreateMessage(userConnection.RoomId, message, (int)userConnection.UserId);
                await Clients.Groups(userConnection.RoomId.ToString()).SendAsync("ReceiveMessage", newMessage);
            }
        }

        public async Task<bool> JoinRoom(UserConnectionDTO newUserConnection)
        {
            var userIdString = Context.User.FindFirstValue(ClaimTypes.GroupSid);

            if (!int.TryParse(userIdString, out int userId)) return false;
            //var userId = await _userRepository.GetUserId(newUserConnection.Username);
            if (userId != 0)
            {
                // get username from db
                var user = await _userRepository.GetUser(userId);
                UserConnection userConnection = new UserConnection { UserId = userId, RoomId = newUserConnection.RoomId, User = user.Name };
                userConnection.UserId = (int)userId;
                await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.RoomId.ToString());

                RoomRepository roomRepository = new RoomRepository(_context);
                var roomName = (await roomRepository.GetRoom(userConnection.RoomId)).Name;

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
