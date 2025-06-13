using Backend.Data;

namespace Backend.Service.Implement
{
    public class PizzaService : IPizzaService
    {
        private readonly ApplicationDbContext _dbContext;

        public PizzaService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

    }
}
