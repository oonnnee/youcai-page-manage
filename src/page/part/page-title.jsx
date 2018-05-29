import React from 'react'

class PageTitle extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">
                        {this.props.title}&nbsp;&nbsp;<small>{this.props.subTitle}</small>
                    </h1>
                </div>
            </div>
        );
    }

}

export default PageTitle;