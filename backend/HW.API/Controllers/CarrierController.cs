using HW.Application.Interfaces;
using HW.Application.DTOs;
using Microsoft.AspNetCore.Mvc;


namespace HW.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarrierController : ControllerBase
    {
        private readonly ICarrierService _carrierService;

        public CarrierController(ICarrierService carrierService)
        {
            _carrierService = carrierService;
        }

        // GET /api/carrier - Retrieve all carriers
        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<CarrierDTO>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllCarriers()
        {
            var carriers = await _carrierService.GetAllCarriersAsync();
            return Ok(carriers);
        }
    }
}