using SampleBoilerTemp.EntityFramework;
using EntityFramework.DynamicFilters;

namespace SampleBoilerTemp.Migrations.SeedData
{
    public class InitialHostDbBuilder
    {
        private readonly SampleBoilerTempDbContext _context;

        public InitialHostDbBuilder(SampleBoilerTempDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            _context.DisableAllFilters();

            new DefaultEditionsCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();
        }
    }
}
