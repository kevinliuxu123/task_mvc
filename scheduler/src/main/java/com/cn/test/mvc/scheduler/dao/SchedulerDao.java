/*    */ package com.cn.test.mvc.scheduler.dao;

/*    */
/*    */ import com.cn.test.mvc.scheduler.bean.Scheduler;
/*    */ import java.sql.ResultSet;
/*    */ import java.sql.SQLException;
/*    */ import java.util.ArrayList;
/*    */ import java.util.List;
/*    */ import org.springframework.beans.factory.annotation.Autowired;
/*    */ import org.springframework.jdbc.core.JdbcTemplate;
/*    */ import org.springframework.jdbc.core.RowCallbackHandler;
/*    */ import org.springframework.stereotype.Repository;

/*    */
/*    */ @Repository
/*    */ public class SchedulerDao
/*    */ {
	/*    */
	/*    */ @Autowired
	/*    */ private JdbcTemplate jdbcTemplate;

	/*    */
	/*    */ public List<Scheduler> getAllSheduler()
	/*    */ {
		/* 21 */ final List<Scheduler> schedulers = new ArrayList<Scheduler>();
		/* 22 */ this.jdbcTemplate.query("select *  from scheduler", new RowCallbackHandler() {
			/*    */ public void processRow(ResultSet rs) throws SQLException {
				/* 24 */ Scheduler scheduler = new Scheduler();
				/* 25 */ scheduler.setTrSeq(rs.getString("id"));
				/* 26 */ scheduler.setTrDescription(rs.getString("discription"));
				/* 27 */ scheduler.setTrStartDate(rs.getDate("beginDate"));
				/* 28 */ scheduler.setTrEndDate(rs.getDate("endDate"));
				/* 29 */ scheduler.setTrOwner(rs.getString("owner"));
				/* 30 */ scheduler.setTrTimeScope(rs.getInt("time"));
				/* 31 */ scheduler.setTrTitle(rs.getString("title"));
				/* 32 */ schedulers.add(scheduler);
				/*    */ }
			/*    */ });
		/* 36 */ return schedulers;
		/*    */ }

	/*    */
	/*    */ public String insertSheduler(Scheduler scheduler) {
		/* 40 */ String insertSql = "INSERT INTO scheduler(title,discription,time,beginDate,endDate,owner) values(?,?,?,?,?,?)";
		/* 41 */ this.jdbcTemplate.update(insertSql,
				/* 42 */ new Object[] { scheduler.getTrTitle(), scheduler.getTrDescription(),
						Integer.valueOf(scheduler.getTrTimeScope()), /* 43 */ scheduler.getTrStartDate(),
						scheduler.getTrEndDate(), scheduler.getTrOwner() },
				/* 44 */ new int[] { 12, 12, 4, 91, /* 45 */ 91, 12 });
		/*    */
		/* 47 */ return "";
		/*    */ }
	/*    */ }

/*
 * Location: F:\working with radon\workspace_j2ee\kevin_mvc\WEB-INF\classes\
 * Qualified Name: com.cn.test.mvc.scheduler.dao.SchedulerDao JD-Core Version:
 * 0.6.2
 */