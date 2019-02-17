import React from 'react'

class WeatherCard extends React.Component{
    constructor(){
        super()
    }
    render(){
        const cardStyle={
            height:'160px',
            width:'320px',
            border:'4px solid black',
            padding:'5px',
            fontWeight:'bold',
            backgroundImage:"url("+this.props.img+")"
        }
        const cityName_style={
            fontSize:'25px',
            fontWeight:'Bold'
        } 
        const date_style={
            fontSize:'12px'
        }
        return(
            <div style={cardStyle}>
                <div style={cityName_style}>{this.props.city}
                    <div style={date_style}>{this.props.date}</div>
                </div>
                <p>{this.props.min}</p>
                <p>{this.props.max}</p>
                <p>{this.props.condition}</p>
            </div>
        )
    }
}

export default WeatherCard