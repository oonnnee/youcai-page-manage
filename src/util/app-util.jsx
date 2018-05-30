
class AppUtil{

    /*-------------------------------
            ajax请求
    -------------------------------*/
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type        : param.type        || 'get',
                url         : param.url         || '',
                dataType    : param.dataType    || 'json',
                data        : param.data        || null,
                success     : resp => {
                    // 数据请求成功
                    if(0 === resp.code){
                        typeof resolve === 'function' && resolve(resp.data, resp.msg);
                    }
                    // 没有登录状态，强制登录
                    else if(15 === resp.code){
                        this.errorTip('未登录, 将跳转到登录页面');
                        this.doLogin();
                    }
                    else{
                        typeof reject === 'function' && reject(resp.msg || resp.data);
                    }
                },
                error       : err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }

    /*-------------------------------
            跳转登录
    -------------------------------*/
    doLogin(){
        window.location.href = '/login';
    }

    /*-------------------------------
            错误提示
    -------------------------------*/
    errorTip(msg){
        alert(msg || '好像哪里不对哦')
    }

    /*-------------------------------
            成功提示
    -------------------------------*/
    successTip(msg){
        alert(msg || '成功')
    }

    /*-------------------------------
            添加本地存储
    -------------------------------*/
    setStorage(name, data){
        let dataType = typeof data;
        // json对象
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data);
        }
        // 其他不支持的类型
        else{
            this.errorTip('该类型不能用于本地存储');
        }
    }

    /*-------------------------------
            取出本地存储
    -------------------------------*/
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }

    /*-------------------------------
            删除本地存储
    -------------------------------*/
    removeStorage(name){
        window.localStorage.removeItem(name);
    }


    /*-------------------------------
            跳转到主页
    -------------------------------*/
    redirectToIndex(){
        window.location.href = '/';
    }
}


export default AppUtil;