using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HW.Application.DTOs
{
    public class ShipmentDTO
    {
        public int Id { get; set; } 
        public required string Origin { get; set; }
        public required string Destination { get; set; } 
        public required int Carrier { get; set; } 
        public DateTime ShipDate { get; set; } 
        public DateTime ETA { get; set; } 
        public string? Status { get; set; } 
    }

    public class UpdateShipmentStatusDTO
    {
        public required string Status { get; set; }
    }


    public class ShipmentQueryDTO // for input
    {
        // Filtering properties
        public string? Status { get; set; } 
        public int? Carrier { get; set; } 

        // Pagination properties
        public int PageNumber { get; set; } = 1; 
        public int PageSize { get; set; } = 10; 
    }

    public class PaginatedShipmentsDTO // for output
    {
        public IEnumerable<ShipmentDTO> Shipments { get; set; } = new List<ShipmentDTO>(); // List of shipments
        public int CurrentPage { get; set; } 
        public int PageSize { get; set; } 
        public int TotalCount { get; set; } // Total number of shipments
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize); // Total pages
    }
}
