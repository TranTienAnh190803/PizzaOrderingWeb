using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Implement
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _dbContext;

        public OrderService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Response> AddToCart(string? username, CartForm cartItem)
        {
            Response response = new Response();

            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == username);
                var pizzaPrice = await _dbContext.PizzaPrices.FirstOrDefaultAsync(x => x.PizzaId == cartItem.PizzaId && x.PizzaSize == cartItem.SelectedSize);
                var otherDish = await _dbContext.OtherDishes.FindAsync(cartItem.DishesId);

                if (user != null)
                {
                    CartItems? checkCart = null;

                    if (cartItem.PizzaId != null && cartItem.SelectedSize != null)
                    {
                        checkCart = await _dbContext.CartItems.FirstOrDefaultAsync
                            (x => x.User == user && (x.PizzaId == cartItem.PizzaId && x.SelectedSize == cartItem.SelectedSize));
                    }
                    else if (cartItem.DishesId != null)
                    {
                        checkCart = await _dbContext.CartItems.FirstOrDefaultAsync
                            (x => x.User == user && (x.DishesId == cartItem.DishesId));
                    }


                    if (checkCart == null)
                    {
                        if (pizzaPrice == null && otherDish == null)
                        {
                            response.StatusCode = 400;
                            response.Message = "No Item To Add To Cart";
                        }
                        else if (pizzaPrice != null && otherDish == null)
                        {
                            CartItems cart = new CartItems
                            {
                                User = user,
                                PizzaPrice = pizzaPrice,
                                Quantity = cartItem.Quantity,
                                TotalPrice = pizzaPrice.OfficialPrice * cartItem.Quantity
                            };

                            _dbContext.CartItems.Add(cart);
                        }
                        else if (otherDish != null && pizzaPrice == null)
                        {
                            CartItems cart = new CartItems
                            {
                                User = user,
                                OtherDishes = otherDish,
                                Quantity = cartItem.Quantity,
                                TotalPrice = otherDish.OfficialPrice * cartItem.Quantity,
                            };

                            _dbContext.CartItems.Add(cart);
                        }

                        int result = await _dbContext.SaveChangesAsync();

                        if (result > 0)
                        {
                            response.StatusCode = 200;
                            response.Message = "Added To Cart Successfully";
                        }
                        else
                        {
                            response.StatusCode = 400;
                            response.Message = "Add To Cart Fail";
                        }
                    }
                    else
                    {
                        int oldQuantity = checkCart.Quantity;
                        int newQuantity = oldQuantity + cartItem.Quantity;
                        checkCart.Quantity = newQuantity;
                        checkCart.TotalPrice = (checkCart.TotalPrice / oldQuantity) * newQuantity;
                        int result = await _dbContext.SaveChangesAsync();

                        if (result > 0)
                        {
                            response.StatusCode = 200;
                            response.Message = "Successfully Increased Quantity To Cart";
                        }
                        else
                        {
                            response.StatusCode = 400;
                            response.Message = "Add To Cart Fail";
                        }
                    }
                }
                else
                {
                    response.StatusCode = 400;
                    response.Message = "Login To Add To Cart";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<Response> GetCart(string? username)
        {
            Response response = new Response();

            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == username);

                if (user != null)
                {
                    List<CartDTO> cart = await _dbContext.CartItems.Include(x => x.PizzaPrice).ThenInclude(x => x.Pizza).Where(x => x.UserId == user.Id).Select(x => new CartDTO
                    {
                        Id = x.Id,
                        UserId = x.UserId,
                        PizzaId = x.PizzaId,
                        SelectedSize = x.SelectedSize,
                        DishesId = x.DishesId,
                        Quantity = x.Quantity,
                        TotalPrice = x.TotalPrice,
                        Name = x.PizzaPrice != null ? x.PizzaPrice.Pizza!.PizzaName : x.OtherDishes!.Name,
                        SizeString = x.PizzaPrice != null ? x.PizzaPrice.PizzaSize.ToString() : null,
                        ImageBase64 = x.PizzaPrice != null
                            ? $"data:{x.PizzaPrice.Pizza!.ImageType};base64,{Convert.ToBase64String(x.PizzaPrice.Pizza.Image!)}"
                            : $"data:{x.OtherDishes!.ImageType};base64,{Convert.ToBase64String(x.OtherDishes.Image!)}",
                        OrderId = x.OrderId
                    }).ToListAsync();

                    response.cart = new List<CartDTO>();
                    foreach(var item in cart)
                    {
                        if (item.OrderId == null)
                        {
                            response.cart.Add(item);
                        }
                    }

                    response.StatusCode = 200;
                    if (response.cart.Count == 0)
                    {
                        response.Message = "There Is No Item In Your Cart.";
                    }
                }
                else
                {
                    response.StatusCode = 400;
                    response.Message = "Login To Use Cart";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<Response> DeleteCartItem(string? username, long itemId)
        {
            Response response = new Response();

            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == username);

                if (user != null)
                {
                    var cartItem = await _dbContext.CartItems.FirstOrDefaultAsync(x => x.Id == itemId && x.UserId == user.Id);

                    if (cartItem != null)
                    {
                        _dbContext.CartItems.Remove(cartItem);
                        int result = await _dbContext.SaveChangesAsync();

                        if (result > 0)
                        {
                            response.StatusCode = 200;
                            response.Message = "Deleted Item Successfuly";
                        }
                        else
                        {
                            response.StatusCode = 400;
                            response.Message = "Delete Item Fail";
                        }
                    }
                    else
                    {
                        response.StatusCode = 404;
                        response.Message = "Item Was Not Added To Cart";
                    }
                }
                else
                {
                    response.StatusCode = 404;
                    response.Message = "User Not Found";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<Response> OrderFood(string? username, OrderForm orderForm)
        {
            Response response = new Response();

            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == username);

                if (user != null)
                {
                    var cart = await _dbContext.CartItems.Where(x => x.UserId == user.Id).ToListAsync();

                    Order order = new Order
                    {
                        Orderer = orderForm.Orderer,
                        Address = orderForm.Address,
                        PhoneNumber = orderForm.PhoneNumber,
                        OrderState = Enums.OrderState.Pending,
                        CartItems = cart,
                        TotalPrice = cart.Sum(x => x.TotalPrice),
                    };

                    _dbContext.Orders.Add(order);
                    int result = await _dbContext.SaveChangesAsync();

                    if (result > 0)
                    {
                        response.StatusCode = 200;
                        response.Message = "Thank You For Choosing To Buy Our Food. You Order Is Now Pending";
                    }
                    else
                    {
                        response.StatusCode = 400;
                        response.Message = "Order Failed";
                    }
                }
                else
                {
                    response.StatusCode = 404;
                    response.Message = "Login To Order";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<Response> GetNumberOfItem(string? username)
        {
            Response response = new Response();

            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == username);
                
                if (user != null)
                {
                    int itemNumber = await _dbContext.CartItems.CountAsync(x => x.UserId == user.Id && x.OrderId == null);

                    response.StatusCode = 200;
                    response.numberOfItem = itemNumber;
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}
