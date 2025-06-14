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
        [HttpPut]
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
    }
}
