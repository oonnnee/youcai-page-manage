import React from 'react'

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: '',
            pwd: ''
        }
    }

    render(){
        return (
            <div className="col-md-offset-4 col-md-4 login-panel">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={require('img/brand.png')} className="img-responsive" />
                            </div>
                            <div className="col-md-9 login-title">
                                欢迎登录 - 优菜网管理系统
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <input type="text" name="id" className="form-control" placeholder="请输入用户名"
                                   onChange={e => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="pwd" className="form-control" placeholder="请输入密码"
                                   onChange={e => this.handleInputChange(e)} />
                        </div>
                        <button className="btn btn-lg btn-primary btn-block"
                                onClick={() => this.handleLogin()}>登录</button>
                    </div>
                </div>
            </div>
            
        );
    }

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

    handleLogin(){
        const id = this.state.id;
        const pwd = this.state.pwd;
        /*----- 1.校验 -----*/
        if (id.trim() === ''){
            alert("用户名不能为空");
        }else if (pwd.trim() === ''){
            alert('密码不能为空');
        }
    }
}

export default Login;