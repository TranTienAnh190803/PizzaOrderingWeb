using Backend.DTOs;

namespace Backend.Service
{
    public interface IOrderService
    {
        public Task<Response> AddToCart(string? username, CartForm cartItem);
        
        public Task<Response> GetCart(string? username);

        public Task<Response> DeleteCartItem(string? username, long itemId);

        public Task<Response> OrderFood(string? username, OrderForm orderForm);
        
        public Task<Response> GetNumberOfItem(string? username);
    }
}
