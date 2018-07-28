import React from 'react';

import AppUtil from 'util/app-util.jsx';

import PageTitle from 'page/part/page-title.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import StatService from 'service/stat-service.jsx';

const appUtil = new AppUtil();

const statService = new StatService();

class StatWeek extends React.Component{
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
        statService.getDataWeek().then(data => {
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
            {name: '星期一', width: '8%'},
            {name: '星期二', width: '8%'},
            {name: '星期三', width: '8%'},
            {name: '星期四', width: '8%'},
            {name: '星期五', width: '8%'},
            {name: '星期六', width: '8%'},
            {name: '星期天', width: '8%'},
            {name: '合计', width: '15%'},
        ];

        const tableCaption =
            <caption>{new Date().getFullYear()}年{new Date().getMonth()+1}月份广东优菜农业发展有限公司销售数据周报（单位：万元）</caption>;

        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="按维度统计--周报" >
                        <a href={`http://${appUtil.getDeployAddress()}:8080/manage/stat/export/week`}
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
                                        <td>{year.day1}</td>
                                        <td>{year.day2}</td>
                                        <td>{year.day3}</td>
                                        <td>{year.day4}</td>
                                        <td>{year.day5}</td>
                                        <td>{year.day6}</td>
                                        <td>{year.day7}</td>
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
export default StatWeek;