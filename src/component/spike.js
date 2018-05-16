import React,{ Component } from 'react';
import jsonp  from '../util/jsonp';
import './splike.css';
class Splike extends Component{
    constructor(item){
        super(item)
        this.state = {
            url: this.props.source,
            stores:[],
            more: '',
            hour: "00",
			minutes: "00",
			second: "00",
        }
    }
    formatTime( times = 0 ){
        /* 得到时间 */
        times = +times;
        let hour = 0,
            minutes = 0,
            second = 0,
            /* 判断是否为2位数 */
            regTwo = /^\d{2}$/,
            /* 1或者二 */
            regInteger = /^(\d{1,2})\.?\d*$/;
            if(times/3600 >=1){
                /* 秒数除以3600 = 小时 */
                hour = times/3600;
                /* 把小时取整得到1小时 */
                hour = +regInteger.exec(hour.toString())[1];
                /*得到分钟 还得接着判断 */ 
                times -= hour*3600;
                /* 判断时间是不是2位数 如果不是就往前面加个0 */ 
                hour = regTwo.test(hour.toString()) ? hour.toString() : `0${hour}`;
            }
            /*计算分 上一次的位置肯定会走这里 上次求出多出来的时间 */
            if(times / 60 >= 1){
                minutes = times/60;
                /*同理 */
                minutes = +regInteger.exec(minutes.toString())[1];
                times -= minutes*60;
                /*同理 */
                minutes = regTwo.test(minutes.toString()) ? minutes.toString() : `0${minutes}`;
            }
            second = times;
            /*同理 */
           times = regTwo.test( times.toPrecision() ? times.toString() : `0${times}`);
           /**返回 时 分 秒  */
            return {
                hour,
                minutes,
                second
            }
    }
    componentDidMount(){
        let getData = () =>{
            let promise = new Promise((resolve,reject)=>{
                jsonp(this.state.url,"","callback",(data)=>{
                    if(data.status == 1){
							this.setState({
								stores: data.data,
								more: data.more,
                            });
                            /* 通过primise返回的参数得到时间 */
							resolve(data.times);
                    }else{
                        alert(data.msg);
                        reject("get data error")
                    }
                })
            })
            return promise;
        }
       getData().then((times)=>{
           times = +times;
           let timer = window.setInterval( ()=>{
            let {hour, minutes, second} = this.formatTime(times--);
            if(times == -1){
                clearInterval(timer);
                timer = null;
            }
            /* 得到时分秒 可以放到页面 */
            this.setState({
                hour: hour,
                minutes: minutes,
                second: second
            })      
           },1000 );
       }),(err)=>{
           alert(err)
       }
    }
    render(){
        let countId = 0;
        return (
            <div id="spike">
            <div className="spike_header">
                <i></i>
                <span className="spike_title">掌上时间</span>
                <div className="spike_time">
                    {
                        (() => {
                            return  <div>
                                        <span>{this.state.hour}</span>:<span>{this.state.minutes}</span>:<span>{this.state.second}</span>
                                    </div>
                                    
                        })()
                    }
                </div>
                <div className="spike_more fr">
                    <i className="fr"></i>
                    <a href={this.state.more}>
                        <span>更多秒杀</span>
                    </a>
                    
                </div>
                <div style={{clear:"both"}}></div>
            </div>
            <ul className="spike_content">
                {
                    this.state.stores.map((item,index) => {
                        return <li key={index}>
                                    <a href={item.url}>
                                        <div>
                                            <img src={item.icon} alt=""/>
                                        </div>
                                        <p>¥{item.sprice}</p>
                                        <p className="real-price">¥{item.price}</p>
                                    </a>
                            </li>
                    })
                }
            </ul>
        </div>
        )
    }
}
export default Splike