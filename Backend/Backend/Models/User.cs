using Backend.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Index(nameof(Username), IsUnique = true)]
    [Index(nameof(Email), IsUnique = true)]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Fullname { get; set; }

        [Required]
        public bool Gender { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public DateOnly DateOfBirth { get; set; }

        [Required]
        public UserRole Role { get; set; }

        public byte[]? Avatar { get; set; }

        public string? AvatarType { get; set; }


        public User(string username, string email, string phoneNumber, string password, string fullname, bool gender, string address, DateOnly dateOfBirth, UserRole role)
        {
            Username = username;
            Email = email;
            PhoneNumber = phoneNumber;
            Password = password;
            Fullname = fullname;
            Gender = gender;
            Address = address;
            DateOfBirth = dateOfBirth;
            Role = role;
        }
    }
}
