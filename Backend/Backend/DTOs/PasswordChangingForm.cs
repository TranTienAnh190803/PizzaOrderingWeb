using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class PasswordChangingForm
    {
        [Required]
        public string OldPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }
}