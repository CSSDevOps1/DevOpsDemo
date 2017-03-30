using System.Threading.Tasks;
using Abp.Application.Services;
using SampleBoilerTemp.Roles.Dto;

namespace SampleBoilerTemp.Roles
{
    public interface IRoleAppService : IApplicationService
    {
        Task UpdateRolePermissions(UpdateRolePermissionsInput input);
    }
}
