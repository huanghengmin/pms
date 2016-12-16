package com.hzih.pms.web.action.set;


import com.hzih.pms.utils.AjaxUtil;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 创建时间：16-12-13  下午2:23
 * 描述信息：-------------------------------------------
 * <p/>
 * ------------------------------------------------------
 *
 * @author wud
 * @version 1.0.0.20161213
 */

//@Scope("prototype")
//@Component("ExpenseAction") //定义此类为spring组件,即bean类
@Namespace("/set")
public class ExpenseAction extends ActionSupport {
    /**记录运行信息**/
    private final Logger logger = Logger.getLogger(getClass());

//    @Autowired
//    private SetService setService;

    public String findExpenseType() {
        try{
            HttpServletRequest request = ServletActionContext.getRequest();
            String json = "{State:{\"Success\":true,\"Des\":null,\"Errkey\":null},Data:{\"IsHotel\":true,\"PmsVer\":\"1\"}}";
            AjaxUtil.ajaxResponse(json);
            logger.info("查询酒店类型");
        } catch (Exception e){
            logger.error("查询酒店类型错误",e);
        }
        return null;
    }

}
