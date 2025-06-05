using Backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class RegistrationForm
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; } = "12345";

        [Required]
        public string Fullname { get; set; }

        [Required]
        public bool Gender { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public DateOnly DateOfBirth { get; set; }
    }
}
