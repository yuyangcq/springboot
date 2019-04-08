package com.yuyang.mybatis.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.yuyang.mybatis.mapper.StudentMapper;
import com.yuyang.mybatis.model.Student;
import com.yuyang.mybatis.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author yuyang
 * @date 2019/3/21 09:35
 */
@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentMapper studentMapper;

    @Override
    public Page<Student> findAllStudentPage(Page<Student> page,String userName) {
        page.setRecords(studentMapper.findAllStudentPage(page,userName));
        return page;
    }


}
