using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Model.DTO;
using Model.Modelos;
using Modelo.Helper;
using Service.IService;
using Servicio.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Service.Servicios.ContactService;

namespace Service.Servicios
{
    public class ContactService : IContactService
    {
        private readonly BancaDBContext _context;
        private readonly AppSettings _appSettings;
        private readonly IMailService _service;

        public ContactService(BancaDBContext context, IOptions<AppSettings> appSettings, IMailService service)
        {
            _context = context;
            _appSettings = appSettings.Value;
            _service = service;
        }         

            public ResponseModel AddContact(int currentUserId, string identifier)
            {
                // Verificar si el identificador es un email o un ID
                bool isEmail = identifier.Contains("@");

                var account = isEmail
                    ? _context.Account.FirstOrDefault(a => a.email == identifier )
                    : _context.Account.FirstOrDefault(a => a.id == int.Parse(identifier) );

                if (account == null)
                {
                    return new ResponseModel
                    {
                        success = false,
                        message = "La cuenta no existe.",
                        data = null
                    };
                }

                // Verificar si el contacto ya existe
                bool contactExists = _context.Contacts.Any(c => c.UserId == currentUserId && c.ContactAccountId == account.id);
                if (contactExists)
                {
                    return new ResponseModel
                    {
                        success = false,
                        message = "El contacto ya existe.",
                        data = null
                    };
                }

                // Agregar el contacto
                _context.Contacts.Add(new Contacts
                {
                    UserId = currentUserId,
                    ContactAccountId = account.id
                });

                _context.SaveChanges();

                return new ResponseModel
                {
                    success = true,
                    message = "Contacto agregado exitosamente.",
                    data = null
                };
            }

        public ResponseModel GetContactList(int currentUserId)
        {
            // Obtén los contactos del usuario actual
            var contacts = _context.Contacts
                .Where(c => c.UserId == currentUserId)
                .ToList();

            // Busca los datos en las tablas correspondientes (User o Company)
            var formattedContacts = contacts.Select(c =>
            {
                // Busca en la tabla User
                var user = _context.User.FirstOrDefault(u => u.account_id == c.ContactAccountId);
                if (user != null)
                {
                    return new
                    {
                        name = user.name,
                        surname = user.surname,
                        id = c.ContactAccountId
                    };
                }

                // Busca en la tabla Company
                var company = _context.Company.FirstOrDefault(co => co.account_id == c.ContactAccountId);
                if (company != null)
                {
                    return new
                    {
                        name = company.name,
                        surname = company.surname, 
                        id = c.ContactAccountId
                    };
                }

                return null; // Contacto inválido (no debería suceder)
            }).Where(contact => contact != null).ToList();

            // Devuelve la lista formateada
            return new ResponseModel
            {
                success = true,
                message = "Lista de contactos obtenida exitosamente.",
                data = formattedContacts
            };
        }



    }


}

