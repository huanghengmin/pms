package com.hzih.pms.service.impl;

import com.hzih.pms.dao.ExpenseTypeDao;
import com.hzih.pms.service.SetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 创建时间：16-12-13  下午2:29
 * 描述信息：-------------------------------------------
 * <p/>
 * ------------------------------------------------------
 *
 * @author wud
 * @version 1.0.0.20161213
 */
@Service("setService")
public class SetServiceImpl implements SetService{


    @Autowired
    private ExpenseTypeDao expenseTypeDao;

    @Override
    public String findExpenseType() {
//        List<ExpenseType> expenseTypeList = expenseTypeDao.findAll();
//        int total= expenseTypeList.size();
//        String json = "{\"count\":\""+total+"\",\"Data\":{\"spfl\":[";
//        for(ExpenseType expenseType : expenseTypeList){
//            json +="{\"Id\":\""+expenseType.getId()+"\",\"Name\":\""+expenseType.getName()+"\"},";
//        }
//        if(json.endsWith(",")){
//            json=json.substring(0,json.length()-1);
//        }
//        json += "]}}";
//        return json;
        return null;

    }

//{"Data":{
// "spfl":[{"EntityKey":"Id","TableName":"SPFL","Id":142,"ComId":38482,"ShopId":32045,"BH":"5","Name":"房费","dMiniDis":"","boCYKC":false,"iCKID":0,"CZY":"13588288482","iDate":"\/Date(1481616138000)\/","iType":2,"ConnectString":null},
//         {"EntityKey":"Id","TableName":"SPFL","Id":134,"ComId":38482,"ShopId":32045,"BH":"4","Name":"赔偿费","dMiniDis":"","boCYKC":false,"iCKID":0,"CZY":"13588288482","iDate":"\/Date(1481173911000)\/","iType":2,"ConnectString":null}],
// "spxx":[{"EntityKey":"Id","TableName":"SPXX","Id":227,"ComId":38482,"ShopId":32045,"BH":"401","Name":"热水壶损坏赔偿111","PYM":"RSHSHPC111","TXM":"","iSPFL":134,"dDJ":50.00,"dDJ1":0.00,"dDJ2":0.00,"dDJ3":0.00,"DW":"","dMinwarn":0.00,"dMaxWarn":0.00,"boSJ":false,"dMinDis":0.00,"Des":"热水壶损坏赔偿50","CZY":"13588288482","iDate":"\/Date(1481176003000)\/","myfield1":"","myfield2":0,"bodj":false,"Available":0,"SPFLName":"赔偿费","AvailableName":"使用","ConnectString":null},
//         {"EntityKey":"Id","TableName":"SPXX","Id":231,"ComId":38482,"ShopId":32045,"BH":"501","Name":"ff","PYM":"ff","TXM":"","iSPFL":142,"dDJ":0.00,"dDJ1":0.00,"dDJ2":0.00,"dDJ3":0.00,"DW":"","dMinwarn":0.00,"dMaxWarn":0.00,"boSJ":false,"dMinDis":0.00,"Des":"","CZY":"13588288482","iDate":"\/Date(1481616151000)\/","myfield1":"","myfield2":0,"bodj":false,"Available":0,"SPFLName":"房费","AvailableName":"使用","ConnectString":null}],
//          "count":2},"State":{"Success":true,"Des":null,"Errkey":null,"Data":null}}


    @Override
    public String findExpense() {
        return null;
    }
}
