using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Pizza
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        public string PizzaName { get; set; }

        [Required]
        public string PizzaDescription { get; set; }

        [Required]
        [Precision(18, 2)]
        public decimal Price { get; set; }

        [Required]
        public int Discound {  get; set; } = 0;

        [NotMapped]
        public decimal OfficialPrice => Price * (1 - (Discound / 100));

        public byte[]? Image { get; set; }

        public string? ImageType { get; set; }
    }
}
