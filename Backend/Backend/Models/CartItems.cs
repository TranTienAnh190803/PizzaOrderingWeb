using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class CartItems
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public long? PizzaId { get; set; }

        public Pizza? Pizza { get; set; }

        public long? DishesId { get; set; }

        public OtherDishes? OtherDishes { get; set; }

        public int Quantity { get; set; }

        [Precision(18, 2)]
        public decimal TotalPrice { get; set; }
    }
}
