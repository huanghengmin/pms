package com.hzih.pms.web.action.set;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.junit.Test;

/**
 * 创建时间：2016-12-15 下午3:25
 * 描述信息：-------------------------------------------
 * <p/>
 * ------------------------------------------------------
 *
 * @author qianxp
 * @version 1.0.0.20161215
 */
public class ExpenseActionIT {
    private final Logger logger = Logger.getLogger(getClass());

    @Test
    public void findExpenseType(){
        try{
            HttpClient httpclient = HttpClientBuilder.create().build();
            HttpPost http = new HttpPost( "http://localhost:8080/pms/set/expense!findExpenseType.action?");
            HttpResponse response = httpclient.execute(http);
            String result = EntityUtils.toString(response.getEntity());
            logger.info("set findExpenseType result: "+response.getStatusLine().getStatusCode()+" , is ok! result is " + result);
//            Assert.assertEquals( 200, response.getStatusLine().getStatusCode() );
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
