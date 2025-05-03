namespace HW.Domain.Entities;

public partial class Shipment
{
    public int Id { get; set; }

    public string Origin { get; set; } = null!;

    public string Destination { get; set; } = null!;

    public int CarrierId { get; set; }

    public DateTime ShipDate { get; set; }

    public DateTime Eta { get; set; }

    public string Status { get; set; } = null!;

    public virtual Carrier Carrier { get; set; } = null!;
}
