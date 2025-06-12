using Backend.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class PizzaPrice
    {
        public long PizzaId { get; set; }

        public Pizza Pizza { get; set; }

        public PizzaSize PizzaSize { get; set; }

        [Precision(18, 2)]
        public decimal Price { get; set; }

        [NotMapped]
        public decimal OfficialPrice => Price * (1 - (Pizza.Discound / 100m));
    }
}
