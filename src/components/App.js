import React, {Component} from 'react';
import './App.css';
import MapContainer from './MapContainer';
import Top from './Header';



class App extends Component {
    render() {
        return (
            <div  className='map-container'>
            <Top/>
                <MapContainer
/>
            </div>
        );
    }
}

export default App;
