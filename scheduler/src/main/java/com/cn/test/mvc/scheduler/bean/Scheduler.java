/*    */ package com.cn.test.mvc.scheduler.bean;
/*    */ 
/*    */ import java.sql.Date;
/*    */ 
/*    */ public class Scheduler
/*    */ {
/*    */   private String trSeq;
/*    */   private String trTitle;
/*    */   private String trDescription;
/*    */   private int trTimeScope;
/*    */   private Date trStartDate;
/*    */   private Date trEndDate;
/*    */   private String trOwner;
/*    */ 
/*    */   public String getTrSeq()
/*    */   {
/* 15 */     return this.trSeq;
/*    */   }
/*    */   public void setTrSeq(String trSeq) {
/* 18 */     this.trSeq = trSeq;
/*    */   }
/*    */   public String getTrTitle() {
/* 21 */     return this.trTitle;
/*    */   }
/*    */   public void setTrTitle(String trTitle) {
/* 24 */     this.trTitle = trTitle;
/*    */   }
/*    */   public String getTrDescription() {
/* 27 */     return this.trDescription;
/*    */   }
/*    */   public void setTrDescription(String trDescription) {
/* 30 */     this.trDescription = trDescription;
/*    */   }
/*    */   public int getTrTimeScope() {
/* 33 */     return this.trTimeScope;
/*    */   }
/*    */   public void setTrTimeScope(int trTimeScope) {
/* 36 */     this.trTimeScope = trTimeScope;
/*    */   }
/*    */   public Date getTrStartDate() {
/* 39 */     return this.trStartDate;
/*    */   }
/*    */   public void setTrStartDate(Date trStartDate) {
/* 42 */     this.trStartDate = trStartDate;
/*    */   }
/*    */   public Date getTrEndDate() {
/* 45 */     return this.trEndDate;
/*    */   }
/*    */   public void setTrEndDate(Date trEndDate) {
/* 48 */     this.trEndDate = trEndDate;
/*    */   }
/*    */   public String getTrOwner() {
/* 51 */     return this.trOwner;
/*    */   }
/*    */   public void setTrOwner(String trOwner) {
/* 54 */     this.trOwner = trOwner;
/*    */   }
/*    */ }

/* Location:           F:\working with radon\workspace_j2ee\kevin_mvc\WEB-INF\classes\
 * Qualified Name:     com.cn.test.mvc.scheduler.bean.Scheduler
 * JD-Core Version:    0.6.2
 */