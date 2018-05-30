import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class ProductService{

    // 获取产品列表
    findList(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/manage/product/list';
        }else if(param.type === 'search'){
            url = '/manage/product/findBy';
            if (typeof param.PCodes !== 'undefined'){
                data.PCodes = param.PCodes;
            }
            if (typeof param.name !== 'undefined'){
                data.name = param.name;
            }
        }
        return appUtil.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }

    // // 获取产品详情
    // findById(id){
    //     return appUtil.request({
    //         type    : 'get',
    //         url     : '/manage/guest/find',
    //         data    : {
    //             id : id
    //         }
    //     });
    // }
    //
    // // 新增产品
    // save(guest){
    //     return appUtil.request({
    //         type    : 'post',
    //         url     : '/manage/guest/save',
    //         data    : guest
    //     });
    // }
    //
    // // 更新产品
    // update(guest){
    //     return appUtil.request({
    //         type    : 'post',
    //         url     : '/manage/guest/update',
    //         data    : guest
    //     });
    // }

}

export default ProductService;