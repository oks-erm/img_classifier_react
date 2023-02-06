import React, {Component} from 'react';
import Particles from './components/Particles/Particles';
import Navigation from './components/Nav/Navigation';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import Metric from './components/Metric/Metric';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles/>
        <Navigation />
        <Logo />
        <Metric />
        <ImageForm />
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
