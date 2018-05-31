import React from 'react';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import 'layui-src/dist/css/layui.css';

import CategoryService from 'service/category-service.jsx';
import AppUtil from 'util/app-util.jsx';

const categoryService = new CategoryService();
const appUtil = new AppUtil();

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            PCodes: [],
            categories:[],
        }
    }

    componentDidMount(){
        this.loadCategories();
    }

    render(){
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <fieldset>
                        <legend>搜索</legend>
                        <div>
                            <div className="form-inline">
                                <div className="form-group">
                                    {
                                        this.state.categories.map((category, key) => {
                                            return (
                                                <label key={key} style={{marginRight: '8px'}}>
                                                    <Checkbox name={category.code}
                                                                onChange={(e) => this.onCategorySelChange(e, status)}/>
                                                    &nbsp;{category.name}</label>
                                            );
                                        })
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control"
                                           placeholder="产品名称"
                                           onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                                           onChange={(e) => this.onNameChange(e)}/>
                                </div>
                                <button className="btn btn-default"
                                        onClick={() => this.onSearch()}>搜索</button>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }

    loadCategories(){
        categoryService.list().then(data => {
            this.state.categories = data;
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    onCategorySelChange(e){
        if (e.target.checked){
            this.state.PCodes.push(e.target.name);
        }else{
            appUtil.removeElementInArray(this.state.PCodes, e.target.name);
        }
    }

    onNameChange(e){
        let value = e.target.value.trim();
        this.state.name = value;
    }

    // 点击搜索按钮的时候
    onSearch(){
        this.props.onSearch(this.state.PCodes.toString(), this.state.name);
    }
    // 输入关键字后按回车，自动提交
    onSearchKeywordKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }
}
export default Search;