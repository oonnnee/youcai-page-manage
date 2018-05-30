import React from 'react';
import RcPagination from 'rc-pagination';
import Select from 'rc-select';
import 'rc-pagination/dist/rc-pagination.min.css';
import 'rc-select/assets/index.css';

// 通用分页组件
class Pagination extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <RcPagination {...this.props}
                                  selectComponentClass={Select}
                                  showSizeChanger
                                  defaultPageSize={10}
                                  showQuickJumper/>
                </div>
            </div>
        );
    }
}

export default Pagination;