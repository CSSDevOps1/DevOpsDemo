using Abp.Dependency;
using Abp.Domain.Uow;
using Abp.MultiTenancy;
using Abp.Zero.EntityFramework;
using SampleBoilerTemp.EntityFramework;

namespace SampleBoilerTemp.Migrations
{
    public class AbpZeroDbMigrator : AbpZeroDbMigrator<SampleBoilerTempDbContext, Configuration>
    {
        public AbpZeroDbMigrator(
            IUnitOfWorkManager unitOfWorkManager,
            IDbPerTenantConnectionStringResolver connectionStringResolver,
            IIocResolver iocResolver)
            : base(
                unitOfWorkManager,
                connectionStringResolver,
                iocResolver)
        {
        }
    }
}
