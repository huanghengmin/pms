package com.hzih.pms.utils;

import com.alibaba.fastjson.JSON;
import org.apache.struts2.ServletActionContext;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * 用于处理页面返回前台的数据
 * Created by Administrator on 16-10-10.
 */
public class AjaxUtil {
    /**
     * ajax返回text
     * @param text 返回页面的值为字符串
     */
    public static void ajaxResponse(String text) {
        try {
            ServletActionContext.getResponse().setContentType(
                    "text/html;charset=utf-8");
            ServletActionContext.getResponse().getWriter().write(text);
            ServletActionContext.getResponse().getWriter().flush();
            ServletActionContext.getResponse().getWriter().close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * ajaxJSON返回
     * @param object 返回页面的值为JavaBean
     */
    public static void ajaxJSONResponse(Object object) {
        try {
            String json = JSON.toJSONStringWithDateFormat(object,
                    "yyyy-MM-dd HH:mm:ss");
            ServletActionContext.getResponse().setContentType(
                    "text/html;charset=utf-8");
            ServletActionContext.getResponse().getWriter().write(json);
            ServletActionContext.getResponse().getWriter().flush();
            ServletActionContext.getResponse().getWriter().close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void ajaxFileResponse(File file) {
        InputStream in = null;
        try {
            ServletActionContext.getResponse().setContentType(
                    "text/html;charset=utf-8");
            in = new FileInputStream(file);
            byte[] buff = new byte[1024 *1024];
            int len = 0;
            while ((len=in.read(buff))!=-1){
                ServletActionContext.getResponse().getOutputStream().write(buff, 0, len);
            }
            ServletActionContext.getResponse().getOutputStream().flush();
            ServletActionContext.getResponse().getOutputStream().close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                }
            }
        }
    }
}
