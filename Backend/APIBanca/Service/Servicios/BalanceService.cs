using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Identity.Client;
using Model.DTO;
using Model.Modelos;
using Model.ViewModel.account;
using MySqlX.XDevAPI;
using MySqlX.XDevAPI.Common;
using Servicio.IServices;

namespace Service.Services
{
    public class BalanceService : IBalanceService
    {
        private readonly BancaDBContext _context;

        public BalanceService(BancaDBContext context)
        {
            _context = context;
        }

        public Account_Balance GetBalancebyAccountId(long Id)
        {
            return _context.Account_Balance.FirstOrDefault(p => p.account_id == Id);
        }

        public ResponseModel Transaction(long Id_from, long Id_to, int Amount)
        {
            var from_account_balance = _context.Account_Balance.FirstOrDefault(p => p.account_id == Id_from);
            var to_account_balance = _context.Account_Balance.FirstOrDefault(p => p.account_id == Id_to);

            if (Id_from == Id_to)
            {
                return new ResponseModel { success = false, message = "Error: La cuenta remitente y destinataria son iguales" };
            }

            if (from_account_balance == null)
            {
                return new ResponseModel { success = false, message = "Error: La cuenta remitente no existe." };
            }

            if (to_account_balance == null)
            {
                return new ResponseModel { success = false, message = "Error: La cuenta destinataria no existe." };
            }

            if (from_account_balance.balance < Amount)
            {
                return new ResponseModel {success = false, message = "Error: Fondos insuficientes." };
            }

            if (to_account_balance.balance + Amount > to_account_balance.max_balance)
            {
                return new ResponseModel {success = false, message = "Error: La cuenta destinataria está al máximo." };
            }

            from_account_balance.balance -= Amount;
            to_account_balance.balance += Amount;

            _context.Account_Balance.Update(from_account_balance);
            _context.Account_Balance.Update(to_account_balance);

            Create_Transaction_history(from_account_balance.account_id, "Enviar", Amount, to_account_balance.account_id);
            Create_Transaction_history(to_account_balance.account_id, "Recibir", Amount, from_account_balance.account_id);

            _context.SaveChanges();

            return new ResponseModel { success = true, message = "Transacción exitosa" };
        }



        public ResponseModel Add_Balance(Recharge_DTO values)
        {
            var Id_account = values.Account_id;
            var Amount = values.Value;
            var Account_balance = _context.Account_Balance.FirstOrDefault(p => p.account_id == Id_account);

            if (Account_balance == null)
            {
                return new ResponseModel { success = false, message = "Error: La cuenta no existe." };
            }

            if (Amount <= 0 || Amount > 99999999)
            {
                return new ResponseModel {success = false, message = "Error: Número de fondos a agregar inválido." };
            }

            if (Account_balance.balance + Amount > Account_balance.max_balance)
            {
                return new ResponseModel {success = false, message = "Error: La cuenta está al máximo." };
            }

            Account_balance.balance += Amount;

            _context.Account_Balance.Update(Account_balance);
            _context.SaveChanges();

            Create_Recharge_history(Id_account, Amount);

            var new_balance = GetBalancebyAccountId(Id_account);

            return new ResponseModel
            {
                success = true,
                message = "Fondos añadidos con éxito.",
                data = new { AccountId = Id_account, NewBalance = new_balance.balance }
            };
        }



        public String Add_history_object(History_object New_history)
        {
            _context.History_object.Add(New_history);

            _context.SaveChanges();

            return "Created history object";
        }

        private void Create_Recharge_history(long Id_account, int Value) {
            var historyObject = new History_object();
            historyObject.account_id = Id_account;
            historyObject.date = DateTime.Now;
            historyObject.value = Value;
            historyObject.type = "Recarga";

            Add_history_object(historyObject);
        }

        private void Create_Transaction_history(long Id_account, string Type, int Value, long Other_id)
        {
            var historyObject = new History_object();
            historyObject.account_id = Id_account;
            historyObject.date = DateTime.Now;
            historyObject.value = Value;
            historyObject.type = Type;
            historyObject.other_account_id = Other_id;

            Add_history_object(historyObject);
        }

        public IEnumerable<History_object> Get_history_By_Id(long Id, int limit, int offset)
        {
            return _context.History_object
                           .Where(p => p.account_id == Id)  // Filtrar por account_id
                           .OrderByDescending(p => p.date)  // Ordenar por fecha descendente
                           .Skip(offset)  // Omitir los primeros 'offset' registros
                           .Take(limit)   // Tomar solo 'limit' registros
                           .ToList();
        }







    }

}

