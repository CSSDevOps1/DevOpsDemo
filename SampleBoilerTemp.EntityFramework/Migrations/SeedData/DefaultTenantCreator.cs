using System.Linq;
using SampleBoilerTemp.EntityFramework;
using SampleBoilerTemp.MultiTenancy;

namespace SampleBoilerTemp.Migrations.SeedData
{
    public class DefaultTenantCreator
    {
        private readonly SampleBoilerTempDbContext _context;

        public DefaultTenantCreator(SampleBoilerTempDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateUserAndRoles();
        }

        private void CreateUserAndRoles()
        {
            //Default tenant

            var defaultTenant = _context.Tenants.FirstOrDefault(t => t.TenancyName == Tenant.DefaultTenantName);
            if (defaultTenant == null)
            {
                _context.Tenants.Add(new Tenant {TenancyName = Tenant.DefaultTenantName, Name = Tenant.DefaultTenantName});
                _context.SaveChanges();
            }
        }
    }
}
