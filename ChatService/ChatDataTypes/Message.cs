namespace ChatService.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
