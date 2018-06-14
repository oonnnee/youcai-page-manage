import React from 'react';

import AppUtil from 'util/app-util.jsx'
import GuestService from 'service/guest-service.jsx'

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

const appUtil = new AppUtil();
const guestService = new GuestService();

class GuestEdit  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            addr: '',
            phone: '',
            leader1: '',
            mobile1: '',
            leader2: '',
            mobile2: '',
            note: '',
        }
    }

    componentDidMount(){
        this.loadGuest();
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="更新客户信息" />
                    <BreadCrumb path={[{href: '/guest', name: '客户管理'}]} current="更新客户信息"/>
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
                                    <label htmlFor="name" className="col-sm-2 control-label">名称</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="name" type="text"
                                               value={this.state.name}
                                                onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addr" className="col-sm-2 control-label">地址</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="addr" type="text"
                                               value={this.state.addr}
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="col-sm-2 control-label">手机号码</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="phone" type="text"
                                               value={this.state.phone}
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="leader1" className="col-sm-2 control-label">负责人1</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="leader1" type="text"
                                               value={this.state.leader1}
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile1" className="col-sm-2 control-label">负责人1手机号</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile1" type="text"
                                               value={this.state.mobile1}
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="leader2" className="col-sm-2 control-label">负责人2</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="leader2" type="text"
                                               value={this.state.leader2}
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile2" className="col-sm-2 control-label">负责人2手机号</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile2" type="text"
                                               value={this.state.mobile2}
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="note" className="col-sm-2 control-label">备注</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" id="note" rows="3"
                                                  value={this.state.note}
                                                  onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button className="btn btn-primary btn-block btn-lg"
                                                onClick={() => this.onUpdate()}>确认修改</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 加载客户详情
    loadGuest(){
        guestService.findById(this.state.id).then(data => {
            this.setState(data);
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    // 表单内容修改时
    onChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    // 点击修改按钮时
    onUpdate(){
        guestService.update(this.state).then(data => {
            appUtil.successTip('更新客户信息成功');
            window.location.reload(true);
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }
}
export default GuestEdit;