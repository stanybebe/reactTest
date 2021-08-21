import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { readRemoteFile } from 'react-papaparse';


export default class ReadRemoteFile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         checking:false,
         objs: Array()
      };
    }
    handleClick = () => {
    readRemoteFile('https://raw.githubusercontent.com/stanybebe/stanybebe.github.io/master/AmphiBIO_v1.csv', {
      complete: (results) => {
        let keys = results.data[0];
        let val = results.data.slice(1);
        let objs = val.map(array => {
            let obj ={};
            keys.forEach((key, i) => obj[key] = array[i]);
            return obj;

        });
        console.log('Results:', objs);
        this.setState({
        objs: objs
        });
        this.renderData();
      }, 
      
    });

  };  

  renderData() {
    const formattedObs = this.state.objs.map((ob) =>{
        <ul key={ob.id}>
        <li>{ob.Family}</li>
        </ul>
    })
    return (
    <div>{formattedObs}</div>

    );
  }

  render() {
    return (
     <div> 
     <button onClick={this.handleClick}>readRemoteFile</button>
     {this.renderData()}

    </div>)
  }
}

// function dataToJson(e) {
   
//     for (let i = 0; i < e.length; i++){
//         console.log(e[Math.floor(Math.random(0,6000))]);
//     }


