import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description ,imageUrl,url,author,date,source} = this.props;
        return (
            <div className="my-2">
                <div className="card" style={{width: "18rem"}}>
                        <img src= {imageUrl} className="card-img-top" alt="..."/>
                        <div className ="card-body">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                         {source}
                        <span className="visually-hidden">unread messages</span>
                        </span>
                        <h5 className ="card-title">{title}</h5>
                        <p className ="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={url}  rel="noreferrer" target="_blank" className ="btn btn-primary">Click to read</a>
                        </div>
                </div>
            </div>
        )
    }
}
