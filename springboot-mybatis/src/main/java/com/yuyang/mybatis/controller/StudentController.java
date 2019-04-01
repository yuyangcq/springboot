package com.yuyang.mybatis.controller;

import com.yuyang.mybatis.model.Happiness;
import com.yuyang.mybatis.model.Student;
import com.yuyang.mybatis.service.HappinessService;
import com.yuyang.mybatis.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @author yuyang
 * @date 2019/3/21 11:08
 */
@Controller
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @RequestMapping("/query")
    @ResponseBody
    public List<Map<String, Object>> testQuery(){
        return studentService.testQuery();
    }

}
