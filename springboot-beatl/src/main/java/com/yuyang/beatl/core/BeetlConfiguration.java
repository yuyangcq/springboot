package com.yuyang.beatl.core;

import org.apache.commons.lang.math.RandomUtils;
import org.beetl.ext.spring.BeetlGroupUtilConfiguration;

/**
 * @author yuyang
 * @date 2019/3/27 14:27
 * @description: beetl拓展配置, 绑定一些工具类, 方便在模板中直接调用.直接配置groupTemplate
 */
public class BeetlConfiguration extends BeetlGroupUtilConfiguration {

    /*
     * 注册自定义方法
     */
    public void initOther() {
        groupTemplate.registerFunctionPackage("random", new RandomUtils());
    }
}
