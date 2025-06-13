using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class PizzaForm
    {
        [Required]
        public string PizzaName { get; set; }

        [Required]
        public string PizzaDescription { get; set; }

        [Required]
        [Range(0, 100)]
        public int Discount { get; set; } = 0;

        public byte[]? Image { get; set; }

        public string? ImageType { get; set; }

        [Precision(18, 2)]
        public decimal? SmallPrice { get; set; }

        [Precision(18, 2)]
        public decimal? MediumPrice { get; set; }

        [Precision(18, 2)]
        public decimal? LargePrice { get; set; }

        [Precision(18, 2)]
        public decimal? ExtraLargePrice { get; set; }
    }
}
