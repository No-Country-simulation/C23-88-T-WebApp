using AutoMapper;
using Model.DTO;
using Model.Modelos;
using Model.ViewModel.Cuenta;

namespace TP_Programación_III.Mapper
{
    public class CuentaProfile : Profile
    {
        public CuentaProfile()
        {
            // Mapping from Cuenta to CuentaDTO (existing mapping)
            CreateMap<Cuenta, CuentaDTO>();
            // Mapping from Usuario to UsuarioDTO (existing mapping)
            CreateMap<Usuario, UsuarioDTO>();

            CreateMap<Cuenta, Cuenta_Usuario_DTO>()
                .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.email))
                .ForMember(dest => dest.IdCuenta, opt => opt.MapFrom(src => src.Id));

            CreateMap<Usuario, Cuenta_Usuario_DTO>()
                .ForMember(dest => dest.Dni, opt => opt.MapFrom(src => src.Dni))
                .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
                .ForMember(dest => dest.Apellido, opt => opt.MapFrom(src => src.Apellido))
                .ForMember(dest => dest.Tel, opt => opt.MapFrom(src => src.Tel));

            CreateMap<Cuenta, Cuenta_Empresa_DTO>()
                .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.email))
                .ForMember(dest => dest.IdCuenta, opt => opt.MapFrom(src => src.Id));
            CreateMap<Empresa, Cuenta_Empresa_DTO>()
                .ForMember(dest => dest.Cuit, opt => opt.MapFrom(src => src.Cuit));
        }
    }
}
