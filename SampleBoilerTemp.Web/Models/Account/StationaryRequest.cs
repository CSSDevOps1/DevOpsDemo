using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SampleBoilerTemp.Web.Models.Account
{
    public class Stationary_Request
    {
        public long UserId { get; set; }
        public Nullable<int> TenantId { get; set; }
        public long Id { get; set; }
        public Nullable<int> RequestId { get; set; }
        public Nullable<short> ParticularId { get; set; }
        public Nullable<short> UnitId { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<decimal> Vat { get; set; }
        public Nullable<decimal> VateRate { get; set; }
        public Nullable<decimal> FinalRate { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public string ParticularDesc { get; set; }
        public string UnitDesc { get; set; }
    }
}