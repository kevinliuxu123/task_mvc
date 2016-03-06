/*    */ package com.cn.test.mvc.scheduler.service;
/*    */ 
/*    */ import com.cn.test.mvc.scheduler.bean.Scheduler;
/*    */ import com.cn.test.mvc.scheduler.dao.SchedulerDao;
/*    */ import java.util.List;
/*    */ import javax.annotation.Resource;
/*    */ import org.springframework.stereotype.Service;
/*    */ import org.springframework.transaction.annotation.Transactional;
/*    */ 
/*    */ @Service
/*    */ public class SchedulerService
/*    */ {
/*    */ 
/*    */   @Resource
/*    */   private SchedulerDao schedulerDao;
/*    */ 
/*    */   @Transactional
/*    */   public String insertSheduler(Scheduler scheduler)
/*    */   {
/* 21 */     return this.schedulerDao.insertSheduler(scheduler);
/*    */   }
/*    */ 
/*    */   @Transactional
/*    */   public List<Scheduler> getAllSheduler() {
/* 26 */     return this.schedulerDao.getAllSheduler();
/*    */   }
/*    */ }

/* Location:           F:\working with radon\workspace_j2ee\kevin_mvc\WEB-INF\classes\
 * Qualified Name:     com.cn.test.mvc.scheduler.service.SchedulerService
 * JD-Core Version:    0.6.2
 */