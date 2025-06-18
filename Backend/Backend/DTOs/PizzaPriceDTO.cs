using Backend.Enums;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class PizzaPriceDTO
    {
        public long? PizzaId { get; set; }

        public PizzaSize PizzaSize { get; set; }

        [Precision(18, 2)]
        public decimal Price { get; set; }

        [Precision(18, 2)]
        public decimal OfficialPrice {  get; set; }
    }
}
