import React from 'react';

import AppUtil from 'util/app-util.jsx';

import PageTitle from 'page/part/page-title.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import StatService from 'service/stat-service.jsx';

const appUtil = new AppUtil();

const statService = new StatService();

class StatYear extends React.Component{
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
        statService.getDataYear().then(data => {
            this.setState({
                data: data
            });
        }, error => {
            appUtil.errorTip(error);
        });
    }

    render(){
        const tableHeads = [
            {name: '序号', width: '5%'},
            {name: '客户名称', width: '25%'},
            {name: '1月份', width: '5%'},
            {name: '2月份', width: '5%'},
            {name: '3月份', width: '5%'},
            {name: '4月份', width: '5%'},
            {name: '5月份', width: '5%'},
            {name: '6月份', width: '5%'},
            {name: '7月份', width: '5%'},
            {name: '8月份', width: '5%'},
            {name: '9月份', width: '5%'},
            {name: '10月份', width: '6%'},
            {name: '11月份', width: '6%'},
            {name: '12月份', width: '6%'},
            {name: '合计', width: '7%'},
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="按维度统计--年报" />
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.data.map((year, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{year.id}</td>
                                        <td>{year.name}</td>
                                        <td>{year.month1}</td>
                                        <td>{year.month2}</td>
                                        <td>{year.month3}</td>
                                        <td>{year.month4}</td>
                                        <td>{year.month5}</td>
                                        <td>{year.month6}</td>
                                        <td>{year.month7}</td>
                                        <td>{year.month8}</td>
                                        <td>{year.month9}</td>
                                        <td>{year.month10}</td>
                                        <td>{year.month11}</td>
                                        <td>{year.month12}</td>
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
export default StatYear;