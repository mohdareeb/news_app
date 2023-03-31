import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    capatilise =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    constructor(props){
        super(props);
        console.log("This is a constructor from News");
        this.state={
            articles:[],
            loading:false,
            page:1
        }
        document.title=`${this.capatilise(this.props.category)} - News`;
    }
    async updateNews(){
        this.props.setProgress(10);
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2ee5c7a65734b5299cdfa04cc47950e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        this.props.setProgress(30);
        let parsedData= await data.json();
        console.log(parsedData);
        this.props.setProgress(70);
        this.setState({articles:parsedData.articles,
                        totalResults:parsedData.totalResults,
                    loading:false});
        this.props.setProgress(100);            
    }
    async componentDidMount(){
        // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2ee5c7a65734b5299cdfa04cc47950e&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data= await fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);
        // this.setState({articles:parsedData.articles,
        //                 totalResults:parsedData.totalResults,
        //             loading:false});
        this.updateNews();
    }
    handleNextClick= async()=>{
        // console.log("Next");
        // if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
        // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2ee5c7a65734b5299cdfa04cc47950e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data= await fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page:this.state.page+1,
        //     articles:parsedData.articles,
        //     loading:false
        // });
        this.setState({page:this.state.page + 1 })
        this.updateNews();

    // }

    }
    handlePrevClick=async ()=>{
        // console.log("Prev");
        // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2ee5c7a65734b5299cdfa04cc47950e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        
        // this.setState({loading:true});
        // let data= await fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page:this.state.page-1,
        //     articles:parsedData.articles,
        //     loading:false
        // });
        this.setState({page:this.state.page - 1 });
        this.updateNews();
    }
    render(){
        return (
            <div className="container my-3">
                <h2 className="text-center" style={{margin:"30px 0px"}}>
                 Top Headlines on {this.capatilise(this.props.category)}
                </h2>
                <div className="text-center">
                {this.state.loading && <Spinner/>}
                </div>
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0,60):""} imageUrl={element.urlToImage} url={element.url} author={element.author?element.author:"unknown"} date={element.publishedAt} source={element.source.name}/>
                            </div>   
                        );

                })}
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} onClick={this.handlePrevClick} type="button" className="btn btn-primary">&larr;  Previous </button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button"  onClick={this.handleNextClick} className="btn btn-primary">Next &rarr;</button>

                </div>
            </div>
        )
    }

}