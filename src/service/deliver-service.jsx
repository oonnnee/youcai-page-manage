import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class DeliverService{

    list(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        url = '/manage/deliver/findPage';
        if(param.type === 'search'){
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
            url     : '/manage/deliver/findOneWithCategories',
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

    findOne(guestId, date){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/deliver/findOne',
            data    : {guestId: guestId, date: date}
        });
    }


    findDatesByGuestId(guestId){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/deliver/findDatesByGuestId',
            data    : {guestId: guestId}
        });
    }
}

export default DeliverService;