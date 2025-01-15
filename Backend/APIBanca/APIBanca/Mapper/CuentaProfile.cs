using AutoMapper;
using Model.DTO;
using Model.Modelos;



namespace TP_Programación_III.Mapper
{
    public class CuentaProfile : Profile
    {
        public CuentaProfile()
        {
            CreateMap<Cuenta, CuentaDTO>();
            //CreateMap<ClientCreateDTO, Client>();
            //CreateMap<ClientPutDTO, Client>();
        }
    }
}
