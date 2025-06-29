using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class OrderForm
    {
        public required string Orderer { get; set; }

        public required string Address { get; set; }

        public required string PhoneNumber { get; set; }

    }
}
