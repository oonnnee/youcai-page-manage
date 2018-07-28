import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class StatService{

    getDataRange(startDate, endDate){
        return appUtil.request({
            type: 'get',
            url: '/manage/stat/range',
            data: {startDate: startDate, endDate: endDate}
        });
    }

    getDataYear(){
        return appUtil.request({
            type: 'get',
            url: '/manage/stat/year',
        });
    }
    getDataQuarter(){
        return appUtil.request({
            type: 'get',
            url: '/manage/stat/quarter',
        });
    }
    getDataMonth(){
        return appUtil.request({
            type: 'get',
            url: '/manage/stat/month',
        });
    }
    getDataWeek(){
        return appUtil.request({
            type: 'get',
            url: '/manage/stat/week',
        });
    }
}

export default StatService;