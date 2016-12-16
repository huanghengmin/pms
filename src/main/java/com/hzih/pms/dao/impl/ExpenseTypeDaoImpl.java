package com.hzih.pms.dao.impl;

import com.hzih.pms.dao.ExpenseTypeDao;
import com.hzih.pms.domain.ExpenseType;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 创建时间：16-12-13  下午2:58
 * 描述信息：-------------------------------------------
 * <p/>
 * ------------------------------------------------------
 *
 * @author wud
 * @version 1.0.0.20161213
 */
@Repository("expenseTypeDao")
public class ExpenseTypeDaoImpl implements ExpenseTypeDao {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public ExpenseType load(Long id) {
        return null;
    }

    @Override
    public ExpenseType get(Long id) {
        return (ExpenseType) this.getCurrentSession().get(ExpenseType.class,id);
    }

    @Override
    public List<ExpenseType> findAll() {
        List<ExpenseType> list = this.getCurrentSession().createQuery(new String("from ExpenseType")).list();
        return list;
    }

    @Override
    public void persist(ExpenseType entity) {

    }

    @Override
    public Long save(ExpenseType entity) {
        return null;
    }

    @Override
    public void saveOrUpdate(ExpenseType entity) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void flush() {

    }

    @Override
    public void create(ExpenseType entity) {

    }
}
