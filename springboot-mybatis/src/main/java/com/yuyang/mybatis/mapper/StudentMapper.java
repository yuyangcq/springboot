package com.yuyang.mybatis.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;
import com.yuyang.mybatis.model.Student;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author yuyang
 * @date 2019/3/27 16:52
 */
@Repository
public interface StudentMapper extends BaseMapper<Student> {

    List<Student> findAllStudentPage(@Param("page") Pagination page, @Param("userName") String userName);
}
