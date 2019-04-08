package com.yuyang.mybatis.controller;


import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.yuyang.mybatis.mapper.StudentMapper;
import com.yuyang.mybatis.model.Student;
import com.yuyang.mybatis.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author yuyang
 * @date 2019/3/21 11:08
 */
@Controller
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentMapper studentMapper;

    /**
     * 插入一条记录
     *
     * @return
     */
    @RequestMapping("/test1")
    @ResponseBody
    public Integer insert() {
        Student student = new Student();
        student.setUserName("小明");
        student.setUserNum("2151250");
        student.setUserSex("男");
        Integer integer = studentMapper.insert(student);
        return integer;
    }

    /**
     * 根据 ID 删除
     *
     * @return
     */
    @RequestMapping("/test2")
    @ResponseBody
    public Integer deleteById() {
        Integer integer = studentMapper.deleteById(334);
        return integer;
    }

    /**
     * 根据 columnMap 条件，删除记录
     *
     * @return
     */
    @RequestMapping("/test3")
    @ResponseBody
    public Integer deleteByMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("user_name", "小明");
        map.put("user_sex", "女");
        Integer integer = studentMapper.deleteByMap(map);
        return integer;
    }

    /**
     * 根据 entity 条件，删除记录
     *
     * @return
     */
    @RequestMapping("/test4")
    @ResponseBody
    public Integer delete() {
        EntityWrapper ew = new EntityWrapper<Student>();
        ew.in("user_province", "贵州省,四川省");
        ew.eq("user_name", "小明");
        Integer integer = studentMapper.delete(ew);
        return integer;
    }

    /**
     * 删除（根据ID 批量删除）
     * 执行sql： DELETE FROM info_user WHERE id IN ( ? , ? , ? )
     *
     * @return
     */
    @RequestMapping("/test5")
    @ResponseBody
    public Integer deleteBatchIds() {
        List<Integer> list = new ArrayList();
        list.add(342);
        list.add(343);
        list.add(344);
        Integer integer = studentMapper.deleteBatchIds(list);
        return integer;
    }


    /**
     * 根据 ID 修改
     *
     * @return Integer
     * 执行sql：UPDATE info_user SET user_name=?, user_num=?, user_sex=? WHERE id=?
     */
    @RequestMapping("/test6")
    @ResponseBody
    public Integer updateById() {
        Student student = new Student();
        student.setId(349);
        student.setUserName("张三");
        student.setUserNum("2151250");
        student.setUserSex("男");
        Integer integer = studentMapper.updateById(student);
        return integer;
    }

    /**
     * 根据 ID 查询
     *
     * @return Integer
     * 执行sql：SELECT id AS id,user_name AS userName,user_num AS userNum,user_sex AS userSex,user_province AS userProvince,user_phone AS userPhone FROM info_user WHERE id=?
     */
    @RequestMapping("/test7")
    @ResponseBody
    public Student selectById() {
        Integer integer = 349;
        Student student = studentMapper.selectById(integer);
        return student;
    }

    /**
     * 查询（根据 columnMap 条件）
     *
     * @return List<Student>
     * 执行sql：SELECT id AS id,user_name AS userName,user_num AS userNum,user_sex AS userSex,user_province AS userProvince,user_phone AS userPhone FROM info_user WHERE user_sex = ? AND user_name = ?
     */

    @RequestMapping("/test8")
    @ResponseBody
    public List<Student> selectByMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("user_name", "小红");
        map.put("user_sex", "女");
        return studentMapper.selectByMap(map);
    }

    /**
     * 根据 entity 条件，查询一条记录
     *
     * @return Student
     * 执行sql：SELECT id AS id,user_name AS userName,user_num AS userNum,user_sex AS userSex,user_province AS userProvince,user_phone AS userPhone FROM info_user WHERE user_name=?
     */
    @RequestMapping("/test9")
    @ResponseBody
    public Student selectOne() {
        Student student = new Student();
        student.setUserName("张三");
        return studentMapper.selectOne(student);
    }

    /**
     * 根据 Wrapper 条件，查询总记录数
     *
     * @return Integer
     * 执行sql：SELECT COUNT(1) FROM info_user WHERE (user_name = ?)
     */
    @RequestMapping("/test10")
    @ResponseBody
    public Integer selectCount() {
        EntityWrapper ew = new EntityWrapper<Student>();
        ew.eq("user_name", "于洋");
        return studentMapper.selectCount(ew);
    }

    /**
     * 根据 entity 条件，查询全部记录
     *
     * @return List<Student>
     * 执行sql：SELECT id AS id,user_name AS userName,user_num AS userNum,user_sex AS userSex,user_province AS userProvince,user_phone AS userPhone FROM info_user WHERE (user_name = ?)
     */
    @RequestMapping("/test11")
    @ResponseBody
    public List<Student> selectList() {
        EntityWrapper ew = new EntityWrapper<Student>();
        ew.eq("user_name", "于洋");
        return studentMapper.selectList(ew);
    }

    /**
     * 根据 Wrapper 条件，查询全部记录
     *
     * @return List<>
     */
    @RequestMapping("/test12")
    @ResponseBody
    public List<Map<String, Object>> selectMaps() {
        EntityWrapper ew = new EntityWrapper<Student>();
        ew.eq("user_name", "于洋");
        return studentMapper.selectMaps(ew);
    }

    /**
     * 根据 entity 条件，查询全部记录（并翻页）
     *
     * 控制台打印的SQL语句其实并没有真正的物理分页，
     * 而是通过缓存来获得全部数据中再进行的分页，这
     * 样对于大数据量操作时是不可取的，那么接下来就
     * 叙述一下，真正实现物理分页的方法。
     * @return List<Student>
     */
    @RequestMapping("/test13")
    @ResponseBody
    public List<Student> selectPage() {
        Page page = new Page<Student>(1, 5);
        return studentMapper.selectPage(page, new EntityWrapper<Student>().eq("user_name", "于洋"));
    }


    @RequestMapping("test14")
    @ResponseBody
    public Object findAllStuPage() {
        Page page = new Page(1, 5);
        Page<Student> pageStu = studentService.findAllStudentPage(page,"于洋");
        return pageStu;
    }


}
