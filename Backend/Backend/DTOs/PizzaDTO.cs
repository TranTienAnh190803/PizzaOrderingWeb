using Backend.Models;
using System.Text.Json.Serialization;

namespace Backend.DTOs
{
    public class PizzaDTO
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public long? Id { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? PizzaName { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? PizzaDescription { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? Discount { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public byte[]? Image {  get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? ImageBase64 { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? ImageType { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public ICollection<PizzaPriceDTO>? Prices { get; set; }
    }
}
