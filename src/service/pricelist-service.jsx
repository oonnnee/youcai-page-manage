import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class PricelistService{

    list(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/manage/pricelist/list';
        }else if(param.type === 'search'){
            if (param.searchType === 'guestId'){
                url = '/manage/pricelist/listByGuestIdLike';
            }else if (param.searchType === 'guestName'){
                url = '/manage/pricelist/listByGuestNameLike';
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
            url     : '/manage/pricelist/save',
            data    : param
        });
    }

    update(param){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/pricelist/update',
            data    : param
        });
    }

    findDatesByGuestId(guestId){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/pricelist/findDatesByGuestId',
            data    : {guestId: guestId}
        });
    }

    findCategories(guestId, date){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/pricelist/findCategories',
            data    : {guestId: guestId, date: date}
        });
    }

    delete(guestId, date){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/pricelist/delete',
            data    : {guestId: guestId, date: date}
        });
    }
}

export default PricelistService;