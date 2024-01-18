using Microsoft.EntityFrameworkCore;
using SkateShopAPI.EntityModels;
using SkateShopAPI.Services;

namespace SkateShopAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var ConnectionString = builder.Configuration.GetConnectionString("skate_shop");
            builder.Services.AddDbContext<SkateShopContext>(Options => {
                Options.UseSqlServer(ConnectionString);
            });

            var chaveAsaas = builder.Configuration.GetValue<string>("ChaveAsaas");
            AppSettingsService.ChaveAsaas = chaveAsaas;

            var app = builder.Build();

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