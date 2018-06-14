import React from 'react';

import AppUtil from 'util/app-util.jsx'
import GuestService from 'service/guest-service.jsx'

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

const appUtil = new AppUtil();
const guestService = new GuestService();

class GuestPwdUpdate  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            pwd: '',
            rePwd: '',
        }
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="更新客户密码" />
                    <BreadCrumb path={[{href: '/guest', name: '客户管理'}]} current="更新客户密码"/>
                    <div className="row">
                        <div className="col-md-12 column">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="id" className="col-sm-2 control-label">id</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="id" type="text"
                                               value={this.state.id} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd" className="col-sm-2 control-label">密码</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="pwd" type="password"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rePwd" className="col-sm-2 control-label">再次输入密码</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="rePwd" type="password"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button className="btn btn-primary btn-block btn-lg"
                                                onClick={() => this.onUpdatePwd()}>确认修改</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 表单内容修改时
    onChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    // 点击修改按钮时
    onUpdatePwd(){
        const checkResult = guestService.checkPwd(this.state.pwd, this.state.rePwd);
        if (checkResult.status === false){
            appUtil.errorTip(checkResult.msg);
            return;
        }
        const param = {
            id: this.state.id,
            pwd: this.state.pwd
        }
        guestService.updatePwd(param).then(data => {
            appUtil.successTip('更新客户密码成功');
            window.location.href = '/guest';
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }
}
export default GuestPwdUpdate;