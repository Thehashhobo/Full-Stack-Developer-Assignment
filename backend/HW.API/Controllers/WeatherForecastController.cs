using Microsoft.AspNetCore.Mvc;
using HW.Infrastructure.Data; // Namespace for AppDbContext
using HW.Domain.Entities; // Namespace for Carrier or Shipment entities
using Microsoft.EntityFrameworkCore;

namespace HW.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly AppDbContext _context;

        public WeatherForecastController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IEnumerable<Carrier>> Get()
        {
            // Query the database to get all carriers
            var carriers = await _context.Carriers.ToListAsync();
            return carriers;
        }
    }
}
