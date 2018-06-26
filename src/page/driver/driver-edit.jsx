import React from 'react';

import AppUtil from 'util/app-util.jsx'
import DriverService from 'service/driver-service.jsx'

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

const appUtil = new AppUtil();
const driverService = new DriverService();

class DriverEdit  extends React.Component{
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

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="更新司机信息" />
                    <BreadCrumb path={[{href: '/driver', name: '司机管理'}]} current="更新司机信息"/>
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
                                    <label htmlFor="name" className="col-sm-2 control-label">姓名</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="name" type="text"
                                               value={this.state.name}
                                                onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cardid" className="col-sm-2 control-label">身份证</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="cardid" type="text"
                                               value={this.state.cardid}
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile" className="col-sm-2 control-label">手机号码</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile" type="text"
                                               value={this.state.mobile}
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

    // 加载司机详情
    loadDriver(){
        driverService.findById(this.state.id).then(data => {
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
        driverService.update(this.state).then(data => {
            appUtil.successTip('更新司机信息成功');
            window.location.href = "/driver";
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }
}
export default DriverEdit;