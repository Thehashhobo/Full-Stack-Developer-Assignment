using HW.Application.Mappings;
using HW.Domain.Entities;
using HW.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using HW.Application.Interfaces;
using HW.Infrastructure;
using HW.Application.Services;
using Serilog;

namespace HW.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .WriteTo.Console()
                .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
                .CreateLogger();

            Log.Information("Application Starting");
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            var builder = WebApplication.CreateBuilder(args);
            builder.Host.UseSerilog();

            builder.Services.AddScoped<ILogService, LogService>();
            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:3000") // Allow requests from frontend
                                            .AllowAnyHeader() // Allow any headers
                                            .AllowAnyMethod(); // Allow any HTTP methods
                                  });
            });

            // Register Swagger services
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddOpenApi();
            builder.Services.AddAutoMapper(typeof(MappingProfile));
            builder.Services.AddScoped<IShipmentRepository, ShipmentRepository>();
            builder.Services.AddScoped<IShipmentService, ShipmentService>();
            builder.Services.AddScoped<ICarrierRepository, CarrierRepository>();
            builder.Services.AddScoped<ICarrierService, CarrierService>();

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

            var app = builder.Build();

            // Middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            // Use the named CORS policy
            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
