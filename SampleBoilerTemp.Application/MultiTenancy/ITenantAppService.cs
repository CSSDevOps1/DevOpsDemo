using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SampleBoilerTemp.MultiTenancy.Dto;

namespace SampleBoilerTemp.MultiTenancy
{
    public interface ITenantAppService : IApplicationService
    {
        ListResultDto<TenantListDto> GetTenants();

        Task CreateTenant(CreateTenantInput input);
    }
}
