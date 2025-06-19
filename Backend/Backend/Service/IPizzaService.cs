using Backend.DTOs;

namespace Backend.Service
{
    public interface IPizzaService
    {
        public Task<Response> AddPizza(PizzaForm pizzaForm);
        
        public Task<Response> EditPizza(PizzaForm pizzaForm, long pizzaId);

        public Task<Response> GetPizza();

        public Task<Response> DeletePizza(long pizzaId);

        public Task<Response> UploadImage(IFormFile imageFile);

        public Task<Response> GetSelectedPizza(long pizzaId);

        public Task<Response> AddOtherDishes(OtherDishesForm dishesForm);

        public Task<Response> GetAllDishes();

        public Task<Response> EditDishes(OtherDishesForm dishesForm, long dishesId);

        public Task<Response> GetSelectedDish(long dishesId);

        public Task<Response> DeleteDish(long dishesId);
    }
}
