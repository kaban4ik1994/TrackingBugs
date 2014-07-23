using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class ParametersForAClient 
    {
        public int CountBugs { get; set; }
        public List<string> ParametersForAFilter { get; set; } 
    }
}