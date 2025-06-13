using Backend.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class OtherDishes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DishesType DishesType { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Range(0, 100)]
        public int Discount { get; set; } = 0;

        [Required]
        [Precision(18, 2)]
        public decimal Price { get; set; }

        [Precision(18, 2)]
        [NotMapped]
        public decimal OfficialPrice => Price * (1 - (Discount / 100));

        [Required]
        public byte[]? Image { get; set; }

        [Required]
        public string? ImageType { get; set; }
    }
}
