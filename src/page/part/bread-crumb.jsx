import React from 'react';
import {Link} from 'react-router-dom';

class BreadCrumb extends React.Component{

    render(){
        return (
            <ol className="breadcrumb">
                {
                    this.props.path.map((value, key) => {
                        return <li key={key}><Link to={value.href}>{value.name}</Link></li>;
                    })
                }
                <li className="active">{this.props.current}</li>
            </ol>
        );
    }

}

export default BreadCrumb;