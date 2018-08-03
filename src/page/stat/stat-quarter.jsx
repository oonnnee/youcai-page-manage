import React from 'react';

import AppUtil from 'util/app-util.jsx';

import PageTitle from 'page/part/page-title.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import StatService from 'service/stat-service.jsx';

const appUtil = new AppUtil();

const statService = new StatService();

class StatQuarter extends React.Component{
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
        statService.getDataQuarter().then(data => {
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
            {name: '第1月', width: '10%'},
            {name: '第2月', width: '10%'},
            {name: '第3月', width: '10%'},
            {name: '合计', width: '15%'},
        ];

        const tableCaption =
            <caption>{new Date().getFullYear()}年第{parseInt(new Date().getMonth()/3)+1}季度广东优菜农业发展有限公司销售数据统计表（单位：万元）</caption>;

        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="按维度统计--季报" >
                        <a href={`/manage/stat/export/quarter`}
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
                                        <td>{year.month1}</td>
                                        <td>{year.month2}</td>
                                        <td>{year.month3}</td>
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
export default StatQuarter;