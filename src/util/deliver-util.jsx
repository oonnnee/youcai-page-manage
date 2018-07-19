
class DeliverUtil{

    getStateUnknow(){
        return {
            state: '-1',
            note: '未知状态'
        };
    }

    getStateAll(){
        return {
            state: '0',
            note: '全部'  // 送货中 & 已收货
        };
    }

    getStateDelivering(){
        return {
            state: '1',
            note: '送货中'
        };
    }

    getStateReceive(){
        return {
            state: '2',
            note: '已收货'
        };
    }

    getShow(value){
        let show;
        if (value === this.getStateDelivering().state){
            show = this.getStateDelivering().note;
        } else if (value === this.getStateReceive().state){
            show = this.getStateReceive().note
        } else {
            show = this.getStateUnknow().note;
        }
        return show;
    }
}


export default DeliverUtil;