import React from 'react';

import AppUtil from 'util/app-util.jsx'
import GuestService from 'service/guest-service.jsx'

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

const appUtil = new AppUtil();
const guestService = new GuestService();

class GuestDetail  extends React.Component{
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

    // 加载商品详情
    loadGuest(){
        guestService.findById(this.state.id).then(data => {
            this.setState(data);
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    delete(){
        if (confirm('确认删除此客户吗？')){
            guestService.delete(this.state.id).then(data => {
                appUtil.successTip(data);
                window.location.href = "/guest";
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="客户详情" >
                        <button className="btn btn-danger" onClick={() => this.delete()}>
                            <i className="fa fa-trash"></i>
                            <span>删除</span>
                        </button>
                    </PageTitle>
                    <BreadCrumb path={[{href: '/guest', name: '客户管理'}]} current="客户详情"/>
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
                                    <label htmlFor="phone" className="col-sm-2 control-label">手机号码</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="phone" type="text"
                                               value={this.state.phone} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="leader1" className="col-sm-2 control-label">负责人1</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="leader1" type="text"
                                               value={this.state.leader1} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile1" className="col-sm-2 control-label">负责人1手机号</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile1" type="text"
                                               value={this.state.mobile1} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="leader2" className="col-sm-2 control-label">负责人2</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="leader2" type="text"
                                               value={this.state.leader2} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile2" className="col-sm-2 control-label">负责人2手机号</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile2" type="text"
                                               value={this.state.mobile2} readOnly />
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
            </div>
        )
    }
}
export default GuestDetail;