import React from 'react';

import AppUtil from 'util/app-util.jsx';

import PageTitle from 'page/part/page-title.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import StatService from 'service/stat-service.jsx';

const appUtil = new AppUtil();

const statService = new StatService();

class StatMonth extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }

    componentWillMount(){
        this.loadData();
    }

    loadData(){
        statService.getDataMonth().then(data => {
            this.setState({
                data: data
            });
        }, error => {
            appUtil.errorTip(error);
        });
    }

    render(){
        const tableHeads = [
            {name: '序号', width: '10%'},
            {name: '客户名称', width: '25%'},
            {name: '第1周', width: '10%'},
            {name: '第2周', width: '10%'},
            {name: '第3周', width: '10%'},
            {name: '第4周', width: '10%'},
            {name: '第5周', width: '10%'},
            {name: '合计', width: '15%'},
        ];

        const tableCaption =
            <caption>{new Date().getFullYear()}年{new Date().getMonth()+1}月份广东优菜农业发展有限公司销售数据统计表（单位：万元）</caption>;

        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="按维度统计--月报" >
                        <a href={`http://${appUtil.getDeployAddress()}:8080/manage/stat/export/month`}
                           target="_blank" className="btn btn-primary">
                            <i className="fa fa-cloud-download"></i>
                            <span>导出excel</span>
                        </a>
                    </PageTitle>
                    <DataGrid tableHeads={tableHeads}
                              tableCaption={tableCaption}>
                        {
                            this.state.data.map((year, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{year.id}</td>
                                        <td>{year.name}</td>
                                        <td>{year.week1}</td>
                                        <td>{year.week2}</td>
                                        <td>{year.week3}</td>
                                        <td>{year.week4}</td>
                                        <td>{year.week5}</td>
                                        <td>{year.sum}</td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                </div>
            </div>
        )
    }
}
export default StatMonth;