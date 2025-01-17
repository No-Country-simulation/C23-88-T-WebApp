using Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servicio.IServices
{
    public interface IMailService
    {
        public Task Send_Email_Test(string email, string message);
        public Task Send_Welcome_Email(string email);
    }
}