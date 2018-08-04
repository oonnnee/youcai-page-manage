import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import PricelistService from 'service/pricelist-service.jsx';


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
        const tableHeads = [             {name: '编号', width: '5%'},
            {name: '产品分类', width: '15%'},
            {name: '产品名称', width: '30%'},
            {name: '市场价（元）', width: '15%'},
            {name: '优惠价（元）', width: '15%'},
            {name: '备注', width: '25%'}
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="报价详情" >
                        <a href={`/manage/pricelist/export?guestId=${this.state.guestId}&date=${this.state.date}`}
                             target="_blank" className="btn btn-primary">
                            <i className="fa fa-cloud-download"></i>
                            <span>导出excel</span>
                        </a>
                        <Link to={"/pricelist/edit/"+this.state.guestId+"/"+this.state.date} className="btn btn-primary">
                            <i className="fa fa-edit"></i>
                            <span>编辑</span>
                        </Link>
                        <a href="javascript:;" className="btn btn-danger" onClick={() => this.onDelete()}>
                            <i className="fa fa-trash-o"></i>
                            <span>删除</span>
                        </a>
                    </PageTitle>
                    <BreadCrumb path={[{href: '/pricelist', name: '报价管理'}]} current="报价详情"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-4 control-label">客户名称</label>
                                    <div className="col-sm-8">
                                        <Link className="form-control" to={`/guest/detail/${this.state.guestId}`}
                                              target="_blank" readOnly>{this.state.guestName}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="date" className="col-sm-4 control-label">报价日期</label>
                                    <div className="col-sm-8">
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
                    </div>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{product.category}</td>
                                        <td><Link to={`/product/detail/${product.id}`} target="_blank">{product.name}</Link></td>
                                        <td><del>{product.marketPrice}</del></td>
                                        <td>{product.guestPrice} 元/{product.unit}</td>
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