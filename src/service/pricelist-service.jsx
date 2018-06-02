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
}

export default PricelistService;