using Abp.Web.Mvc.Views;

namespace SampleBoilerTemp.Web.Views
{
    public abstract class SampleBoilerTempWebViewPageBase : SampleBoilerTempWebViewPageBase<dynamic>
    {

    }

    public abstract class SampleBoilerTempWebViewPageBase<TModel> : AbpWebViewPage<TModel>
    {
        protected SampleBoilerTempWebViewPageBase()
        {
            LocalizationSourceName = SampleBoilerTempConsts.LocalizationSourceName;
        }
    }
}