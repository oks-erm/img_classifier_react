import React, {Component} from 'react';

import Particles from './components/Particles/Particles';
import Navigation from './components/Nav/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import Metric from './components/Metric/Metric';
import './App.css';


const PAT = process.env.REACT_APP_PAT;
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
      }
    }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log(this.state.input);
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };


    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.text())
      .then(result => console.log(JSON.parse(result).outputs[0].data.regions[0].region_info.bounding_box))
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className="App">
        <Particles/>
        <Navigation />
        <Logo />
        <Metric />
        <ImageForm 
          onInputChange={this.onInputChange} 
          onSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
