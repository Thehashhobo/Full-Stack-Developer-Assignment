using HW.Application.Interfaces;
using Serilog;

namespace HW.Infrastructure
{
    public class LogService : ILogService
    {
        public void Info(string message)
        {
            Log.Information(message);
        }

        public void Warn(string message)
        {
            Log.Warning(message);
        }

        public void Error(string message, Exception? ex = null)
        {
            Log.Error(ex, message);
        }
    }

}
