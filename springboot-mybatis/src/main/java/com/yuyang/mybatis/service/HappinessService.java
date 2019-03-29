package com.yuyang.mybatis.service;

import com.yuyang.mybatis.mapper.HappinessMapper;
import com.yuyang.mybatis.model.Happiness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author yuyang
 * @date 2019/3/21 09:35
 */
@Service
public class HappinessService {
    @Autowired
    private HappinessMapper happinessMapper;

    public Happiness selectService(String city){
        return happinessMapper.findHappinessByCity(city);
    }

    @Transactional
    public void insertService(){
        happinessMapper.insertHappiness("2222222", "韩国");
    }
}
