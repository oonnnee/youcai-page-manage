import React from 'react'


class Home extends React.Component{
    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-header">
                                Dashboard <small>Summary of your App</small>
                            </h1>
                            <ol className="breadcrumb">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Library</a></li>
                                <li className="active">Data</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;