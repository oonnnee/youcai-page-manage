import React from 'react';

import AppUtil from 'util/app-util.jsx'
import DriverService from 'service/driver-service.jsx'

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

const appUtil = new AppUtil();
const driverService = new DriverService();

class DriverSave  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            cardid: '',
            mobile: '',
            note: '',
        }
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="新增司机" />
                    <BreadCrumb path={[{href: '/driver', name: '司机管理'}]} current="新增司机"/>
                    <div className="row">
                        <div className="col-md-12 column">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="name" className="col-sm-2 control-label">姓名</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="name" type="text"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cardid" className="col-sm-2 control-label">身份证</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="cardid" type="text"
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile" className="col-sm-2 control-label">手机号码</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile" type="text"
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
        driverService.save(this.state).then(() => {
            appUtil.successTip('新增司机成功');
            window.location.reload(true);
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }
}
export default DriverSave;