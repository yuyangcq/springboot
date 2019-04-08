package com.yuyang.mybatis.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.yuyang.mybatis.model.Student;


/**
 * @author yuyang
 * @date 2019/3/21 09:35
 */
public interface StudentService {

    Page<Student> findAllStudentPage(Page<Student> page,String userName);
}
