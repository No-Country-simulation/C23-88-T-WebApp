using AutoMapper;
using Model.DTO;
using Model.Modelos;
using Model.ViewModel.account; 

namespace TP_Programación_III.Mapper
{
    public class accountProfile : Profile
    {
        public accountProfile()
        {
            // Mapping from account to accountDTO (existing mapping)
            CreateMap<Account, accountDTO>();
            // Mapping from Usuario to UsuarioDTO (existing mapping)
            CreateMap<User, UsuarioDTO>();

            CreateMap<Account, account_Usuario_DTO>()
                .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.email))
                .ForMember(dest => dest.account_id, opt => opt.MapFrom(src => src.id));

            CreateMap<User, account_Usuario_DTO>()
                .ForMember(dest => dest.dni, opt => opt.MapFrom(src => src.dni))
                .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.name))
                .ForMember(dest => dest.surname, opt => opt.MapFrom(src => src.surname))
                .ForMember(dest => dest.phone, opt => opt.MapFrom(src => src.phone))
                .ForMember(dest => dest.address, opt => opt.MapFrom(src => src.address));

            CreateMap<Account, account_Empresa_DTO>()
                .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.email))
                .ForMember(dest => dest.account_id, opt => opt.MapFrom(src => src.id));
            CreateMap<Company, account_Empresa_DTO>()
                .ForMember(dest => dest.cuit, opt => opt.MapFrom(src => src.cuit))
                .ForMember(dest => dest.phone, opt => opt.MapFrom(src => src.phone))
                .ForMember(dest => dest.address, opt => opt.MapFrom(src => src.address));

        }
    }
}
