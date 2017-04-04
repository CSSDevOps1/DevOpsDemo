using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SampleBoilerTemp.Web.Models.DAO;
using System.Web.Http.Description;
using System.Threading.Tasks;
using SampleBoilerTemp.Web.Models.Account;
using System.Web.Mvc;

namespace SampleBoilerTemp.Web.App_Start
{
    public class RequestFormController : Controller
    {
        private CoreRequestEntities smsEntity = new CoreRequestEntities();

        public ActionResult GetAllRequests(int tenantId,int userId)
        {
            var values = from request in smsEntity.StationaryRequests
                         join st in smsEntity.Status on request.StatusId equals st.StatusId
                         join user in smsEntity.AbpUsers on request.UserId equals user.Id  where user.TenantId==tenantId && user.Id==userId
                         select new { request.RequestId, st.StatusDescription, user.UserName, request.CreatedDate };
          
            return Json(values.ToList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllParticulars()
        {
            var values = from particular in smsEntity.SMS_Particulars select new { particular.Item_id,particular.Item_Description};
            return Json(values.ToList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetUnits()
        {
            var values = from unit in smsEntity.SMS_Units select new { unit.Unit_Id, unit.Unit_Description };
            return Json(values.ToList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditRequest(int? requestId)
        {
            var requestdetails = from req in smsEntity.StationaryRequestDetails join  part in smsEntity.SMS_Particulars on req.ParticularId equals part.Item_id join 
                                unit in smsEntity.SMS_Units on req.UnitId equals unit.Unit_Id join reqst in smsEntity.StationaryRequests on req.RequestId equals reqst.RequestId  where req.RequestId == requestId 
                                 select new {part.Item_Description,req.Quantity,req.Rate,req.Id,req.VateRate,req.FinalRate,req.Vat,unit.Unit_Description,req.Cost,reqst.TenantId,reqst.UserId,req.RequestId,unit.Unit_Id,part.Item_id};
            return Json(requestdetails.ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetRateDetails(int particular,int unit)
        {
           
           // var particularId = (from part in smsEntity.SMS_Particulars where part.Item_id ==Convert.ToInt32(particular) select part.Item_id).FirstOrDefault();
           // var UnitId = (from units in smsEntity.SMS_Units where units.Unit_Id ==Convert.ToInt32(unit) select units.Unit_Id).FirstOrDefault();

            var rate = from rates in smsEntity.SMS_Particular_Unit where rates.Item_id == particular && rates.Unit_Id == unit select new { rates.VAT, rates.Rate };
            
            return Json(rate.ToList(), JsonRequestBehavior.AllowGet);
        }
        public string PostStationaryRequestDetails1(int stRequest)
        {
            return "";
        }
        public string PostStationaryRequestDetails(int? requestId, List<Stationary_Request> stRequest, List<Stationary_Request> stRequest1)
        {

           
            if (requestId == null)
            {
                long userid = stRequest[0].UserId;
                int? tenantid = stRequest[0].TenantId;
                var username = (from user in smsEntity.AbpUsers where user.Id == userid && user.TenantId == tenantid select user.UserName).FirstOrDefault();

                //var user = smsEntity.AbpUsers.Select(x => x.Id == stRequest[0].UserId).SingleOrDefault();
                // var userName = smsEntity.AbpUsers.Where(a => a.Id == stRequest[0].UserId).Select(x => x.UserName).SingleOrDefault();
                //var userName = b.Countries.First(a => a.DOTWInternalID == citee.CountryCode).ID from test in smsEntity.AbpUsers where test.Id == stRequest.UserId && test.TenantId == stRequest.TenantId select test.UserName.FirstOrDefault();
                StationaryRequest stationaryRequest = new StationaryRequest();
                stationaryRequest.UserId = stRequest[0].UserId;
                stationaryRequest.TenantId = stRequest[0].TenantId;
                stationaryRequest.CreatedBy = username;//userName.ToString();
                stationaryRequest.StatusId = 1;
                stationaryRequest.IsActive = 1;
                stationaryRequest.CreatedDate = DateTime.Now;
                smsEntity.StationaryRequests.Add(stationaryRequest);
                smsEntity.SaveChanges();

                //var reqId = from test in smsEntity.StationaryRequests where test.UserId == stRequest.UserId && test.TenantId == stRequest.TenantId && test.RequestId == stationaryRequest.RequestId select test.RequestId.va
                //var reqId = smsEntity.StationaryRequests.First(a => a.UserId == stRequest.UserId && a.TenantId == stRequest.TenantId).RequestId;
                var reqIds = (from req in smsEntity.StationaryRequests where req.UserId == userid && req.TenantId == tenantid orderby req.RequestId descending select req.RequestId).FirstOrDefault();
                //var reqId = smsEntity.StationaryRequests.Where(a => a.UserId == stRequest[0].UserId && a.TenantId == stRequest[0].TenantId)
                //      .OrderByDescending(a => a.RequestId)
                //   .Select(a => a.RequestId).FirstOrDefault();



                foreach (Stationary_Request obj in stRequest)
                {
                  
                        //var particularId = (from part in smsEntity.SMS_Particulars where part.Item_Description == obj.ParticularDesc select part.Item_id).FirstOrDefault();
                        //var UnitId = (from unit in smsEntity.SMS_Units where unit.Unit_Description == obj.UnitDesc select unit.Unit_Id).FirstOrDefault();
                        StationaryRequestDetail stationaryRequestDetail = new StationaryRequestDetail();
                        stationaryRequestDetail.ParticularId = obj.Item_id;
                        stationaryRequestDetail.RequestId = reqIds;
                        stationaryRequestDetail.UnitId = obj.Unit_Id;
                        stationaryRequestDetail.Rate = obj.Rate;
                        stationaryRequestDetail.Vat = obj.Vat;
                        stationaryRequestDetail.VateRate = obj.VateRate;
                        stationaryRequestDetail.FinalRate = obj.FinalRate;
                        stationaryRequestDetail.Quantity = obj.Quantity;
                        stationaryRequestDetail.Cost = obj.Cost;
                        smsEntity.StationaryRequestDetails.Add(stationaryRequestDetail);
                        smsEntity.SaveChanges();
                    

                }
            }


            return "";
        }
        public void Add()
        {
            //var val = smsEntity.AbpUsers.Select(x => x.Id == 1 && x.TenantId == 1).FirstOrDefault();
            var userName = from test in smsEntity.AbpUsers where test.Id == 1 select test.UserName.FirstOrDefault();
            StationaryRequest obj = new StationaryRequest();
            obj.UserId = 1;
            obj.TenantId = 1;
            obj.CreatedBy = userName.ToString();

            smsEntity.StationaryRequests.Add(obj);
            smsEntity.SaveChanges();

        }


    }
}
