using Abp.Domain.Entities;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;

namespace SampleBoilerTemp.EntityFramework.Repositories
{
    public abstract class SampleBoilerTempRepositoryBase<TEntity, TPrimaryKey> : EfRepositoryBase<SampleBoilerTempDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected SampleBoilerTempRepositoryBase(IDbContextProvider<SampleBoilerTempDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //add common methods for all repositories
    }

    public abstract class SampleBoilerTempRepositoryBase<TEntity> : SampleBoilerTempRepositoryBase<TEntity, int>
        where TEntity : class, IEntity<int>
    {
        protected SampleBoilerTempRepositoryBase(IDbContextProvider<SampleBoilerTempDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //do not add any method here, add to the class above (since this inherits it)
    }
}
