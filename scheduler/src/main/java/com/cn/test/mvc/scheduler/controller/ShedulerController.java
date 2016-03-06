/*    */ package com.cn.test.mvc.scheduler.controller;
/*    */ 
/*    */ import com.cn.test.mvc.scheduler.bean.Scheduler;
/*    */ import com.cn.test.mvc.scheduler.service.SchedulerService;
/*    */ import java.util.List;
/*    */ import javax.servlet.http.HttpServletRequest;
/*    */ import javax.servlet.http.HttpServletResponse;
/*    */ import org.springframework.beans.factory.annotation.Autowired;
/*    */ import org.springframework.stereotype.Controller;
/*    */ import org.springframework.web.bind.annotation.RequestBody;
/*    */ import org.springframework.web.bind.annotation.RequestMapping;
/*    */ import org.springframework.web.bind.annotation.ResponseBody;
/*    */ 
/*    */ @Controller
/*    */ public class ShedulerController
/*    */ {
/*    */ 
/*    */   @Autowired
/*    */   private SchedulerService schedulerService;
/*    */ 
/*    */   @RequestMapping(value={"/getAllSheduler.rest"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
/*    */   @ResponseBody
/*    */   public List<Scheduler> getAllSheduler(HttpServletRequest request, HttpServletResponse response)
/*    */   {
/* 26 */     return this.schedulerService.getAllSheduler();
/*    */   }
/*    */   @RequestMapping(value={"/addScheduler.rest"}, method={org.springframework.web.bind.annotation.RequestMethod.PUT})
/*    */   @ResponseBody
/*    */   public Scheduler addSheduler(@RequestBody Scheduler scheduler, HttpServletRequest request, HttpServletResponse response) {
/* 32 */     this.schedulerService.insertSheduler(scheduler);
/* 33 */     return scheduler;
/*    */   }
/*    */ }

/* Location:           F:\working with radon\workspace_j2ee\kevin_mvc\WEB-INF\classes\
 * Qualified Name:     com.cn.test.mvc.scheduler.controller.ShedulerController
 * JD-Core Version:    0.6.2
 */