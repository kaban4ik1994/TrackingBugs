using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class FilterSettings
    {
        public string WhoReported { get; set; }
        public string Status { get; set; }

        public bool SortDirection { get; set; }// false- убывание, true- возрастание
        public string SortBy { get; set; }// параметр для сортировки
    }
}