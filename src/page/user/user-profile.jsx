import React from 'react';
import {Link} from 'react-router-dom';

import AppUtil from 'util/app-util.jsx';

import PageTitle from 'page/part/page-title.jsx';
import GuestService from 'service/guest-service.jsx';

const appUtil = new AppUtil();
const guestService = new GuestService();

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            addr: '',
            phone: '',
            note: '',

            oldPwd: '',
            newPwd: '',
            reNewPwd: ''
        }
    }

    componentDidMount(){
        this.loadProfile();
    }

    onTextChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    updatePwd(){
        guestService.updateUserPwd({
            oldPwd: this.state.oldPwd,
            newPwd: this.state.newPwd,
            reNewPwd: this.state.reNewPwd
        }).then(() => {
            guestService.logout().then(() => {
                appUtil.removeStorage('user');
                appUtil.successTip('更新密码成功，请重新登录');
                window.location.href = "/login";
            }, err => {
                appUtil.errorTip(err);
            })
        }, err => {
            appUtil.errorTip(err);
        })
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="用户信息" >
                        <Link to="/user/edit" className="btn btn-primary" style={{marginRight: '20px'}}>
                            <i className="fa fa-edit"></i>
                            <span>编辑</span>
                        </Link>
                        <a href="javascript:;" data-toggle="modal" data-target="#exampleModal" className="btn btn-primary">
                            <i className="fa fa-key"></i>
                            <span>修改密码</span>
                        </a>
                    </PageTitle>
                    <div className="row">
                        <div className="col-md-12 column">
                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label htmlFor="id" className="col-sm-2 control-label">id</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="id" type="text"
                                               value={this.state.id} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="col-sm-2 control-label">名称</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="name" type="text"
                                               value={this.state.name} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addr" className="col-sm-2 control-label">地址</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="addr" type="text"
                                               value={this.state.addr} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="col-sm-2 control-label">联系电话</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="phone" type="text"
                                               value={this.state.phone} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="note" className="col-sm-2 control-label">备注</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" id="note" rows="3" value={this.state.note} readOnly />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*----- update password modal -----*/}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="exampleModalLabel">修改密码</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="oldPwd" placeholder="原密码"
                                               onChange={e => this.onTextChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="newPwd" placeholder="新密码"
                                               onChange={e => this.onTextChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="reNewPwd" placeholder="再次输入新密码"
                                               onChange={e => this.onTextChange(e)}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.updatePwd()}>修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 加载用户信息
    loadProfile(){
        const profile = appUtil.getStorage('user');
        this.setState(profile);
    }

}
export default UserProfile;