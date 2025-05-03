using HW.Application.Mappings;
using HW.Domain.Entities;
using HW.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using HW.Application.Interfaces;
using HW.Infrastructure;
using HW.Application.Services;

namespace HW.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Register Swagger services
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();
            builder.Services.AddAutoMapper(typeof(MappingProfile));
            builder.Services.AddScoped<IShipmentRepository, ShipmentRepository>();
            builder.Services.AddScoped<IShipmentService, ShipmentService>();
            builder.Services.AddScoped<ICarrierRepository, CarrierRepository>();
            builder.Services.AddScoped<ICarrierService, CarrierService>();


            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
 

            var app = builder.Build();
            // middleware
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
