package com.yuyang.mybatis.controller;

import com.yuyang.mybatis.model.Happiness;
import com.yuyang.mybatis.service.HappinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author yuyang
 * @date 2019/3/21 11:08
 */
@Controller
@RequestMapping("/demo")
public class HappinessController {
    @Autowired
    private HappinessService happinessService;

    @RequestMapping("/query")
    @ResponseBody
    public Happiness testQuery(){
        return happinessService.selectService("成都市");
    }

    @RequestMapping("/insert")
    public void testInsert(){
        happinessService.insertService();
    }
}
