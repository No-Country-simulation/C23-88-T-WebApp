using Model.ViewModels;
using MySqlX.XDevAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Modelos;
using Model.DTO;
using Model.ViewModel.account;

namespace Servicio.IServices
{
    public interface IBalanceService
    {
        public Account_Balance GetBalancebyAccountId(int Id);

        public ResponseModel Transaction(int Id_from, int Id_to, int Amount);

        public ResponseModel Add_Balance(Recharge_DTO values);

        public String Add_history_object(History_object New_history);

        public IEnumerable<History_object> Get_history_By_Id(int Id, int limit, int offset);

        public int CountHistoryById(int Id);

        public object GetUserOrCompanyById(int id);

        //public void Create_Recharge_history(int Id_account, int Value);

        //public void Create_Transaction_history(int Id_account, string Type, int Value, int Other_id);

    }
}