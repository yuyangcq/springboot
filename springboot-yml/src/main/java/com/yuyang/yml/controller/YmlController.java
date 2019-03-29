package com.yuyang.yml.controller;

import com.yuyang.yml.config.ElConfig;
import com.yuyang.yml.config.PersonConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author yuyang
 * @date 2019/3/21 11:08
 */
@Controller
@RequestMapping("/yml")
public class YmlController {
    @Autowired
    private ElConfig elConfig;
    @Autowired
    private PersonConfig personConfig;


    @RequestMapping("/query")
    @ResponseBody
    public void test1() {
        elConfig.show();
    }

    @RequestMapping("/person")
    @ResponseBody
    public void test2() {
        personConfig.show();
    }

}
