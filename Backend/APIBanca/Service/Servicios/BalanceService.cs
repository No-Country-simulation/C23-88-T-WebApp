using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Identity.Client;
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

        public Account_Balance GetBalancebyAccountId(int Id)
        {
            return _context.Account_Balance.FirstOrDefault(p => p.account_id == Id);
        }

        public String Transaction(int Id_from, int Id_to, int Amount)
        {
            var from_account_balance = _context.Account_Balance.FirstOrDefault(p => p.account_id == Id_from);

            var to_account_balance = _context.Account_Balance.FirstOrDefault(p => p.account_id == Id_to);

            if (Id_from == Id_to)
            {
                return "Error: La cuenta remitente y destinataria son iguales";
            }

            if (from_account_balance == null)
            {
                // Handle the case where the 'from' account does not exist
                return "Error: La cuenta remitente no existe.";
            }

            if (to_account_balance == null)
            {
                // Handle the case where the 'to' account does not exist
                return "Error: La cuenta destinataria no existe.";
            }

            if (from_account_balance.balance < Amount)
            {
                // Check if the 'from' account has enough balance
                return "Error: Fondos insuficientes.";
            }

            if (to_account_balance.balance + Amount > to_account_balance.max_balance) {
                return "Error: La cuenta destinataria esta al maximo.";
                // 
            }


            // Subtract from 'from' account
            from_account_balance.balance -= Amount;

            // Add to 'to' account
            to_account_balance.balance += Amount;

            _context.Account_Balance.Update(from_account_balance);
            _context.Account_Balance.Update(to_account_balance);

            Create_Transaction_history(from_account_balance.account_id, "Enviar", Amount, to_account_balance.account_id);
            Create_Transaction_history(to_account_balance.account_id, "Recibir", Amount, from_account_balance.account_id);

            _context.SaveChanges();
            return "Transaccion exitosa";
        }

        public String Add_Balance(int Id_account, int Amount)
        {
            var Account_balance = _context.Account_Balance.FirstOrDefault(p => p.account_id == Id_account);

            if (Account_balance == null)
            {
                return "Error: La cuenta no existe.";
            }

            if (Amount <= 0 || Amount > 99999999) {
                return "Error: Numero de fondos a agregar invalido";
            }

            if (Account_balance.balance + Amount > Account_balance.max_balance)
            {
                return "Error: La cuenta esta al maximo.";
            }

            Account_balance.balance += Amount;

            _context.Account_Balance.Update(Account_balance);

            _context.SaveChanges();

            Create_Recharge_history(Id_account, Amount);

            var new_balance = GetBalancebyAccountId(Id_account);

            return "Nuevos fondos: " + new_balance.balance;

        }

        public String Add_history_object(History_object New_history)
        {
            _context.History_object.Add(New_history);

            _context.SaveChanges();

            return "Created history object";
        }

        private void Create_Recharge_history(int Id_account, int Value) {
            var historyObject = new History_object();
            historyObject.account_id = Id_account;
            historyObject.date = DateTime.Now;
            historyObject.value = Value;
            historyObject.type = "Recarga";

            Add_history_object(historyObject);
        }

        private void Create_Transaction_history(int Id_account, string Type, int Value, int Other_id)
        {
            var historyObject = new History_object();
            historyObject.account_id = Id_account;
            historyObject.date = DateTime.Now;
            historyObject.value = Value;
            historyObject.type = Type;
            historyObject.other_account_id = Other_id;

            Add_history_object(historyObject);
        }

        public IEnumerable<History_object> Get_history_By_Id(int Id)
        {
            return _context.History_object
                           .Where(p => p.account_id == Id)  // Filtrar
                           .ToList();
        }





    }

}

