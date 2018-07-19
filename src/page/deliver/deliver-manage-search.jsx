import React from 'react'

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchType      : 'guestName',
            searchKeyword   : ''
        }
    }
    // 数据变化的时候
    onValueChange(e){
        const value = e.target.value.trim();
        this.setState({
            'searchKeyword' : value
        });
    }
    // 点击搜索按钮的时候
    onSearch(){
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
    }
    // 输入关键字后按回车，自动提交
    onSearchKeywordKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }
    render(){
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   placeholder="客户名称"
                                   name="guestName"
                                   onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                        <button className="btn btn-default"
                                onClick={(e) => this.onSearch()}>搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;