import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class ProductService{

    // 获取产品列表
    list(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/manage/product/findPage';
        }else if(param.type === 'search'){
            url = '/manage/product/findPageByNameLikeAndCodeIn';
            if (typeof param.PCodes !== 'undefined'){
                data.codes = param.PCodes;
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

    // 获取产品详情
    findById(id){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/product/findOne',
            data    : {
                id : id
            }
        });
    }

    // 新增产品
    save(product){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/product/save',
            data    : product
        });
    }

    // 更新产品
    update(product){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/product/update',
            data    : product
        });
    }

    delete(productId){
        return appUtil.request({
            type    : 'post',
            url     : '/manage/product/delete',
            data    : {id: productId}
        });
    }

    count(){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/product/countAll',
        });
    }

    findList(){
        return appUtil.request({
            type    : 'get',
            url     : '/manage/product/findList',
        });
    }
}

export default ProductService;