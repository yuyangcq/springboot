/**
 * 初始化表格
 */
var Ganggutong = {
    id: "GanggutongTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    resultObj: {},
    showObj: {},
    bussDateValue: "",
};
/**
 * 初始化表格的列
 */
Ganggutong.initColumn = function () {
    return [
        {title: '港股通文件名称', field: 'file_name', align: 'center', valign: 'middle', sortable: true, width: 100},
        {
            title: '数据读取结果',
            field: 'read_result',
            align: 'center',
            valign: 'middle',
            sortable: true,
            width: 100,
            formatter: function (value) {
                if (value === undefined) return;
                if (value === 1) return '<img src=' + Feng.ctxPath + '/static/img/success.png>';
                if (value === 0) return '<img src=' + Feng.ctxPath + '/static/img/error.png>';
                // if (value === 2) return '<img src=' + Feng.ctxPath + '/static/img/alert.png>';
            }
        },
        {
            title: '账户数',
            field: 'account_number',
            align: 'center',
            valign: 'middle',
            sortable: true,
            width: 100,
            formatter: function (value) {
                if (value === 0) return '--';
                return value;
            }
        },
        {
            title: '详情',
            field: 'read_result',
            align: 'center',
            valign: 'middle',
            sortable: true,
            width: 150,
            formatter: function (value, row) {
                var fileName = "'" + (row['file_name'] || '') + "'";
                if (value === 0) {
                    return '<a href="javascript:void(0)" onclick="Ganggutong.openLayer(' + fileName + ')">查看</a>';
                }
            }
        }
    ];
};

Ganggutong.forDetail = function (value, row) {
    var fileName = "'" + (row['file_name'] || '') + "'";
    return '<a href="javascript:void(0)" onclick="Ganggutong.openLayer(' + fileName + ')">查看</a>';
};

//打开详情弹出框
Ganggutong.openLayer = function (fileName) {
    layer.open({
        type: 2,
        title: '文件错误信息详情',
        area: ['90%', '95%'],
        content: Feng.ctxPath + '/ganggutong/to_detail?fileName=' + fileName
    });
};

/**
 * 查询
 */
Ganggutong.search = function () {
    debugger
    var date = $('#bussdate').val();
    var queryData = {};
    queryData['date'] = date;
    Ganggutong.table.refresh({query: queryData});
    var param = Ganggutong.ftpFileIsExists();
    if (param.message == "文件存在") {
        $('#resultShow').html("报送人：" + param.data);
        $('#result').html("报送结果：成功");
    }
    else {
        $('#resultShow').html("报送人：");
        $('#result').html("报送结果：");
    }
}

/**
 * 数据清空
 */
Ganggutong.clearData = function () {
    var date = $('#bussdate').val();
    var flag = Ganggutong.isExists();
    var queryData = {};
    var ajax = new $ax(Feng.ctxPath + "/ganggutong/clearData", function (data) {
        // $.each(data, function (index, item) {
        // });
        layer.msg("数据已清空");
        queryData['date'] =  date;
        Ganggutong.table.refresh({query: queryData});
        $('#result').html("报送结果：");
        $('#resultShow').html("报送人：");
    }, function (data) {
        Feng.error("清空失败!" + data.responseJSON.message + "!");
    });
    ajax.set("date", date);
    ajax.start();
}

/**
 * 发送文件
 */
Ganggutong.transport = function () {
    // var dateString = $('#bussdate').val();
    // var pattern = /(\d{4})(\d{2})(\d{2})/;
    // var formatedDate = dateString.replace(pattern, '$1年$2月$3日');
    // //判断是否读取错误
    // var num = Ganggutong.isExists();
    // if (JSON.stringify(num).indexOf("不存在") != -1) {
    //     layer.msg(formatedDate+"文件不存在！");
    //     return;
    // }
    // else {
    //     var ajax = new $ax(Feng.ctxPath + "/ganggutong/transport", function (data) {
    //         layer.msg("数据已清空");
    //         if (JSON.stringify(flag).indexOf("不存在") != -1) {
    //         }
    //     }, function (data) {
    //         Feng.error("清空失败!" + data.responseJSON.message + "!");
    //     });
    //     ajax.start();
    // }
    var date = '' + $('#bussdate').val();
    new $ax(Feng.ctxPath + '/ganggutong/transport?date=' + date, function (param) {
        debugger
        if (param.message == "文件不存在") {
            layer.msg('文件不存在');
        }
        if (param.message == "发送成功") {
            $('#result').html("报送结果：成功");
            $('#resultShow').html("报送人：" + param.data);
            layer.msg('发送成功');
        }
        if (param.message == "发送失败" || param.message == "文件夹不存在") {
            $('#result').html("报送结果：失败");
            $('#resultShow').html("报送人：" + param.data);
            layer.msg('发送失败');
        }
    }, function (param) {
    }).start();
}

/**
 * 文件导入
 */
