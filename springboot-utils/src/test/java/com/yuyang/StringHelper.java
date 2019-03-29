package com.yuyang;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

/**
 * @author yuyang
 * @date 2019/3/27 15:22
 */
public class StringHelper {
    @Test
    public void test1() {
        String str = "";
        boolean flag = StringUtils.isNotEmpty(str);
        System.out.println(StringUtils.isNotEmpty(null));
        System.out.println(StringUtils.isNotEmpty(""));
        System.out.println(StringUtils.isNotEmpty(" "));//注意在StringUtils中空格作非空处理
        System.out.println(StringUtils.isNotEmpty("bob"));

        System.out.println(StringUtils.isEmpty(null));
        System.out.println(StringUtils.isEmpty(""));
        System.out.println(StringUtils.isEmpty(" "));//注意在StringUtils中空格作非空处理
        System.out.println(StringUtils.isEmpty("bob"));

    }

    @Test
    public void test2() {
        String str = "[{name:'a',value:'aa'},{name:'b',value:'bb'},{name:'c',value:'cc'},{name:'d',value:'dd'}]";
        // 首先把字符串转成 JSONArray 对象
        JSONArray json = JSONArray.fromObject(str);
        if (json.size() > 0) {
            for (int i = 0; i < json.size(); i++) {
                // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                JSONObject job = json.getJSONObject(i);
                // 得到 每个对象中的属性值
                System.out.println(job.get("name") + "=");

            }
        }
    }
}

