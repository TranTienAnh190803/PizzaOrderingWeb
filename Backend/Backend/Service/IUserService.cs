using Backend.DTOs;

namespace Backend.Service
{
    public interface IUserService
    {
        public Task<Response> Login(LoginForm loginForm);

        public Task<Response> Register(RegistrationForm registrationForm);
    }
}
