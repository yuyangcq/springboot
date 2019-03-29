package com.yuyang.date;


import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class TimeFormat {

    //几秒钟之前
    private static final Pattern time1 = Pattern.compile("(\\d+)(?:秒前)");
    //几分钟之前
    private static final Pattern time2 = Pattern.compile("(\\d+)(?:分钟前)");
    //几小时之前
    private static final Pattern time3 = Pattern.compile("(\\d+)(?:小时前)");
    //几天前
    private static final Pattern time4 = Pattern.compile("(\\d+)(?:天|日前)");
    //今天09:30
    private static final Pattern time5 = Pattern.compile("(?:今天|今日)(\\d+:\\d+)");
    //昨天09:30
    private static final Pattern time6 = Pattern.compile("(?:昨天|昨日)(\\d+:\\d+)");
    //前天09:30
    private static final Pattern time7 = Pattern.compile("(?:前天|前日)(\\d+:\\d+)");
    //09:30
    private static final Pattern time8 = Pattern.compile("^\\d+:\\d+$");

    //2017-06-30 09:20:56
    private static final Pattern time9 = Pattern.compile("^\\d+-\\d+-\\d+\\s+\\d+:\\d+:\\d+$");
    //2017-06-30 09:20
    private static final Pattern time10 = Pattern.compile("^\\d+-\\d+-\\d+\\s+\\d+:\\d+$");
    //2017-06-30
    private static final Pattern time11 = Pattern.compile("^\\d+-\\d+-\\d+$");
    //2017年06月30日 09:20:56
    private static final Pattern time12 = Pattern.compile("^\\d+年\\d+月\\d+日\\s+\\d+:\\d+:\\d+$");
    //2017年06月30日 09:20
    private static final Pattern time13 = Pattern.compile("^\\d+年\\d+月\\d+日\\s+\\d+:\\d+$");
    //2017年06月30日
    private static final Pattern time14 = Pattern.compile("^\\d+年\\d+月\\d+日$");
    //2017/06/30 09:20:56
    private static final Pattern time15 = Pattern.compile("^\\d+/\\d+/\\d+\\s+\\d+:\\d+:\\d+$");
    //2017/06-30 09:20
    private static final Pattern time16 = Pattern.compile("^\\d+/\\d+/\\d+\\s+\\d+:\\d+$");
    //2017/06/30
    private static final Pattern time17 = Pattern.compile("^\\d+/\\d+/\\d+$");
    //20170630092056
    private static final Pattern time18 = Pattern.compile("\\d{14}");
    //201706300920
    private static final Pattern time19 = Pattern.compile("\\d{12}");
    //20170630
    private static final Pattern time20 = Pattern.compile("\\d{8}");


    public static final String format9 = "yyyy-MM-dd HH:mm:ss";
    public static final String format10 = "yyyy-MM-dd HH:mm";
    public static final String format11 = "yyyy-MM-dd";
    public static final String format12 = "yyyy年MM月dd日 HH:mm:ss";
    public static final String format13 = "yyyy年MM月dd日 HH:mm";
    public static final String format14 = "yyyy年MM月dd日";
    public static final String format15 = "yyyy/MM/dd HH:mm:ss";
    public static final String format16 = "yyyy/MM/dd HH:mm";
    public static final String format17 = "yyyy/MM/dd";
    public static final String format18 = "yyyyMMddHHmmss";
    public static final String format19 = "yyyyMMddHHmm";
    public static final String format20 = "yyyyMMdd";

    /**
     * 开始处理字符串日期数据
     *
     * @param time
     * @return
     */
    public static String find(String time) {
        String vday = findString(time, time9);
        if (vday != null && vday.length() > 0) return format9;

        vday = findString(time, time10);
        if (vday != null && vday.length() > 0) return format10;

        vday = findString(time, time11);
        if (vday != null && vday.length() > 0) return format11;

        vday = findString(time, time12);
        if (vday != null && vday.length() > 0) return format12;

        vday = findString(time, time13);
        if (vday != null && vday.length() > 0) return format13;

        vday = findString(time, time14);
        if (vday != null && vday.length() > 0) return format14;

        vday = findString(time, time15);
        if (vday != null && vday.length() > 0) return format15;

        vday = findString(time, time16);
        if (vday != null && vday.length() > 0) return format16;

        vday = findString(time, time17);
        if (vday != null && vday.length() > 0) return format17;

        vday = findString(time, time15);
        if (vday != null && vday.length() > 0) return format15;

        vday = findString(time, time18);

        if (vday != null && vday.length() > 0) return format18;
        vday = findString(time, time19);

        if (vday != null && vday.length() > 0) return format19;

        vday = findString(time, time20);
        if (vday != null && vday.length() > 0) return format20;

        return null;
    }

    /**
     * 正则匹配字符串日期格式
     *
     * @param time  2018-06-30 09:20:56
     * @param regex
     * @return
     */
    private static String findString(String time, Pattern regex) {
        Matcher matcher = regex.matcher(time);
        if (matcher.find()) return matcher.group();
        return null;
    }
}
