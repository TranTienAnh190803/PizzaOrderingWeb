using Backend.DTOs;

namespace Backend.Service
{
    public interface IUserService
    {
        public Task<Response> EditProfile(string? username, UserDTO userDTO);

        public Task<Response> GetProfile(string? username);

        public Task<Response> Login(LoginForm loginForm);

        public Task<Response> Register(RegistrationForm registrationForm);
        
        public Task<Response> RegisterDeliveryMan(RegistrationForm registrationForm);

        public Task<Response> UploadImage(string? username, IFormFile formFile);

        public Task<Response> GetAvatar(string? username);

        public Task<Response> DeleteAccount(int id);

        public Task<Response> ChangePassword(string? username, PasswordChangingForm passwordChangingForm);
        
        public Task<Response> GetAllDeliveryMan();

        public Task<Response> GetSelectedDeliveryMan(int userId);
    }
}
