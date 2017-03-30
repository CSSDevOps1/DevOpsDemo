using System.Data.Entity.Migrations;
using Abp.MultiTenancy;
using Abp.Zero.EntityFramework;
using SampleBoilerTemp.Migrations.SeedData;
using EntityFramework.DynamicFilters;

namespace SampleBoilerTemp.Migrations
{
    public sealed class Configuration : DbMigrationsConfiguration<SampleBoilerTemp.EntityFramework.SampleBoilerTempDbContext>, IMultiTenantSeed
    {
        public AbpTenantBase Tenant { get; set; }

        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "SampleBoilerTemp";
        }

        protected override void Seed(SampleBoilerTemp.EntityFramework.SampleBoilerTempDbContext context)
        {
            context.DisableAllFilters();

            if (Tenant == null)
            {
                //Host seed
                new InitialHostDbBuilder(context).Create();

                //Default tenant seed (in host database).
                new DefaultTenantCreator(context).Create();
                new TenantRoleAndUserBuilder(context, 1).Create();
            }
            else
            {
                //You can add seed for tenant databases and use Tenant property...
            }

            context.SaveChanges();
        }
    }
}
