import  React, { Component } from 'react'
import './header.css';
import '../lib/swiper.min.css';
import jsonp from '../util/jsonp';
// import '../lib/swiper.min.js';
class Header extends Component{
    constructor(item){
        super(item);
        this.state = {
            imgUrls: [],
            url: this.props.source
        }
    }
    componentDidMount() {
        jsonp(this.state.url, "", "callback", (data) => {
			if(data.status) {
					this.setState({
						imgUrls: data.data,
					})
			}else {
				alert(data.msg);
			}
		}); 
	}
    render(){
        return (
            <div>
             <div className="swiper-container">
			    <div className="swiper-wrapper">
			    	{
			    		this.state.imgUrls.map((url,index) => {
			    			return <div className="swiper-slide" key={index} >
			    						<img className="img" src={url} />
			    			</div>
			    		})
			    	}
			    </div>
				<div className="swiper-pagination"></div>
			</div>
            </div>
        )
    }
}
export default Header
