using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class BugContext:DbContext
    {
        public DbSet<Bug> Bugs { get; set; }
    }
}