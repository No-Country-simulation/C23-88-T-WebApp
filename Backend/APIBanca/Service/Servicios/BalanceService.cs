using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
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

            if (from_account_balance == null)
            {
                // Handle the case where the 'from' account does not exist
                return "La cuenta remitente no existe.";
            }

            if (to_account_balance == null)
            {
                // Handle the case where the 'to' account does not exist
                return "La cuenta destinataria no existe.";
            }

            if (from_account_balance.balance < Amount)
            {
                // Check if the 'from' account has enough balance
                return "Fondos insuficientes.";
            }

            if (to_account_balance.balance + Amount > to_account_balance.max_balance) {
                return "La cuenta destinataria esta al maximo.";
                // 
            }


            // Subtract from 'from' account
            from_account_balance.balance -= Amount;

            // Add to 'to' account
            to_account_balance.balance += Amount;

            _context.Account_Balance.Update(from_account_balance);
            _context.Account_Balance.Update(to_account_balance);

            _context.SaveChanges();

            return "Transaccion exitosa";
        }

        public String Add_Balance(int Id_account, int Amount)
        {
            var Account_balance = _context.Account_Balance.FirstOrDefault(p => p.account_id == Id_account);

            if (Account_balance == null)
            {
                // Handle the case where the 'from' account does not exist
                return "La cuenta no existe.";
            }

            if (Amount <= 0 || Amount > 99999999) {
                return "Numero de fondos a agregar invalido";
            }

            // Add to 'to' account
            Account_balance.balance += Amount;

            _context.Account_Balance.Update(Account_balance);

            _context.SaveChanges();

            var new_balance = GetBalancebyAccountId(Id_account);

            return "Nuevos fondos: " + new_balance.balance;
        }

    }

}

