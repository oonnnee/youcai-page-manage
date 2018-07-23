import React from 'react';

import AppUtil from 'util/app-util.jsx';

import PageTitle from 'page/part/page-title.jsx';

import StatService from 'service/stat-service.jsx';

const appUtil = new AppUtil();

const statService = new StatService();

class StatRange extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            startDate: appUtil.getYearStartString(new Date()),
            endDate: appUtil.getDateString(new Date()),
        }
    }

    componentDidMount(){
        this.loadChartData();
    }

    onChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onSubmit(){
        if (this.state.endDate < this.state.startDate){
            appUtil.errorTip('结束日期不能小于起始日期');
            return;
        }

        this.loadChartData();
    }

    loadChartData(){
        statService.getDataRange(this.state.startDate, this.state.endDate).then(data => {
            let mid = [];
            for(let i=0; i<data.length; i++){
                mid[i] = [data[i].name, data[i].total];
            }
            this.setState({
                data: mid
            }, () => {
                this.loadChart();
            });
        }, error => {
            appUtil.errorTip(error);
        });
    }

    loadChart(){
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: '客户消费排行'
            },
            subtitle: {
                text: `时间范围：${this.state.startDate}至${this.state.endDate}`
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45  // 设置轴标签旋转角度
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '万元'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '消费: <b>{point.y:.2f} 万元</b>'
            },
            series: [{
                name: '总人口',
                data: this.state.data,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.2f}', // :.1f 为保留 1 位小数
                    y: 10
                }
            }]
        });
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="按时间范围统计" />
                    <div className="row margin-bottom-md">
                        <div className="form-horizontal">
                            <label className="col-md-1 control-label">起始日期</label>
                            <div className="col-md-2">
                                <input id="startDate" type="date" className="form-control" value={this.state.startDate}
                                       onChange={e => this.onChange(e)}/>
                            </div>
                            <label className="col-md-1 control-label">结束日期</label>
                            <div className="col-md-2">
                                <input id="endDate" type="date" className="form-control" value={this.state.endDate}
                                       onChange={e => this.onChange(e)}/>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-default" onClick={() => this.onSubmit()}>确认</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div id="container" style={{minWidth: '400px', height: '500px'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default StatRange;