import React from 'react'

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            pCodes: '',
            checks:{},  // 大类搜索复选框数据
        }
    }

    componentDidMount(){
        this.loadChecks();
    }

    // 数据变化的时候
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
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
                            <label><input type="checkbox"/></label>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   placeholder="关键词"
                                   name="searchKeyword"
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

    loadChecks(){

    }
}
export default Search;