$(function () {
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    // 提取 layui 中的form方法
    let form = layui.form()
    let layer = layui.layer()
    // 调用 form.verify函数
    form.verify({
        // 自定义了一个 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    $('#form_reg').on('submit', function(e) {
        // 阻止默认事件
        e.preventDefault()
        let data = {username: $('#form_reg name=[username]').val(), password: $('#form_reg name=[password]').val()}
        // 发起ajax 的POST 请求
        $post('/api/reguser', 
        data,
        function(res) {
            if(res.status !==0) {
                return layer.msg(res.message)
            }
            layer('注册成功,请登录!')
            // 跳转到登录页面
        $('#link_login').click()
        })
    })

    // 登录功能的实现
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            // 利用jq 的serialize()方法 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !==0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                // 本地保存 token 字符串
                localStorage.setItem('token', res.token)
                // 跳转到主页
                location.href = '/index.html'
            }

        })
    })
})