using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class Bug
    {
        [Key]
        public int Id { get; set; }
        public string WhoReported { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
    }
}