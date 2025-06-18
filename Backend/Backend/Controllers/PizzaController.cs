using Backend.DTOs;
using Backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly IPizzaService _pizzaService;

        public PizzaController(IPizzaService pizzaService)
        {
            _pizzaService = pizzaService;
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost]
        [Route("add-pizza")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Response>> AddPizza([FromForm] PizzaForm pizzaForm)
        {
            Response response = await _pizzaService.AddPizza(pizzaForm);
            return StatusCode(response.StatusCode, response);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("get-pizza")]
        public async Task<ActionResult<Response>> GetPizza()
        {
            Response response = await _pizzaService.GetPizza();
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPatch]
        [Route("edit-pizza/{pizzaId}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Response>> EditPizza([FromForm] PizzaForm pizzaForm, [FromRoute] long pizzaId)
        {
            Response response = await _pizzaService.EditPizza(pizzaForm, pizzaId);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpDelete]
        [Route("delete-pizza/{pizzaId}")]
        public async Task<ActionResult<Response>> DeletePizza([FromRoute] long pizzaId)
        {
            Response response = await _pizzaService.DeletePizza(pizzaId);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost]
        [Route("upload-image")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile imageFile)
        {
            Response response = await _pizzaService.UploadImage(imageFile);
            if (response.StatusCode == 200)
            {
                return File(response.pizzaDTO.Image, response.pizzaDTO.ImageType);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("get-selected-pizza/{pizzaId}")]
        public async Task<ActionResult<Response>> getSelectedPizza([FromRoute] long pizzaId)
        {
            Response response = await _pizzaService.GetSelectedPizza(pizzaId);
            return StatusCode(response.StatusCode, response);
        }
    }
}
