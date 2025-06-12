using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PizzaPrice>()
                .HasKey(p => new { p.PizzaId, p.PizzaSize });

            modelBuilder.Entity<PizzaPrice>()
                .HasOne(pp => pp.Pizza)
                .WithMany(p => p.PizzaPrice)
                .HasForeignKey(pp => pp.PizzaId);
        }

        public required DbSet<User> Users { get; set; }

        public required DbSet<Pizza> Pizza { get; set; }

        public required DbSet<PizzaPrice> PizzaPrices { get; set; }
    }
}
