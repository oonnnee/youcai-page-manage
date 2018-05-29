import React from 'react'

import PageTitle from 'page/part/page-title.jsx'

class Home extends React.Component{
    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="主页"/>
                </div>
            </div>
        );
    }
}


export default Home;