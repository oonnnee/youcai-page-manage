import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class DriverService{
    // 获取司机列表
    findList(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/manage/driver/list';
        }else if(param.type === 'search'){
            url = '/manage/driver/findByNameLike';
            data.name = param.driverName;
        }
        return appUtil.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }

    // 获取司机详情
    findById(id){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/driver/find',
            data    : {
                id : id
            }
        });
    }

    // 新增司机
    save(driver){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/driver/save',
            data    : driver
        });
    }

    // 更新司机
    update(driver){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/driver/update',
            data    : driver
        });
    }

    // 删除
    delete(id){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/driver/delete',
            data    : {id: id}
        });
    }
}

export default DriverService;