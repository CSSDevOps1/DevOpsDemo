using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using Abp.Zero.EntityFramework;
using SampleBoilerTemp.EntityFramework;

namespace SampleBoilerTemp
{
    [DependsOn(typeof(AbpZeroEntityFrameworkModule), typeof(SampleBoilerTempCoreModule))]
    public class SampleBoilerTempDataModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<SampleBoilerTempDbContext>());

            Configuration.DefaultNameOrConnectionString = "Default";
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}
