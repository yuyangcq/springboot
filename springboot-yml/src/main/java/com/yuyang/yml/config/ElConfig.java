package com.yuyang.yml.config;

/**
 * @author yuyang
 * @date 2019/3/27 10:54
 */

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;


/**
 * 演示配置类
 * @configuration和@component之间的区别是：
 * @Component注解的范围最广，所有类都可以注解，
 * 但是@Configuration注解一般注解在这样的类上：这个类里面有@Value注解的成员变量和@Bean注解的方法，就是一个配置类。
 */
@Configuration
@ComponentScan("com.yuyang.yml.*")
@PropertySource("classpath:application.yml")//@PropertySource：加载指定的配置文件；
public class ElConfig {
    //@Value是以前spring底层的，使用@Value需要一个一个参数指定
    @Value("i love you")        //注入普通字符串
    private String normal;
    @Value("#{systemProperties['os.name']}")    //注入操作系统属性
    private String osName;
    @Value("#{T(java.lang.Math).random() * 100.0}") // 注入表达式
    private String random;

    @Value("classpath:application.yml") //注入文件资源
    private Resource testFile;
    @Value("http://www.baidu.com") //注入网址资源
    private Resource testUrl;
    @Value("${bookName}") //注入配置文件内容 注意是$符号
    private String bookName;

    @Autowired
    private Environment environment;  //注入配置文件内容

    @Bean   //注入配置文件内容
    public static PropertySourcesPlaceholderConfigurer propertyConfigure() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    public void show() {
        try {
            System.out.println(normal);
            System.out.println(osName);
            System.out.println(random);
            System.out.println(IOUtils.toString(testFile.getInputStream()));
            System.out.println(IOUtils.toString(testUrl.getInputStream()));
            System.out.println(bookName);
            System.out.println(environment.getProperty("bookAuthor"));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

