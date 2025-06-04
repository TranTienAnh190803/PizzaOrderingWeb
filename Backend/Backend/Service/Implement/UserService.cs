using Backend.Data;
using Backend.DTOs;
using Backend.Enums;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Service.Implement
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;

        private readonly IPasswordHasher<User> _passwordHasher;

        private readonly IConfiguration _configuration;

        public UserService(ApplicationDbContext dbContext, IPasswordHasher<User> passwordHasher, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        public async Task<Response> Register(RegistrationForm registrationForm)
        {
            Response response = new Response();

            try
            {
                User NewUser = new User(
                        registrationForm.Username,
                        registrationForm.Email,
                        _passwordHasher.HashPassword(null, registrationForm.Password),
                        registrationForm.Fullname,
                        registrationForm.Gender,
                        registrationForm.Address,
                        registrationForm.DateOfBirth,
                        Enums.UserRole.USER
                );

                await _dbContext.Users.AddAsync( NewUser );
                int result = await _dbContext.SaveChangesAsync();

                if (result > 0)
                {
                    response.StatusCode = 200;
                    response.Message = "Register Successfully";
                }
                else
                {
                    response.StatusCode = 500;
                    response.Message = "Register Fail";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<Response> Login(LoginForm loginForm)
        {
            Response response = new Response();

            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == loginForm.Username);

                if (user != null && _passwordHasher.VerifyHashedPassword(null, user.Password, loginForm.Password) == PasswordVerificationResult.Success)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, loginForm.Username),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Name, loginForm.Username),
                        new Claim(ClaimTypes.Role, user.Role.ToString())
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        issuer: _configuration["Jwt:Issuer"],
                        audience: _configuration["Jwt:Audience"],
                        claims: claims,
                        expires: DateTime.UtcNow.AddHours(6),
                        signingCredentials: credential
                    );
                    string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

                    response.Token = new JWTToken(tokenValue, user.Role.ToString());
                    response.StatusCode = 200;
                }
                else
                {
                    response.StatusCode = 404;
                    response.Message = "Username Or Password Is Incorrect";
                }
            }
            catch(Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}
