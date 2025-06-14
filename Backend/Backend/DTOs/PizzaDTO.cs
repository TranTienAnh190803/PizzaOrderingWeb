using Backend.Models;

namespace Backend.DTOs
{
    public class PizzaDTO
    {
        public long Id { get; set; }

        public string PizzaName { get; set; }

        public string PizzaDescription { get; set; }

        public int Discount { get; set; }

        public string? ImageBase64 { get; set; }

        public string? ImageType { get; set; }

        public ICollection<PizzaPrice> Prices { get; set; }
    }
}
