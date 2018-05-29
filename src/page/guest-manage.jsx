import React from 'react'

import PageTitle from 'page/part/page-title.jsx'

class GuestManage extends React.Component{
    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="客户" subTitle="客户管理"/>
                </div>
            </div>
        );
    }
}


export default GuestManage;