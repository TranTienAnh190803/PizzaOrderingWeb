using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Implement
{
    public class PizzaService : IPizzaService
    {
        private readonly ApplicationDbContext _dbContext;

        public PizzaService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Response> AddPizza(PizzaForm pizzaForm)
        {
            Response response = new Response();

            try
            {
                if (pizzaForm != null && pizzaForm.Image != null)
                {
                    var ms = new MemoryStream();
                    await pizzaForm.Image.CopyToAsync(ms);
                    var ImageData = ms.ToArray();

                    Pizza pizza = new Pizza {
                        PizzaName = pizzaForm.PizzaName,
                        PizzaDescription = pizzaForm.PizzaDescription,
                        Discount = pizzaForm.Discount,
                        Image = ImageData,
                        ImageType = pizzaForm.Image.ContentType,
                        PizzaPrice = pizzaForm.Prices
                    };


                    await _dbContext.AddAsync(pizza);
                    int result = await _dbContext.SaveChangesAsync();

                    if (result > 0)
                    {
                        response.StatusCode = 200;
                        response.Message = "Added Pizza Successfully";
                    }
                    else
                    {
                        response.StatusCode = 400;
                        response.Message = "Add Pizza Fail";
                    }
                }
                else
                {
                    response.StatusCode = 400;
                    response.Message = "Please Provide Sufficient Information";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<Response> GetPizza()
        {
            Response response = new Response();

            try
            {
                List<PizzaDTO> pizzas = await _dbContext.Pizza.Select(x => new PizzaDTO
                {
                    Id = x.Id,
                    PizzaName = x.PizzaName,
                    PizzaDescription = x.PizzaDescription,
                    Discount = x.Discount,
                    ImageBase64 = x.Image != null
                        ? $"data:{x.ImageType};base64,{Convert.ToBase64String(x.Image)}"
                        : null,
                    ImageType = x.ImageType,
                    Prices = x.PizzaPrice.Where(y => y.PizzaId == x.Id).Select(y => new PizzaPriceDTO
                    {
                        PizzaId = y.PizzaId,
                        PizzaSize = y.PizzaSize,
                        Price = y.Price,
                        OfficialPrice = y.OfficialPrice
                    }).ToList(),
                }).ToListAsync();

                if (pizzas != null)
                {
                    response.pizzas = pizzas;
                    response.StatusCode = 200;
                }
                else
                {
                    response.StatusCode = 200;
                    response.Message = "There Is No Pizza :((";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<Response> EditPizza(PizzaForm pizzaForm, long pizzaId)
        {
            Response response = new Response();

            try
            {
                var pizza = await _dbContext.Pizza.Include(x => x.PizzaPrice).FirstOrDefaultAsync(x => x.Id == pizzaId);

                if (pizza != null)
                {
                    if (pizzaForm.Image != null)
                    {
                        var ms = new MemoryStream();
                        await pizzaForm.Image.CopyToAsync(ms);
                        var imageData = ms.ToArray();

                        pizza.Image = imageData;
                        pizza.ImageType = pizzaForm.Image.ContentType;
                    }
                    pizza.PizzaName = pizzaForm.PizzaName;
                    pizza.PizzaDescription = pizzaForm.PizzaDescription;
                    pizza.Discount = pizzaForm.Discount;
                    pizza.PizzaPrice = pizzaForm.Prices;
                    int result = await _dbContext.SaveChangesAsync();

                    if (result > 0)
                    {
                        response.StatusCode = 200;
                        response.Message = "Edit Pizza Successfully";
                    }
                    else
                    {
                        response.StatusCode = 400;
                        response.Message = "Edit Pizza Fail";
                    }
                }
                else
                {
                    response.StatusCode = 404;
                    response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<Response> DeletePizza(long pizzaId)
        {
            Response response = new Response();

            try
            {
                var pizza = await _dbContext.Pizza.FindAsync(pizzaId);

                if (pizza != null)
                {
                    _dbContext.Pizza.Remove(pizza);
                    int result = await _dbContext.SaveChangesAsync();

                    if (result > 0)
                    {
                        response.StatusCode = 200;
                        response.Message = "Deleted Pizza Successfuly";
                    }
                    else
                    {
                        response.StatusCode = 400;
                        response.Message = "Delete Pizza Fail";
                    }
                }
                else
                {
                    response.StatusCode = 400;
                    response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<Response> UploadImage(IFormFile imageFile)
        {
            Response response = new Response();

            try
            {
                if (imageFile != null)
                {
                    var ms = new MemoryStream();
                    await imageFile.CopyToAsync(ms);
                    var image = ms.ToArray();

                    response.StatusCode = 200;
                    response.pizzaDTO = new PizzaDTO { Image = image, ImageType = imageFile.ContentType };
                }
                else
                {
                    response.StatusCode = 400;
                    response.Message = "No File Selected";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<Response> GetSelectedPizza(long pizzaId)
        {
            Response response = new Response();

            try
            {
                var pizza = await _dbContext.Pizza.FindAsync(pizzaId);

                if (pizza != null)
                {
                    var pizzaPrice = await _dbContext.PizzaPrices.Where(x => x.PizzaId == pizzaId).Select(x => new PizzaPriceDTO
                    {
                        PizzaId = x.PizzaId,
                        PizzaSize = x.PizzaSize,
                        Price = x.Price,
                        OfficialPrice = x.OfficialPrice,
                    }).ToListAsync();

                    response.pizzaDTO = new PizzaDTO
                    {
                        Id = pizza.Id,
                        PizzaName = pizza.PizzaName,
                        PizzaDescription = pizza.PizzaDescription,
                        Discount = pizza.Discount,
                        ImageBase64 = $"data:{pizza.ImageType};Base64,{Convert.ToBase64String(pizza.Image!)}",
                        ImageType = pizza.ImageType,
                        Prices = pizzaPrice
                    };
                    response.StatusCode = 200;
                }
                else
                {
                    response.StatusCode = 404;
                    response.Message = "Not Found";
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
