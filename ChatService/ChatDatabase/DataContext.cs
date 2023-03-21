using ChatService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace ChatDatabase
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DataContext(DbContextOptions<DataContext> options):base(options){ }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
              "Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = ChatDatabase"
            );
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>(entity =>
            {
                entity.HasData(new Room { Id = 1, Name = "Coding" });
                entity.HasData(new Room { Id = 2, Name = "Testing" });
            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasData(new User { Id = 1, Name = "John" });
                entity.HasData(new User { Id = 2, Name = "Ben" });
                entity.HasData(new User { Id = 3, Name = "Phil" });
            });
        }


    }
}