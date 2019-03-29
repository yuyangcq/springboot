package com.yuyang.beatl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author yuyang
 * @date 2019/3/27 14:33
 */
@Controller
public class HelloController {

    @RequestMapping("/")
    public String hello() {
        return "login.html";
    }
}
