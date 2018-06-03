import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class PricelistService{

    list(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/manage/pricelist/pdateList';
        }else if(param.type === 'search'){
            if (param.searchType === 'guestId'){
                url = '/manage/pricelist/findPdateListByGuestIdLike';
            }else if (param.searchType === 'guestName'){
                url = '/manage/pricelist/findPdateListByGuestNameLike';
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

    findPdatesByGuestId(guestId){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/pricelist/findPdatesByGuestId',
            data    : {guestId: guestId}
        });
    }

    findByGuestIdAndPdate(guestId, pdate){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/pricelist/findFullByGuestIdAndPdateWithCategory',
            data    : {guestId: guestId, pdate: pdate}
        });
    }

    delete(guestId, pdate){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/pricelist/delete',
            data    : {guestId: guestId, pdate: pdate}
        });
    }
}

export default PricelistService;