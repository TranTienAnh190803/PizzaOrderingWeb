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
        [Range(0, 100)]
        public int Discound {  get; set; } = 0;

        public byte[]? Image { get; set; }

        public string? ImageType { get; set; }

        public ICollection<PizzaPrice> PizzaPrice { get; set; }
    }
}
