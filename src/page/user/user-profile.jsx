import React from 'react';
import {Link} from 'react-router-dom';

import AppUtil from 'util/app-util.jsx';

import PageTitle from 'page/part/page-title.jsx';

const appUtil = new AppUtil();

class UserProfile extends React.Component{
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
                    <PageTitle title="用户信息" >
                        <Link to="/user/edit" className="btn btn-primary" style={{marginRight: '20px'}}>
                            <i className="fa fa-edit"></i>
                            <span>编辑</span>
                        </Link>
                        <Link to="/user/updatePwd" className="btn btn-primary">
                            <i className="fa fa-key"></i>
                            <span>修改密码</span>
                        </Link>
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