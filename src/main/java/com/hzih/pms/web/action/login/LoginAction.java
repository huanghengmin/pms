package com.hzih.pms.web.action.login;

import com.hzih.pms.utils.AjaxUtil;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;

import javax.servlet.http.HttpServletRequest;

/**
 * 创建时间：2016-12-15 下午2:16
 * 描述信息：-------------------------------------------
 * 用户登录退出处理
 * ------------------------------------------------------
 *
 * @author qianxp
 * @version 1.0.0.20161215
 */
@Namespace("/login")
public class LoginAction extends ActionSupport {
    private final Logger logger = Logger.getLogger(getClass());
    private String userno;
    private String psw;
    private String code;
    private String autologon;
    private boolean isclient;
    private String macaddress;
    private String ra;
    private String ran;
    private String reqtk;

    public void setUserno(String userno) {
        this.userno = userno;
    }

    public void setPsw(String psw) {
        this.psw = psw;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setAutologon(String autologon) {
        this.autologon = autologon;
    }

    public void setIsclient(boolean isclient) {
        this.isclient = isclient;
    }

    public void setMacaddress(String macaddress) {
        this.macaddress = macaddress;
    }

    public void setRa(String ra) {
        this.ra = ra;
    }

    public void setRan(String ran) {
        this.ran = ran;
    }

    public void setReqtk(String reqtk) {
        this.reqtk = reqtk;
    }

    //    @Autowired
//    private HbaseService hbaseService;

    /**
     * 用户登录
     * @return 返回为空
     */
    public String userLogin(){
        try{
            HttpServletRequest request = ServletActionContext.getRequest();
            String json = "{State:{\"Success\":true,\"Des\":null,\"Errkey\":null},Data:{\"IsHotel\":true,\"PmsVer\":\"1\"}}";
            AjaxUtil.ajaxResponse(json);
        } catch (Exception e){
            logger.error("用户登录错误",e);
        }
        return null;
    }
}
