import React from 'react'


class NavTop extends React.Component{

    render(){
        return (
            <nav className="navbar navbar-default navbar-fixed-top be-top-header">
                <div className="container-fluid">
                    <div className="navbar-header"><a href="index.html" className="navbar-brand"></a></div>
                    <div className="be-right-navbar">
                        <ul className="nav navbar-nav navbar-right be-user-nav">
                            <li className="dropdown"><a href="#" data-toggle="dropdown" role="button"
                                                        aria-expanded="false" className="dropdown-toggle"><img
                                src={require('img/avatar.png')} alt="Avatar"/><span className="user-name">Túpac Amaru</span></a>
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
                        <div className="page-title"><span>Dashboard</span></div>
                        <ul className="nav navbar-nav navbar-right be-icons-nav">
                            <li className="dropdown"><a href="#" role="button" aria-expanded="false"
                                                        className="be-toggle-right-sidebar"><span
                                className="icon mdi mdi-settings"></span></a></li>
                            <li className="dropdown"><a href="#" data-toggle="dropdown" role="button"
                                                        aria-expanded="false" className="dropdown-toggle"><span
                                className="icon mdi mdi-notifications"></span><span className="indicator"></span></a>
                                <ul className="dropdown-menu be-notifications">
                                    <li>
                                        <div className="title">Notifications<span className="badge">3</span></div>
                                        <div className="list">
                                            <div className="be-scroller ps-container ps-theme-default"
                                                 data-ps-id="8e96debb-1c25-45e0-c89c-6bfbb3fb4223">
                                                <div className="content">
                                                    <ul>
                                                        <li className="notification notification-unread"><a href="#">
                                                            <div className="image"><img src={require('img/avatar2.png')}
                                                                                        alt="Avatar"/></div>
                                                            <div className="notification-info">
                                                                <div className="text"><span className="user-name">Jessica Caruso</span> accepted
                                                                    your invitation to join the team.
                                                                </div>
                                                                <span className="date">2 min ago</span>
                                                            </div>
                                                        </a></li>
                                                        <li className="notification"><a href="#">
                                                            <div className="image"><img src={require('img/avatar3.png')}
                                                                                        alt="Avatar"/></div>
                                                            <div className="notification-info">
                                                                <div className="text"><span className="user-name">Joel King</span> is
                                                                    now following you
                                                                </div>
                                                                <span className="date">2 days ago</span>
                                                            </div>
                                                        </a></li>
                                                        <li className="notification"><a href="#">
                                                            <div className="image"><img src={require('img/avatar4.png')}
                                                                                        alt="Avatar"/></div>
                                                            <div className="notification-info">
                                                                <div className="text"><span className="user-name">John Doe</span> is
                                                                    watching your main repository
                                                                </div>
                                                                <span className="date">2 days ago</span>
                                                            </div>
                                                        </a></li>
                                                        <li className="notification"><a href="#">
                                                            <div className="image"><img src={require('img/avatar5.png')}
                                                                                        alt="Avatar"/></div>
                                                            <div className="notification-info"><span
                                                                className="text"><span className="user-name">Emily Carter</span> is now following you</span><span
                                                                className="date">5 days ago</span></div>
                                                        </a></li>
                                                    </ul>
                                                </div>
                                                <div className="ps-scrollbar-x-rail" style={{left: '0px',bottom: '0px'}}>
                                                    <div className="ps-scrollbar-x" tabIndex="0"
                                                         style={{left: '0px',width: '0px'}}></div>
                                                </div>
                                                <div className="ps-scrollbar-y-rail" style={{top: '0px',right: '0px'}}>
                                                    <div className="ps-scrollbar-y" tabIndex="0"
                                                         style={{top: '0px',height: '0px'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="footer"><a href="#">View all notifications</a></div>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown"><a href="#" data-toggle="dropdown" role="button"
                                                        aria-expanded="false" className="dropdown-toggle"><span
                                className="icon mdi mdi-apps"></span></a>
                                <ul className="dropdown-menu be-connections">
                                    <li>
                                        <div className="list">
                                            <div className="content">
                                                <div className="row">
                                                    <div className="col-xs-4"><a href="#"
                                                                                 className="connection-item"><img
                                                        src={require('img/github.png')} alt="Github"/><span>GitHub</span></a>
                                                    </div>
                                                    <div className="col-xs-4"><a href="#"
                                                                                 className="connection-item"><img
                                                        src={require('img/bitbucket.png')}
                                                        alt="Bitbucket"/><span>Bitbucket</span></a></div>
                                                    <div className="col-xs-4"><a href="#"
                                                                                 className="connection-item"><img
                                                        src={require('img/slack.png')} alt="Slack"/><span>Slack</span></a>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xs-4"><a href="#"
                                                                                 className="connection-item"><img
                                                        src={require('img/dribbble.png')}
                                                        alt="Dribbble"/><span>Dribbble</span></a></div>
                                                    <div className="col-xs-4"><a href="#"
                                                                                 className="connection-item"><img
                                                        src={require('img/mail_chimp.png')} alt="Mail Chimp"/><span>Mail Chimp</span></a>
                                                    </div>
                                                    <div className="col-xs-4"><a href="#"
                                                                                 className="connection-item"><img
                                                        src={require('img/dropbox.png')} alt="Dropbox"/><span>Dropbox</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="footer"><a href="#">More</a></div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

}


export default NavTop;