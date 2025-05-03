using System;
using System.Collections.Generic;

namespace HW.Domain.Entities;

public partial class Carrier
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Shipment> Shipments { get; set; } = new List<Shipment>();
}
