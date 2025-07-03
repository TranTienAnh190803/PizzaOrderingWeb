using Backend.Enums;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.DTOs
{
    public class OrderDTO
    {
        public long OrderId { get; set; }

        public required string Orderer { get; set; }

        public required string Address { get; set; }

        public required string PhoneNumber { get; set; }

        public OrderState OrderState { get; set; }

        public required string stateString { get; set; }

        public required ICollection<CartDTO> CartItems { get; set; }

        public required DateTime OrderDate { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? DeliveredDate { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateOnly? ApprovedDate { get; set; }

        [Precision(18, 2)]
        public decimal TotalPrice { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public UserDTO? DeliveryMan { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? DeliveryManId { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? DeliveryManName { get; set; }
    }
}
