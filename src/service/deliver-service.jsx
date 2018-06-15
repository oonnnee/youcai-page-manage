import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class DeliverService{

    list(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/manage/deliver/list';
        }else if(param.type === 'search'){
            if (param.searchType === 'driverName'){
                url = '/manage/deliver/listByDriverNameLike';
            }else if (param.searchType === 'guestName'){
                url = '/manage/deliver/listByGuestNameLike';
            }
            data[param.searchType]  = param.keyword;
        }
        return appUtil.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }

    save(param){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/deliver/save',
            data    : param
        });
    }

    findCategories(guestId, driverId, date){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/deliver/findCategories',
            data    : {guestId: guestId, driverId: driverId, date: date}
        });
    }

    delete(guestId, driverId, date){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/deliver/delete',
            data    : {guestId: guestId, driverId: driverId, date: date}
        });
    }
}

export default DeliverService;