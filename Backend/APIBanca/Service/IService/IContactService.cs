using Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IService
{
    public interface IContactService
    {
        ResponseModel AddContact(int currentUserId, string identifier);
        ResponseModel GetContactList(int currentUserId);


    }
}
