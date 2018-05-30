import React from 'react';

import AppUtil from 'util/app-util.jsx'
import GuestService from 'service/guest-service.jsx'

import PageTitle from 'page/part/page-title.jsx';

const appUtil = new AppUtil();
const guestService = new GuestService();

class GuestSave  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pwd: '',
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

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="新增客户" />
                    <div className="row">
                        <div className="col-md-12 column">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="pwd" className="col-sm-2 control-label">密码</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="pwd" type="text"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="col-sm-2 control-label">名称</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="name" type="text"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addr" className="col-sm-2 control-label">地址</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="addr" type="text"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="col-sm-2 control-label">手机号码</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="phone" type="text"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="leader1" className="col-sm-2 control-label">负责人1</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="leader1" type="text"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile1" className="col-sm-2 control-label">负责人1手机号</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile1" type="text"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="leader2" className="col-sm-2 control-label">负责人2</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="leader2" type="text"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile2" className="col-sm-2 control-label">负责人2手机号</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile2" type="text"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="note" className="col-sm-2 control-label">备注</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" id="note" rows="3"
                                                  onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button className="btn btn-primary btn-block btn-lg"
                                                onClick={() => this.onSave()}>新增</button>
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

    // 点击新增按钮时
    onSave(){
        guestService.save(this.state).then(() => {
            appUtil.successTip('新增客户成功');
            window.location.reload(true);
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }
}
export default GuestSave;