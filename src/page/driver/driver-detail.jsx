import React from 'react';
import {Link} from 'react-router-dom';

import AppUtil from 'util/app-util.jsx'
import DriverService from 'service/driver-service.jsx'

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

const appUtil = new AppUtil();
const driverService = new DriverService();

class DriverDetail  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            cardid: '',
            mobile: '',
            note: '',
        }
    }

    componentDidMount(){
        this.loadDriver();
    }

    // 加载司机详情
    loadDriver(){
        driverService.findById(this.state.id).then(data => {
            this.setState(data);
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }
    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="司机详情" >
                        <div className="page-header-right">
                            <Link to={"/driver/edit/"+this.state.id} className="btn btn-primary">
                                <i className="fa fa-edit"></i>&nbsp;
                                <span>编辑</span>
                            </Link>
                            <a href="javascript:;" className="btn btn-danger" onClick={() => this.onDelete()}>
                                <i className="fa fa-trash-o"></i>&nbsp;
                                <span>删除</span>
                            </a>
                        </div>
                    </PageTitle>
                    <BreadCrumb path={[{href: '/driver', name: '司机管理'}]} current="司机详情"/>
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
                                    <label htmlFor="name" className="col-sm-2 control-label">姓名</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="name" type="text"
                                               value={this.state.name} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cardid" className="col-sm-2 control-label">身份证</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="cardid" type="text"
                                               value={this.state.cardid} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile" className="col-sm-2 control-label">手机号码</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile" type="text"
                                               value={this.state.mobile} readOnly />
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

    onDelete(){
        if (confirm('确认删除吗？')){
            driverService.delete(this.state.id).then(() => {
                appUtil.successTip('删除成功');
                window.location.href = '/driver';
            }, err => {
                appUtil.errorTip(err);
            })
        }

    }
}
export default DriverDetail;