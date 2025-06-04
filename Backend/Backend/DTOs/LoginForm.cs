using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class LoginForm
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
