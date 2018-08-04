import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class OrderService{

    list(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/manage/order/findPage';
        }else if(param.type === 'search'){
            if (param.searchType === 'guestId'){
                url = '/manage/order/findPageByGuestIdLike';
            }else if (param.searchType === 'guestName'){
                url = '/manage/order/findPageByGuestNameLike';
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

    findStatesByGuestIdAndDate(guestId, date){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/order/findStatesByGuestIdAndDate',
            data    : {guestId: guestId, date: date}
        });
    }

    findCategories(guestId, date, state){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/order/findOneWithCategories',
            data    : {guestId: guestId, date: date, state: state}
        });
    }

    findOne(guestId, date, state){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/order/findOne',
            data    : {guestId: guestId, date: date, state: state}
        });
    }
    findOneWithZero(guestId, date){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/order/findOneWithZero',
            data    : {guestId: guestId, date: date}
        });
    }



    countByState(state){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/order/countByState',
            data    : {state: state}
        });
    }

    findPendingList(state){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/order/findPendingList',
            data    : {state: state}
        });
    }

    back(guestId, date, state){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/order/back',
            data    : {guestId: guestId, date: date, state: state}
        });
    }

    update(guestId, date, products){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/order/update',
            data    : {guestId: guestId, date: date, products: products}
        });
    }
}

export default OrderService;