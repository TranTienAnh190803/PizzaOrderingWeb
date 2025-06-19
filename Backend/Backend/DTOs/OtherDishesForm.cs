using Backend.Enums;
using System.Text.Json.Serialization;

namespace Backend.DTOs
{
    public class OtherDishesForm
    {
        public required string Name { get; set; }

        public DishesType DishesType { get; set; }

        public required string Description { get; set; }

        public int Discount { get; set; } = 0;

        public decimal Price { get; set; }

        public IFormFile? Image { get; set; }
    }
}
