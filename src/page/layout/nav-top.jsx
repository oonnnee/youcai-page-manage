import React from 'react'


class NavTop extends React.Component{

    render(){
        return (
            <nav className="navbar navbar-default navbar-fixed-top be-top-header">
                <div className="container-fluid">
                    <div className="navbar-header"><a href="index.html" className="navbar-brand"></a></div>
                    <div className="be-right-navbar">
                        <ul className="nav navbar-nav navbar-right be-user-nav">
                            <li className="dropdown">
                                <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="dropdown-toggle">
                                    <img src={require('img/avatar.png')} alt="Avatar"/>
                                    <span className="user-name">Túpac Amaru</span></a>
                                <ul role="menu" className="dropdown-menu">
                                    <li>
                                        <div className="user-info">
                                            <div className="user-name">Túpac Amaru</div>
                                            <div className="user-position online">Available</div>
                                        </div>
                                    </li>
                                    <li><a href="#"><span className="icon mdi mdi-face"></span> Account</a></li>
                                    <li><a href="#"><span className="icon mdi mdi-settings"></span> Settings</a></li>
                                    <li><a href="#"><span className="icon mdi mdi-power"></span> Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="page-title"><span>主页</span></div>
                    </div>
                </div>
            </nav>
        );
    }

}


export default NavTop;