import React from 'react'
import WeatherCard from './components/WeatherCard';
import Conditional from './components/Conditional';

class App extends React.Component{

    constructor(){
        super()
        this.APIKEY="********YOUR API-KEY HERE********"
        this.state={
            city:"",
            probCities:[],
            numDays:"",
            min_tc:[],
            max_tc:[],
            condition:[],
            img:[],
            date:[],
            show:0,
            isLoading:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value,
            show:0        
        })
    }

    handleClick(){
        if(parseInt(document.getElementById('numDays').value)<=0||parseInt(document.getElementById('numDays').value)>7){
            alert("Number of days should be between 1 and 7")
            this.setState({
                numDays:"",
                city:""
            })
            return
        }
        var cityName = this.state.city
        var min_arr=[]
        var max_arr=[]
        var cond=[]
        var pics=[]
        var dates=[]
        this.setState({
            isLoading:true
        })
        fetch('http://api.apixu.com/v1/forecast.json?key='+this.APIKEY+'&q='+cityName+'&days='+(this.state.numDays==""?0:parseInt(this.state.numDays)))
        .then((response)=>{
            if(response.status==400)
            {   
                alert("City Not Found !!")
                this.setState({
                    city:"",
                    numDays:"",
                    isLoading:false
                })
                return
            }
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            if(data==undefined){
                return
            }
            var i; 
            for(i=0; i<(this.state.numDays==""?0:parseInt(this.state.numDays)); i++){
                min_arr[i]='Minimum temperature: '+data.forecast.forecastday[i].day.mintemp_c+' degree Celcius',
                max_arr[i]='Maximum temperature: '+data.forecast.forecastday[i].day.maxtemp_c+' degree Celcius',
                cond[i]=data.forecast.forecastday[i].day.condition.text,
                pics[i]=data.forecast.forecastday[i].day.condition.icon
                dates[i]='Date: '+data.forecast.forecastday[i].date
            }  
            this.setState({
                city:cityName,
                min_tc:min_arr,
                max_tc:max_arr,
                condition:cond,
                img:pics,
                date:dates,
                show:1,  
                isLoading:false             
            })
        })
    }
    
    render(){
        var allData=[]
        for(var i=0;i<(document.getElementById('numDays')?(document.getElementById('numDays').value==""?0:parseInt(document.getElementById('numDays').value)):0);i++){
            allData.push(<WeatherCard key={i} city={this.state.city} min={this.state.min_tc[i]} max={this.state.max_tc[i]} condition={this.state.condition[i]} img={this.state.img[i]} date={this.state.date[i]}/>)
        }
        return(
            <div>
                <p><b><u>Welcome To Weather Forecast</u></b></p>
                <input type="text" placeholder="city name" name="city" value={this.state.city} onChange={this.handleChange} />
                <input type="text" placeholder="number of days(1-7)" value={this.state.numDays} onChange={this.handleChange} name="numDays" id="numDays"/>
                <button onClick={this.handleClick}>Find Weather</button>
                <br />
                {this.state.show==0?(this.state.isLoading?<Conditional />:""):
                <div>
                    <p style={{fontSize:'15px',fontWeight:'bold'}}>Weather details for {this.state.city} for next {this.state.numDays} days is as follows:</p>
                    {allData}
                </div>}
            </div>
        )
    }
}

export default App