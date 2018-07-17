import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import PricelistService from 'service/pricelist-service.jsx';
import GuestService from 'service/guest-service.jsx';
import CategoryService from 'service/category-service.jsx';


const guestService = new GuestService();
const categoryService = new CategoryService();
const pricelistService = new PricelistService();
const appUtil = new AppUtil();

class PricelistDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            date: this.props.match.params.date,
            guestName: '',
            dates: [],
            products: [],
        }
    }

    componentDidMount(){
        this.loadDates();
        this.findOne();
    }

    loadDates(){
        pricelistService.findDatesByGuestId(this.state.guestId).then(dates => {
            this.setState({
                dates: dates
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    findOne(){
        pricelistService.findOne(this.state.guestId, this.state.date)
            .then(data => {
                this.setState(data)
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    onDateChange(e){
        // this.setState({
        //     date: e.target.value
        // }, () => {
        //     this.findOne();
        // });
        window.location.href = `/pricelist/detail/${this.state.guestId}/${e.target.value}`;
    }

    onDelete(){
        if (confirm('确认删除此报价吗？')) {
            pricelistService.delete(this.state.guestId, this.state.date)
                .then(() => {
                    appUtil.successTip('删除成功');
                    window.location.href = '/pricelist';
                }, errMsg => {
                    appUtil.errorTip(errMsg);
                })
        }
    }

    render(){
        const tableHeads = [
            {name: '产品id', width: '15%'},
            {name: '产品名称', width: '30%'},
            {name: '单价', width: '15%'},
            {name: '备注', width: '40%'}
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="报价详情" >
                        <div className="page-header-right">
                            <a href={"http://localhost:8080/manage/pricelist/export?guestId="+this.state.guestId+"&"+"date="+this.state.date} target="_blank" className="btn btn-primary">
                                <i className="fa fa-cloud-download"></i>&nbsp;
                                <span>导出excel</span>
                            </a>
                            <Link to={"/pricelist/edit/"+this.state.guestId+"/"+this.state.date} className="btn btn-primary">
                                <i className="fa fa-edit"></i>&nbsp;
                                <span>编辑</span>
                            </Link>
                            <a href="javascript:;" className="btn btn-danger" onClick={() => this.onDelete()}>
                                <i className="fa fa-trash-o"></i>&nbsp;
                                <span>删除</span>
                            </a>
                        </div>
                    </PageTitle>
                    <BreadCrumb path={[{href: '/pricelist', name: '报价管理'}]} current="报价详情"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-12">
                            <div className="form-inline">
                                <div className="form-group" style={{marginRight: '20px'}}>
                                    <label htmlFor="guestId">客户id&nbsp;</label>
                                    <input className="form-control" id="guestId" type="text"
                                           value={this.state.guestId} readOnly/>
                                </div>
                                <div className="form-group" style={{marginRight: '20px'}}>
                                    <label htmlFor="guestName">客户名称&nbsp;</label>
                                    <input className="form-control" id="guestName" type="text"
                                           value={this.state.guestName} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">报价日期&nbsp;</label>
                                    <select id="date" value={this.state.date} className="form-control"
                                            onChange={e => this.onDateChange(e)}>
                                        {
                                            this.state.dates.map((value, index) => {
                                                return <option key={index} value={value}>{value}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.note}</td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                </div>
            </div>
        );
    }

}


export default PricelistDetail;