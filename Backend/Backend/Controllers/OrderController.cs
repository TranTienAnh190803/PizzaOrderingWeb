using Backend.DTOs;
using Backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Authorize(Roles = "USER")]
        [HttpPost]
        [Route("add-to-cart")]
        public async Task<ActionResult<Response>> AddToCart([FromBody] CartForm cartItem)
        {
            string username = User.Identity.Name;
            Response response = await _orderService.AddToCart(username, cartItem);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "USER")]
        [HttpGet]
        [Route("get-cart")]
        public async Task<ActionResult<Response>> GetCart()
        {
            string username = User.Identity.Name;
            Response response = await _orderService.GetCart(username);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "USER")]
        [HttpDelete]
        [Route("delete-cart-item/{itemId}")]
        public async Task<ActionResult<Response>> DeleteCartItem([FromRoute] long itemId)
        {
            string username = User.Identity.Name;
            Response response = await _orderService.DeleteCartItem(username, itemId);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "USER")]
        [HttpPost]
        [Route("order-food")]
        public async Task<ActionResult<Response>> OrderFood([FromBody] OrderForm orderForm)
        {
            string username = User.Identity.Name;
            Response response = await _orderService.OrderFood(username, orderForm);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "USER")]
        [HttpGet]
        [Route("get-number-of-item")]
        public async Task<ActionResult<Response>> GetNumberOfItem()
        {
            string username = User.Identity.Name;
            Response response = await _orderService.GetNumberOfItem(username);
            return StatusCode(response.StatusCode, response);
        }
    }
}
