import React,{ Component } from 'react';
import jsonp  from '../util/jsonp';
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
        return (
            <div>
                <p>时{this.state.hour}分{this.state.minutes}秒{this.state.second}</p>
            </div>
        )
    }
}
export default Splike