import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { readRemoteFile } from 'react-papaparse';


export default class ReadRemoteFile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         checking:false,
         objs: Array
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick = () => {
    readRemoteFile('https://raw.githubusercontent.com/stanybebe/stanybebe.github.io/master/AmphiBIO_v1.csv', {
      complete: (results) => {
        let keys = results.data[0];
        let val = results.data.slice(1);
        let objsNu = val.map(array => {
            let obj ={};
            keys.forEach((key, i) => obj[key] = array[i]);
            return obj;

        });
        
        this.setState({
        objs: objsNu
        });
        console.log('Results:', this.state.objs);
      }, 
      
    });

  };  

  renderData() {
    const formattedObs = this.state.objs.map((ob) =>{
       
        <li key={ob.id}>{ob.Family}</li>
        
    })
    return (
    <ul>{formattedObs}</ul>

    );
  }

  render() {
    return (
     <div> 
     <button onClick={this.handleClick}>readRemoteFile</button>
     <div onClick={this.handleClick}>{this.renderData}</div>
     

    </div>)
  }
}

// function dataToJson(e) {
   
//     for (let i = 0; i < e.length; i++){
//         console.log(e[Math.floor(Math.random(0,6000))]);
//     }


