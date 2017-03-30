using Abp.IdentityFramework;
using Abp.UI;
using Abp.Web.Mvc.Controllers;
using Microsoft.AspNet.Identity;

namespace SampleBoilerTemp.Web.Controllers
{
    /// <summary>
    /// Derive all Controllers from this class.
    /// </summary>
    public abstract class SampleBoilerTempControllerBase : AbpController
    {
        protected SampleBoilerTempControllerBase()
        {
            LocalizationSourceName = SampleBoilerTempConsts.LocalizationSourceName;
        }

        protected virtual void CheckModelState()
        {
            if (!ModelState.IsValid)
            {
                throw new UserFriendlyException(L("FormIsNotValidMessage"));
            }
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}