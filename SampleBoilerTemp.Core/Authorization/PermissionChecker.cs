using Abp.Authorization;
using SampleBoilerTemp.Authorization.Roles;
using SampleBoilerTemp.MultiTenancy;
using SampleBoilerTemp.Users;

namespace SampleBoilerTemp.Authorization
{
    public class PermissionChecker : PermissionChecker<Tenant, Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
