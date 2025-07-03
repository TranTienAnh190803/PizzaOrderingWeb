using Backend.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long OrderId { get; set; }

        [Required]
        public required string Orderer { get; set; }

        [Required]
        public required string Address { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        [Required]
        public required DateTime OrderDate { get; set; }

        public DateOnly? ApprovedDate { get; set; }

        public DateTime? DeliveredDate { get; set; }

        public OrderState OrderState { get; set; }

        public required ICollection<CartItems> CartItems { get; set; }

        [Precision(18, 2)]
        public decimal TotalPrice { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public required User User { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("DeliveryManId")]
        public User? DeliveryMan { get; set; }

        public int? DeliveryManId { get; set; }
    }
}
