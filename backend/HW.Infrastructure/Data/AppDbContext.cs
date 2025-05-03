using HW.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HW.Infrastructure.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Carrier> Carriers { get; set; }

    public virtual DbSet<Shipment> Shipments { get; set; }

//     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//         => optionsBuilder.UseSqlite("Data Source=D:\\\\\\\\Full-Stack-Developer-Assignment\\\\\\\\backend\\\\\\\\HW.Infrastructure\\\\\\\\shipment_tracker.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Carrier>(entity =>
        {
            entity.HasIndex(e => e.Name, "IX_Carriers_Name").IsUnique();
        });

        modelBuilder.Entity<Shipment>(entity =>
        {
            entity.Property(e => e.Eta).HasColumnName("ETA");
            entity.Property(e => e.Status).HasDefaultValue("Pending");

            entity.HasOne(d => d.Carrier).WithMany(p => p.Shipments)
                .HasForeignKey(d => d.CarrierId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
