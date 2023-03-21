namespace ChatService.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public List<Message> Messages = new List<Message>();
    }
}
