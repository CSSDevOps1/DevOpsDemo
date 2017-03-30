using System.Threading.Tasks;
using Abp.Auditing;
using Abp.Authorization;
using Abp.AutoMapper;
using SampleBoilerTemp.Sessions.Dto;

namespace SampleBoilerTemp.Sessions
{
    [AbpAuthorize]
    public class SessionAppService : SampleBoilerTempAppServiceBase, ISessionAppService
    {
        [DisableAuditing]
        public async Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations()
        {
            var output = new GetCurrentLoginInformationsOutput
            {
                User = (await GetCurrentUserAsync()).MapTo<UserLoginInfoDto>()
            };

            if (AbpSession.TenantId.HasValue)
            {
                output.Tenant = (await GetCurrentTenantAsync()).MapTo<TenantLoginInfoDto>();
            }

            return output;
        }
    }
}