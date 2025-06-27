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
            // Pizza Price
            modelBuilder.Entity<PizzaPrice>()
                .HasKey(p => new { p.PizzaId, p.PizzaSize });

            modelBuilder.Entity<PizzaPrice>()
                .HasOne(pp => pp.Pizza)
                .WithMany(p => p.PizzaPrice)
                .HasForeignKey(pp => pp.PizzaId);

            // Cart Items
            modelBuilder.Entity<CartItems>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .IsRequired(true);

            modelBuilder.Entity<CartItems>()
                .HasOne(c => c.PizzaPrice)
                .WithMany()
                .HasForeignKey(c => new {c.PizzaId, c.SelectedSize})
                .IsRequired(false);

            modelBuilder.Entity<CartItems>()
                .HasOne(c => c.OtherDishes)
                .WithMany()
                .HasForeignKey(c => c.DishesId)
                .IsRequired(false);
        }

        public required DbSet<User> Users { get; set; }

        public required DbSet<Pizza> Pizza { get; set; }

        public required DbSet<PizzaPrice> PizzaPrices { get; set; }

        public required DbSet<OtherDishes> OtherDishes { get; set; }

        public required DbSet<CartItems> CartItems { get; set; }
    }
}
