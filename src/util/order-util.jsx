
class OrderUtil{

    getStateUnknow(){
        return {
            state: '-1',
            note: '未知状态'
        };
    }

    getStateAll(){
        return {
            state: '0',
            note: '全部'  // 新采购单 & 待退回 & 已退回 & 已发货
        };
    }

    getStateNew(){
        return {
            state: '1',
            note: '新采购单'
        };
    }

    getStateBacking(){
        return {
            state: '2',
            note: '待退回'
        };
    }

    getStateBacked(){
        return {
            state: '3',
            note: '已退回'
        };
    }

    getStateDelivered(){
        return {
            state: '4',
            note: '已发货'
        };
    }

    getStatePending(){
        return {
            state: '5',
            note: '待处理' // 新采购单 & 待退回
        };
    }


    getShow(value){
        let show;
        const state = value[0];
        if (state === this.getStateNew().state){
            show = this.getStateNew().note;
        } else if (state === this.getStateBacking().state){
            show = `${this.getStateBacking().note}  ( ${value} )`
        } else if (state === this.getStateBacked().state){
            show = `${this.getStateBacked().note}  ( ${value} )`
        } else if (state === this.getStateDelivered().state){
            show = this.getStateDelivered().note
        } else {
            show = this.getStateUnknow().note;
        }
        return show;
    }
}


export default OrderUtil;