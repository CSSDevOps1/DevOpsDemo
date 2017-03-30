using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using SampleBoilerTemp.EntityFramework;

namespace SampleBoilerTemp.Migrator
{
    [DependsOn(typeof(SampleBoilerTempDataModule))]
    public class SampleBoilerTempMigratorModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer<SampleBoilerTempDbContext>(null);

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}