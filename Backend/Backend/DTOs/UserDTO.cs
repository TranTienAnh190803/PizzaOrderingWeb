using Backend.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.DTOs
{
    public class UserDTO
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Username { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Email { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? PhoneNumber { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Fullname { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public bool? Gender { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Address { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateOnly? DateOfBirth { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public byte[]? Avatar { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? AvatarType { get; set; }


        // Get Profile Constructor
        public UserDTO(string? username, string? email, string? phoneNumber, string? fullname, bool? gender, string? address, DateOnly? dateOfBirth)
        {
            Username = username;
            Email = email;
            PhoneNumber = phoneNumber;
            Fullname = fullname;
            Gender = gender;
            Address = address;
            DateOfBirth = dateOfBirth;
        }


        // Get Avatar Constructor
        public UserDTO(byte[]? avatar, string? avatarType)
        {
            Avatar = avatar;
            AvatarType = avatarType;
        }

    
    }
}
