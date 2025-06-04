using Backend.DTOs;
using Backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<Response>> Register([FromBody] RegistrationForm registrationForm)
        {
            Response response = await _userService.Register(registrationForm);
            return StatusCode(response.StatusCode, response);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<Response>> Login([FromBody] LoginForm loginForm)
        {
            Response response = await _userService.Login(loginForm);
            return StatusCode(response.StatusCode, response);
        }
    }
}
