package com.yuyang.beatl.config.properties;


import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

/**
 * @author yuyang
 * @date 2019/3/27 14:05
 * @description: BeatlProperties.java 这个类用来映射yml文件的自定义配置属性，用到commons-lang3相关依赖。
 */
@Configuration
@ConfigurationProperties(prefix = BeatlProperties.BEETLCONF_PREFIX)
public class BeatlProperties {

    public static final String BEETLCONF_PREFIX = "beetl";

    private String delimiterStatementStart;

    private String delimiterStatementEnd;

    private String resourceTagroot;

    private String resourceTagsuffix;

    private String resourceAutoCheck;

    @Value("${spring.mvc.view.prefix}")
    private String prefix;

    public Properties getProperties() {
        Properties properties = new Properties();
        if (StringUtils.isNotBlank(delimiterStatementStart)) {
            if (delimiterStatementStart.startsWith("\\")) {
                delimiterStatementStart = delimiterStatementStart.substring(1);
            }
            properties.setProperty("DELIMITER_STATEMENT_START", delimiterStatementStart);
        }
        if (StringUtils.isNotBlank(delimiterStatementEnd)) {
            properties.setProperty("DELIMITER_STATEMENT_END", delimiterStatementEnd);
        } else {
            properties.setProperty("DELIMITER_STATEMENT_END", "null");
        }
        if (StringUtils.isNotBlank(resourceTagroot)) {
            properties.setProperty("RESOURCE.tagRoot", resourceTagroot);
        }
        if (StringUtils.isNotBlank(resourceTagsuffix)) {
            properties.setProperty("RESOURCE.tagSuffix", resourceTagsuffix);
        }
        if (StringUtils.isNotBlank(resourceAutoCheck)) {
            properties.setProperty("RESOURCE.autoCheck", resourceAutoCheck);
        }
        return properties;
    }

    public String getDelimiterStatementStart() {
        return delimiterStatementStart;
    }

    public void setDelimiterStatementStart(String delimiterStatementStart) {
        this.delimiterStatementStart = delimiterStatementStart;
    }

    public String getDelimiterStatementEnd() {
        return delimiterStatementEnd;
    }

    public void setDelimiterStatementEnd(String delimiterStatementEnd) {
        this.delimiterStatementEnd = delimiterStatementEnd;
    }

    public String getResourceTagroot() {
        return resourceTagroot;
    }

    public void setResourceTagroot(String resourceTagroot) {
        this.resourceTagroot = resourceTagroot;
    }

    public String getResourceTagsuffix() {
        return resourceTagsuffix;
    }

    public void setResourceTagsuffix(String resourceTagsuffix) {
        this.resourceTagsuffix = resourceTagsuffix;
    }

    public String getResourceAutoCheck() {
        return resourceAutoCheck;
    }

    public void setResourceAutoCheck(String resourceAutoCheck) {
        this.resourceAutoCheck = resourceAutoCheck;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }
}
