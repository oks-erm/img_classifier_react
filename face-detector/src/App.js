import React, { Component } from 'react';
import Particles from './components/Particles/Particles';
import Navigation from './components/Nav/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageForm from './components/ImageForm/ImageForm';
import Profile from './components/Profile/Profile';
import Metric from './components/Metric/Metric';
import './App.css';


const PAT = process.env.REACT_APP_PAT;
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';


const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const regions = JSON.parse(data).outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width + 20,
        topRow: clarifaiFace.top_row * height + 20,
        rightCol: width - (clarifaiFace.right_col * width) + 20,
        bottomRow: height - (clarifaiFace.bottom_row * height) + 30
      };
    });
  };

  displayFaceBox = (faceLocations) => {
    this.setState({ boxes: faceLocations });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
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

    // clarifai api call
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.text())
      .then((result) => {
        if (JSON.parse(result).status.code === 10000) {
          fetch('https://image-classifier-4o7b.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(result))})
      .catch(error => console.log('error', error));

    // a post request to the server to save an imageurl and the date
    fetch('https://image-classifier-4o7b.onrender.com/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.state.user.id,
        imageUrl: this.state.input
      })
    })
      .then(res => res.json())
      .catch(error => {
        console.error('Error:', error);
      });
  }

  onRouteChange = (route, id) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else if (route === 'profile') {
      console.log('profile');
    } 
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes, user } = this.state;
    return (
      <div className="App">
        <Particles />
        <header>
        <Navigation user={user} isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        </header>
        <main className='mt6'>
        {route === 'home'
          ? <div>
            <Logo route={route}/>
            <ImageForm
              onInputChange={this.onInputChange}
              onSubmit={this.onButtonSubmit} />
            <Metric boxes={boxes} imageUrl={imageUrl} />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : (
                route === 'profile'
                  ? <Profile user={user} onRouteChange={this.onRouteChange} />
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )
          )
          } 
        </main>
      </div>
    );
  }
}

export default App;
