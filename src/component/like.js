import React,{Component} from 'react';
import json from '../util/jsonp';
import './like.css';
import jsonp from '../util/jsonp';
class Like extends Component{
    constructor(item){
        super(item)
        this.state = {
            stores: [],
            url: this.props.source
        }
    }
    componentDidMount(){
        jsonp(this.state.url,"","callback",(data)=>{
            console.log(data,77777)
            if(data.status == 1){
                this.setState({
                    stores: data.data
                })
            }else{
                alert("err message");
            }
        })
    }
    render(){
        return(
            <div>
               <div id="like">
				<p>猜你最爱</p>
				{
					this.state.stores.map((item,index) => {
						return <div className="like_content" key={index}>
									<div className="like_link">
										<a href={ item.url }>
											<img src={ item.icon } alt=""/>
										</a>
									</div>
									<div className="like_desc">
										<span>
											{ item.desc }		
										</span>
									</div>
									<div className="like_price">
										<span>¥{ item.price }</span>
										<div><a href={ item.more }>看相似</a></div>
									</div>
								</div>
					    })
				    }
			    </div>
            </div>
        )
    }
}
export default Like