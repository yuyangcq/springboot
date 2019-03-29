package com.yuyang.mybatis.mapper;

import com.yuyang.mybatis.model.Happiness;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * @author yuyang
 * @date 2019/3/21 09:08
 */
/**
 * 添加了@Mapper注解之后这个接口在编译时会生成相应的实现类
 * 需要注意的是：这个接口中不可以定义同名的方法，因为会生成相同的id
 * 也就是说这个接口是不支持重载的
 */
@Mapper
public interface HappinessMapper {
    @Select("SELECT * FROM city WHERE city = #{city}")
    Happiness findHappinessByCity(@Param("city") String city);

    /**
     * 对于多个参数来说，每个参数之前都要加上@Param注解，
     * 要不然会找不到对应的参数进而报错
     */
    @Insert("INSERT INTO province(province_id, province) VALUES(#{provinceId}, #{province})")
    int insertHappiness(@Param("provinceId") String provinceId, @Param("province") String province);
}
