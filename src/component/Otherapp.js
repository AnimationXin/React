import  React, { Component } from 'react';
import jsonp from '../util/jsonp';
import './Otherapp.css';
class Otherapp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            apps: [],
            url: this.props.source
        }
    }
    componentWillMount(){
        let that = this;
        jsonp( this.state.url,"","callback",(data)=>{
            if(data.status == 1){
                that.setState({
                    apps: data.data
                })
                console.log(this.state.apps)
            }else{
                alert(data.msg);
            }
        } )
    }
    render(){
        return (
            <div className="oapp">
            <ul>
                {
                    this.state.apps.map((app,index) => {
                        return <li key={index}>
                                    <a href={ app.url }>
                                        <div className="app_icon">
                                            <img src={ app.icon } alt=""/>
                                        </div>
                                        <span>{ app.title }</span>
                                    </a>
                        </li>
                    })
                }
            </ul>
        </div>
        )
    }
}
export default Otherapp