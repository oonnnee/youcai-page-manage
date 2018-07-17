import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class PricelistService{

    list(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/manage/pricelist/findPage';
        }else if(param.type === 'search'){
            if (param.searchType === 'guestId'){
                url = '/manage/pricelist/findPageByGuestIdLike';
            }else if (param.searchType === 'guestName'){
                url = '/manage/pricelist/findPageByGuestNameLike';
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
            url     : '/manage/pricelist/findOneWithCategories',
            data    : {guestId: guestId, date: date}
        });
    }

    findOne(guestId, date){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/pricelist/findOne',
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