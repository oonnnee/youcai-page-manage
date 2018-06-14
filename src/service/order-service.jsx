import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class OrderService{

    list(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/manage/order/list';
        }else if(param.type === 'search'){
            if (param.searchType === 'guestId'){
                url = '/manage/order/listByGuestIdLike';
            }else if (param.searchType === 'guestName'){
                url = '/manage/order/listByGuestNameLike';
            }
            data[param.searchType]  = param.keyword;
        }
        return appUtil.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }

    findDatesByGuestId(guestId){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/order/findDatesByGuestId',
            data    : {guestId: guestId}
        });
    }

    findCategoriesByGuestIdAndDate(guestId, date){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/order/findCategoriesByGuestIdAndDate',
            data    : {guestId: guestId, date: date}
        });
    }

    delete(guestId, date){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/order/delete',
            data    : {guestId: guestId, date: date}
        });
    }
}

export default OrderService;