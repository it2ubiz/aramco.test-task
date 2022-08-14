// src/App.js
import React, { Component } from 'react';
import Contacts from './components/cards';
import './App.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, MarkSeries} from 'react-vis';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: 1,
      contacts: [],
      arTab:[],
      dataTab:[]
    };
    this.handleClick = this.handleClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let url ="http://127.0.0.1:5000/predict/0";
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      if (data.result.lenght!=0)
      {
        let rs=JSON.parse(data.result)
        let arTmp=[]
        rs.X.map((dt) => (
          arTmp.push(dt)
        ))        
        this.setState({ 
          arTab: arTmp,
          dataTab: rs.Y
        })
      }
    })
    .catch(console.log)
  }  

  render() {
    return (
      <div>
         <XYPlot
            width={300}
            height={300}
            getX={d => d[0]}
            getY={d => d[1]}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <MarkSeries
              color="black"
              fill ="blue"
              data={this.state.dataTab}/>
            <XAxis/>
            <YAxis/>
          </XYPlot>
          <div>
            <button onClick={this.handleClick}>
              Load more 10 records
            </button>
          </div>
        <Contacts contacts={this.state.arTab} />
      </div>
    )
  }

  handleClick = ()=> {
    let arTmp=[]
    let dtTmp=[]
    this.setState(state => ({     
      isToggleOn: state.isToggleOn+1
    }))
    let url ="http://127.0.0.1:5000/predict/"+this.state.isToggleOn;
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      if ((data.result.length !=0)&&(data.result !==[]))
      {
        console.log(data.result.length)
        let dat = JSON.parse(data.result);
        arTmp=this.state.arTab;
        dtTmp=this.state.dataTab;
        dat.X.map((dt) => ( arTmp.push(dt)))
        dat.Y.map( (dy) => (dtTmp.push(dy)))
        this.setState({ 
          arTab: arTmp,
          dataTab: dtTmp
        })
      }      
    })
    .catch(console.log)
  }
}
//<Contacts contacts={this.state.contacts} />
export default App;