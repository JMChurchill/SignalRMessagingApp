namespace ChatService.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public int RoomId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public Room Room { get; set; } = null!;
    }
}
