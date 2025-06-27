using Backend.Enums;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace Backend.DTOs
{
    public class CartForm
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public long? Id { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? UserId { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public long? PizzaId { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public PizzaSize? SelectedSize { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public PizzaPriceDTO? PizzaPrice { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public PizzaDTO? Pizza { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public long? DishesId { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public OtherDishesDTO? OtherDishes { get; set; }

        public int Quantity { get; set; } = 0;

        [Precision(18, 2)]
        public decimal TotalPrice { get; set; } = 0;
    }
}