Ganggutong.importFile = function () {
    var files = document.getElementById("annexUrl").files;
    var date = '' + $('#bussdate').val();
    debugger
    for (var i = 0; i < files.length; i++) {
        if (!files[i].name.endsWith("txt")) {
            layer.msg("文件" + files[i].name + "格式不对，请重新上传！");
            $('#annexUrl').val('');
            return;
        }
        if (files[i].size == 0) {
            layer.msg("文件" + files[i].name + "内容为空，请重新上传！");
            $('#annexUrl').val('');
            return;
        }
    }
    if (date == '') {
        alert("请输入日期");
        return;
    }
    if (files.length != 0) {
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append(file.name, file);
        }
        formData.append("date", date);
        debugger
        $.ajax({
            url: Feng.ctxPath + "/ganggutong/importFile",
            type: 'POST',
            cache: false,
            data: formData,
            //这个参数是jquery特有的，不进行序列化，因为我们不是json格式的字符串，而是要传文件
            processData: false,
            //注意这里一定要设置contentType:false，不然会默认为传的是字符串，这样文件就传不过去了
            contentType: false,
            success: function (data) {//请求的返回成功的方法
                if (JSON.stringify(data).indexOf("成功") != -1) {
                    layer.msg('文件上传成功');
                    Ganggutong.table.refresh({});
                }
                else {
                    layer.msg("文件上传失败，原因：" + data.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.msg("文件上传失败");
            }
        });
    }
    //重置了input的value值，因此再次上传同一文件的时候，又会触发onchange事件
    $('#annexUrl').val('');
}


/**
 * 文件合并
 */
Ganggutong.mergeFile = function () {
    var date = $('#bussdate').val();
    if (date == '') {
        alert("请输入日期");
        return;
    }
    //判断是否读取错误
    var num = Ganggutong.judgeIsError();
    if (num == 0) {
        new $ax(Feng.ctxPath + '/ganggutong/mergeFile?date=' + date, function (param) {
            debugger
            if (JSON.stringify(param).indexOf("成功") != -1) {
                layer.msg('文件合并成功');
            }
            if (JSON.stringify(param).indexOf("文件不存在") != -1) {
                layer.msg('文件不存在，请导入后再合并');
            }
        }, function (param) {
        }).start();
    }
}

/**
 * 判断是否读取错误
 */
Ganggutong.judgeIsError = function () {
    var date = $('#bussdate').val();
    var num = 0;
    debugger
    new $ax(Feng.ctxPath + '/ganggutong/judgeIsError?date=' + date, function (data) {
        debugger
        if (data > 0) {
            layer.msg("数据解析错误，请务必先清空数据，再重新上传！");
        }
        num = data;
    }, function (data) {
    }).start();
    return num;
}

/**
 * 下载文件
 */
Ganggutong.download = function () {
    var date = $('#bussdate').val();
    debugger
    //判断是否读取错误
    var num = Ganggutong.isExists();
    if (JSON.stringify(num).indexOf("不存在") != -1) {
        layer.msg("文件不存在！");
    }
    else window.open(Feng.ctxPath + '/ganggutong/download?date=' + date);
}

/**
 * 判断本地文件是否存在
 */
Ganggutong.isExists = function () {
    var date = $('#bussdate').val();
    var flag = "";
    new $ax(Feng.ctxPath + '/ganggutong/isExists?date=' + date, function (data) {
        flag = data;
    }, function (data) {
    }).start();
    return flag;
}

/**
 * 判断ftp文件是否存在
 */
Ganggutong.ftpFileIsExists = function () {
    var date = $('#bussdate').val();
    var flag = "";
    new $ax(Feng.ctxPath + '/ganggutong/ftpFileIsExists?date=' + date, function (data) {
        flag = data;
    }, function (data) {
    }).start();
    return flag;
}


Ganggutong.initDateInput = function () {
    layui.use('laydate', function () {
        layui.laydate.render({
            elem: '#bussdate',
            format: 'yyyy-MM-dd',
            max: 0,
            value: new Date(),
            theme: 'molv',
            done: function (value) {
                Ganggutong.search();
            }
        });
    })
}

Ganggutong.initFileButton = function () {
    var formData = new FormData();
    layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '.test', //绑定元素
            multiple: true,
            exts: 'txt',
            done: function (res) {
                var item = this.item;
                console.log(item); //获取当前触发上传的元素，layui 2.1.0 新增
            },
            error: function () {
                //请求异常回调
            },
        });
    });
}


/**
 * 初始化
 */
$(function () {
    debugger
    Ganggutong.initDateInput();
    var date = $('#bussdate').val();
    var defaultColumns = Ganggutong.initColumn();
    var table = new BSTable(Ganggutong.id, "/ganggutong/search", defaultColumns);
    table.setPaginationType("client");
    table.setQueryParams({date: date});
    Ganggutong.table = table.init();
    var param = Ganggutong.ftpFileIsExists();
    if (param.message == "文件存在") {
        $('#resultShow').html("报送人：" + param.data);
        $('#result').html("报送结果：成功");
    }
    else {
        $('#resultShow').html("报送人：");
        $('#result').html("报送结果：");
    }
    // $('th').css({'background-color': '#393D49'});
});