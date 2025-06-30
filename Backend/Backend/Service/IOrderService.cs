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
        
        public Task<Response> GetUserOrders(string? username);
        
        public Task<Response> GetSelectedOrdered(string? username, long orderId);
        
        public Task<Response> AcceptOrder(long orderId, int deliveryManId);
        
        public Task<Response> CancelOrder(string? username, long orderId);
        
        public Task<Response> DeliveryVerifying(string? username, long orderId);
    }
}
