using Backend.DTOs;
using Backend.Enums;
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

        [Authorize(Roles = "USER")]
        [HttpGet]
        [Route("get-user-orders")]
        public async Task<ActionResult<Response>> GetUserOrders()
        {
            string username = User.Identity.Name;
            Response response = await _orderService.GetUserOrders(username);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "USER")]
        [HttpGet]
        [Route("user/get-selected-order/{orderId}")]
        public async Task<ActionResult<Response>> GetSelectedOrdered([FromRoute] long orderId)
        {
            string username = User.Identity.Name;
            Response response = await _orderService.GetSelectedOrdered(username, orderId);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPatch]
        [Route("accept-order/{orderId}")]
        public async Task<ActionResult<Response>> AcceptOrder([FromRoute] long orderId, [FromQuery] int deliveryManId)
        {
            Response response = await _orderService.AcceptOrder(orderId, deliveryManId);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "USER")]
        [HttpPatch]
        [Route("cancel-order/{orderId}")]
        public async Task<ActionResult<Response>> CancelOrder([FromRoute] long orderId)
        {
            string username = User.Identity.Name;
            Response response = await _orderService.CancelOrder(username, orderId);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "DELIVERY")]
        [HttpPatch]
        [Route("delivery-verifying/{orderId}")]
        public async Task<ActionResult<Response>> DeliveryVerifying([FromRoute] long orderId)
        {
            string username = User.Identity.Name;
            Response response = await _orderService.DeliveryVerifying(username, orderId);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        [Route("get-all-orders")]
        public async Task<ActionResult<Response>> GetAllOrders()
        {
            Response response = await _orderService.GetAllOrders();
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        [Route("admin/get-selected-order/{orderId}")]
        public async Task<ActionResult<Response>> AdminGetSelectedOrder([FromRoute] long orderId)
        {
            Response response = await _orderService.AdminGetSelectedOrder(orderId);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "DELIVERY")]
        [HttpGet]
        [Route("view-work")]
        public async Task<ActionResult<Response>> ViewWork()
        {
            string username = User.Identity.Name;
            Response response = await _orderService.ViewWork(username);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "DELIVERY")]
        [HttpGet]
        [Route("delivery-man/get-selected-order/{orderId}")]
        public async Task<ActionResult<Response>> DmGetSelectedOrder([FromRoute] long orderId)
        {
            string username = User.Identity.Name;
            Response response = await _orderService.DmGetSelectedOrder(username, orderId);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        [Route("orders-filtering/{orderState}")]
        public async Task<ActionResult<Response>> OrdersFiltering([FromRoute] OrderState orderState)
        {
            Response response = await _orderService.OrdersFiltering(orderState);
            return StatusCode(response.StatusCode, response);
        }

        [Authorize(Roles = "DELIVERY")]
        [HttpGet]
        [Route("delivery-filtering/{orderState}")]
        public async Task<ActionResult<Response>> DeliveryFiltering([FromRoute] OrderState orderState)
        {
            string username = User.Identity.Name;
            Response response = await _orderService.DeliveryFiltering(username, orderState);
            return StatusCode(response.StatusCode, response);
        }
    }
}
