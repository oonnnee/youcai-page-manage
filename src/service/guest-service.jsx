import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class GuestService{
    // 获取客户列表
    findList(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/manage/guest/findPage';
        }else if(param.type === 'search'){
            if (param.searchType === 'id'){
                url = '/manage/guest/findPageByIdLike';
            }else if (param.searchType === 'name'){
                url = '/manage/guest/findPageByNameLike';
            }
            data[param.searchType]  = param.keyword;
        }
        return appUtil.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }

    // 获取客户详情
    findById(id){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/guest/findOne',
            data    : {
                id : id
            }
        });
    }

    // 新增客户
    save(guest){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/guest/save',
            data    : guest
        });
    }

    // 更新客户
    update(guest){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/guest/update',
            data    : guest
        });
    }

    // 更新密码时，检查用户输入的密码
    checkPwd(pwd, reRwd){
        if (pwd.trim() === ''){
            return {
                status: false,
                msg: '密码不能为空'
            }
        }
        if (pwd !== reRwd){
            return {
                status: false,
                msg: '两次密码输入不一致'
            }
        }
        return {
            status: true
        }
    }

    // 更新客户密码
    updatePwd(param){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/guest/updatePwd',
            data    : param
        });
    }

    count(){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/guest/countAll',
        });
    }
}

export default GuestService;