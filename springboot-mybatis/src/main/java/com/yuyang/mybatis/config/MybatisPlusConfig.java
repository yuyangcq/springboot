package com.yuyang.mybatis.config;

import com.baomidou.mybatisplus.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author yuyang
 * @date 2019/3/28 13:51
 */
@Configuration
@MapperScan("com.yuyang.mybatis.mapper*")
public class MybatisPlusConfig {

    /**
     * mybatis-plus 分页插件
     * @return
     */
    @Bean
    public PaginationInterceptor paginationInterceptor(){
        PaginationInterceptor page = new PaginationInterceptor();
        //设置方言类型
        page.setDialectType("mysql");
        return page;
    }
}
