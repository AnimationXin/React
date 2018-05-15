import React, {Component} from "react";
import './server.css';
import bgColor from '../images/jd-sprites.png';

var sectionStyle = {
    backgroundImage: `url(${bgColor})`,
    color: 'white'
}
class Server extends Component{
    constructor(item){
        super(item);
        this.state = {
            bg: "transparent"
        }
    }
    componentWillMount(){
        window.onscroll = (event) => {
            var that = this;
			let realHeight = document.documentElement.scrollTop || document.body.scrollTop;
			let optatic = 0.8 * (realHeight/142);
			if(optatic <= 0.8 ) {
				that.setState({
					bg: `rgba(234, 44, 44, ${optatic})`,
				})
			}
		}
    }
    render(){
        var bColor = this.state.bg ? this.state.bg : 'transprent';
        return (
            <div id="search" className="pf" style={{ background: bColor }} >
              	<div className="search pr">
					<div className="sl pa">
						<i>京东</i>
					</div>
					<div className="frc pr">
						<span className="searchicon pa"></span>
						<form>
							<input placeholder="全场畅饮，部分低至99减50" type="text"/>
						</form>
					</div>
                    <div className="sub pa">
						<span>登录</span>
					</div>
				</div>
             
            </div>
        )
    }
}
// 每个组件都需要导出
export default Server