
import AppUtil from 'util/app-util.jsx'


const appUtil = new AppUtil();


class LoginService {

    // 用户登录
    login(loginInfo){
        return appUtil.request({
            type: 'post',
            url: '/manage/login',
            data: loginInfo
        });
    }

    // 检查登录接口的数据是不是合法
    checkLoginInfo(loginInfo){
        let id = $.trim(loginInfo.id),
            pwd = $.trim(loginInfo.pwd);
        // 判断用户名为空
        if(typeof id !== 'string' || id.length ===0){
            return {
                status: false,
                msg: '用户名不能为空！'
            }
        }
        // 判断密码为空
        if(typeof pwd !== 'string' || pwd.length ===0){
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        return {
            status : true,
            msg : '验证通过'
        }
    }

    // 退出登录
    logout(){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/logout'
        });
    }
}


export default LoginService;