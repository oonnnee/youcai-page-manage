import React from 'react'

import LoginService from 'service/login-service.jsx'
import AppUtil from 'util/app-util.jsx'


const loginService = new LoginService();
const appUtil = new AppUtil();

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: '',
            pwd: ''
        }
    }

    onLoginKeyUp(e){
        if (e.keyCode == 13){
            this.handleLogin();
        }
    }

    render(){
        return (
            <div className="col-md-offset-4 col-md-4 login-panel">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={require('img/brand.png')} className="img-responsive center-block" />
                            </div>
                            <div className="col-md-9 login-title text-center">
                                欢迎登录 - 优菜网管理系统
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <input type="text" name="id" className="form-control" placeholder="请输入用户名"
                                   value={this.state.id}
                                   onChange={e => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="pwd" className="form-control" placeholder="请输入密码"
                                   value={this.state.pwd}
                                   onChange={e => this.handleInputChange(e)} onKeyUp={e => this.onLoginKeyUp(e)} />
                        </div>
                        <button className="btn btn-lg btn-primary btn-block"
                                onClick={() => this.handleLogin()}>登录</button>
                    </div>
                </div>
            </div>
            
        );
    }

    /*-------------------------------
            用户名及密码输入框内容改变
    -------------------------------*/
    handleInputChange(e){
        const target = e.target;
        switch (target.name){
            case 'id':{
                this.state.id = target.value;
            }break;
            case 'pwd':{
                this.state.pwd = target.value;
            }break;
        }
    }

    /*-------------------------------
            登录
    -------------------------------*/
    handleLogin(){
        const loginInfo = {
            id: this.state.id,
            pwd: this.state.pwd
        }
        /*----- 1.校验 -----*/
        const checkResult = loginService.checkLoginInfo(loginInfo);
        if (checkResult.status === false) {
            appUtil.errorTip(checkResult.msg);
            return;
        }
        /*----- 2.登录 -----*/
        loginService.login(loginInfo).then((data) => {
            /*----- 成功 -----*/
            /*----- 1.添加用户信息到本地存储 -----*/
            appUtil.setStorage('user', data);
            /*----- 2.跳转到主页 -----*/
            appUtil.redirectToIndex();
        }, (msg) => {
            /*----- 失败 -----*/
            appUtil.errorTip(msg);
        })
    }
}

export default Login;