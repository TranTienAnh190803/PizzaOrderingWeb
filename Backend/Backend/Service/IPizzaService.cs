using Backend.DTOs;

namespace Backend.Service
{
    public interface IPizzaService
    {
        public Task<Response> AddPizza(PizzaForm pizzaForm);
        
        public Task<Response> EditPizza(PizzaForm pizzaForm, long pizzaId);

        public Task<Response> GetPizza();

        public Task<Response> DeletePizza(long pizzaId);
    }
}
