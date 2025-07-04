﻿using Backend.DTOs;
using Backend.Enums;
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


        [Authorize]
        [HttpPut]
        [Route("edit-profile")]
        public async Task<ActionResult<Response>> EditProfile([FromBody] UserDTO userDTO)
        {
            string username = User.Identity.Name;
            Response response = await _userService.EditProfile(username, userDTO);
            return StatusCode(response.StatusCode, response);
        }


        [Authorize]
        [HttpGet]
        [Route("get-profile")]
        public async Task<ActionResult<Response>> GetProfile()
        {
            string username = User.Identity.Name;
            Response response = await _userService.GetProfile(username);
            return StatusCode(response.StatusCode, response);
        }


        [Authorize(Roles = "ADMIN")]
        [HttpPost]
        [Route("register-delivery-man")]
        public async Task<ActionResult<Response>> RegisterDeliveryMan([FromBody] RegistrationForm registrationForm)
        {
            Response response = await _userService.RegisterDeliveryMan(registrationForm);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize]
        [HttpPatch]
        [Route("upload-avatar")]
        public async Task<ActionResult<Response>> UploadImage([FromForm] IFormFile formFile)
        {
            string username = User.Identity.Name;
            Response response = await _userService.UploadImage(username, formFile);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize]
        [HttpGet]
        [Route("get-avatar")]
        public async Task<IActionResult> GetAvatar()
        {
            string username = User.Identity.Name;
            Response response = await _userService.GetAvatar(username);

            if (response.StatusCode == 200)
            {
                return File(response.userDTO.Avatar, response.userDTO.AvatarType);
            }
            else
            {
                return StatusCode(response.StatusCode, response);
            }
        }


        [Authorize(Roles = "ADMIN")]
        [HttpDelete]
        [Route("delete-account/{id}")]
        public async Task<ActionResult<Response>> DeleteAccount([FromRoute] int id)
        {
            Response response = await _userService.DeleteAccount(id);
            return StatusCode(response.StatusCode, response);
        }


        [Authorize]
        [HttpPatch]
        [Route("change-password")]
        public async Task<ActionResult<Response>> ChangePassword([FromBody] PasswordChangingForm passwordChangingForm)
        {
            string username = User.Identity.Name;
            Response response = await _userService.ChangePassword(username, passwordChangingForm);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        [Route("get-all-delivery-man")]
        public async Task<ActionResult<Response>> GetAllDeliveryMan()
        {
            Response response = await _userService.GetAllDeliveryMan();
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        [Route("get-selected-delivery-man/{userId}")]
        public async Task<ActionResult<Response>> GetSelectedDeliveryMan([FromRoute] int userId)
        {
            Response response = await _userService.GetSelectedDeliveryMan(userId);
            return StatusCode(response.StatusCode, response);
        }
    }
}
