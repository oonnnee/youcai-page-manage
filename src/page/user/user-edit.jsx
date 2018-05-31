import React from 'react';

import AppUtil from 'util/app-util.jsx';
import GuestService from 'service/guest-service.jsx';

import PageTitle from 'page/part/page-title.jsx';

const appUtil = new AppUtil();
const guestService = new GuestService();

class UserEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            addr: '',
            phone: '',
            note: ''
        }
    }

    componentDidMount(){
        this.loadProfile();
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="更新用户信息" />
                    <div className="row">
                        <div className="col-md-12 column">
                            <div className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label htmlFor="id" className="col-sm-2 control-label">id</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="id" type="text"
                                               value={this.state.id} onChange={e => this.onInputChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="col-sm-2 control-label">名称</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="name" type="text"
                                               value={this.state.name} onChange={e => this.onInputChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addr" className="col-sm-2 control-label">地址</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="addr" type="text"
                                               value={this.state.addr} onChange={e => this.onInputChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="col-sm-2 control-label">联系电话</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="phone" type="text"
                                               value={this.state.phone} onChange={e => this.onInputChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="note" className="col-sm-2 control-label">备注</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" id="note" rows="3"
                                                  value={this.state.note}
                                                  onChange={e => this.onInputChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button className="btn btn-primary btn-block btn-lg"
                                                onClick={() => this.onUpdate()}>更新</button>
                                    </div>
                                </div>
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

    onInputChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onUpdate(){
        console.log(this.state);
    }
}
export default UserEdit;