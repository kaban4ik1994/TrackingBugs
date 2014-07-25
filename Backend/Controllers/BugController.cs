using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using System.Web.Mvc;
using Backend.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Backend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BugController : ApiController
    {
        private BugContext _db = new BugContext();


        public IEnumerable<Bug> Get(int offset, int limit, [FromUri]FilterSettings filterSettings)
        {


            var result = new List<Bug>();
            var temp = _db.Bugs.Where(x => x.WhoReported == filterSettings.WhoReported || string.IsNullOrEmpty(filterSettings.WhoReported));
            temp = temp.Where(x => x.Status == filterSettings.Status || string.IsNullOrEmpty(filterSettings.Status));

            if (filterSettings.SortBy == "Date")
            {
                if (filterSettings.SortDirection)
                    temp = temp.OrderBy(x => x.Date);
                if (filterSettings.SortDirection==false)
                    temp = temp.OrderByDescending(x => x.Date);
            }

            if (filterSettings.SortBy == "WhoReported")
            {
                if (filterSettings.SortDirection)
                    temp = temp.OrderBy(x => x.WhoReported);
                if (!filterSettings.SortDirection==false)
                    temp = temp.OrderByDescending(x => x.WhoReported);
            }


            if (offset + limit < temp.Count())
            {
                for (var i = offset; i < (offset + limit); i++)
                {
                    result.Add(temp.ToList().ElementAt(i));
                }
            }
            else
            {
                for (var i = offset; i < temp.Count(); i++)
                {
                    result.Add(temp.ToList().ElementAt(i));
                }
            }
           

            return result;
        }

        public Bug Get(int id)
        {
            return _db.Bugs.ToList().Find(x => x.Id == id);
        }

        public ParametersForAClient GetParams([FromUri]FilterSettings filterSettings)
        {
            var count = _db.Bugs.Count(
                x => (x.WhoReported == filterSettings.WhoReported && x.Status == filterSettings.Status)
                    || (string.IsNullOrEmpty(filterSettings.WhoReported) && x.Status == filterSettings.Status)
                    || (string.IsNullOrEmpty(filterSettings.Status) && x.WhoReported == filterSettings.WhoReported)
                    || (string.IsNullOrEmpty(filterSettings.Status) && string.IsNullOrEmpty(filterSettings.WhoReported)));//тут подсчет страниц при различных параметрах фильтра
            var parameters = new List<string>();
            foreach (var bug in _db.Bugs.ToList().Where(bug => !parameters.Contains(bug.WhoReported)))
            {
                parameters.Add(bug.WhoReported);
            }

            return new ParametersForAClient { CountBugs = count, ParametersForAFilter = parameters };
        }


        public void Delete(int id)
        {
            _db.Bugs.Remove(_db.Bugs.ToList().Find(x => x.Id == id));
            _db.SaveChanges();
        }

        [System.Web.Http.HttpPost]
        public void Post(string date, string status, string whoReported)
        {
            var bug = new Bug { Status = status, Id = 0 };
            char[] charsToTrim = { '\\', '\"' };
            date = date.Trim(charsToTrim);
            bug.Date = Convert.ToDateTime(date);
            bug.WhoReported = whoReported;
            _db.Bugs.Add(bug);
            _db.SaveChanges();
        }

        [System.Web.Http.HttpPut]
        public IdBug Put(string status, string date, string whoReported, int id = 0)
        {
            var idBug = 0;
            if (id != 0)
            {
                var bug = _db.Bugs.ToList().Find(e => e.Id == id);
                bug.Status = status;
                char[] charsToTrim = { '\\', '\"' };
                date = date.Trim(charsToTrim);
                bug.Date = Convert.ToDateTime(date);
                bug.WhoReported = whoReported;
                _db.SaveChanges();
            }
            else
            {
                var bug = new Bug { Status = status, Id = 0 };
                char[] charsToTrim = { '\\', '\"' };
                date = date.Trim(charsToTrim);
                bug.Date = Convert.ToDateTime(date);
                bug.WhoReported = whoReported;
                _db.Bugs.Add(bug);
                _db.SaveChanges();
                idBug = bug.Id;
            }

            return new IdBug{Id=idBug};
        }

    }
}
