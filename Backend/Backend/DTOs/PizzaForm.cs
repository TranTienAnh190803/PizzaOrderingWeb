using Backend.Models;
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

        public IFormFile? Image { get; set; }

        public string? ImageType { get; set; }

        [Required]
        public ICollection<PizzaPrice> Prices { get; set; }
    }
}
