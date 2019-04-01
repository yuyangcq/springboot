package com.yuyang.mybatis.service;

import com.yuyang.mybatis.mapper.StudentMapper;
import com.yuyang.mybatis.model.Happiness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author yuyang
 * @date 2019/3/21 09:35
 */
@Service
public class StudentService {
    @Autowired
    private StudentMapper studentMapper;

    public Happiness selectService(String city){
        return studentMapper.findHappinessByCity(city);
    }


}
