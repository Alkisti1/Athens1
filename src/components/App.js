import React, {Component} from 'react';
import './App.css';
import MapContainer from './MapContainer';

class App extends Component {
    render() {
        return (
            <div>
                <h1> Search Component</h1>
                <MapContainer google={this.props.google}/>
            </div>
        );
    }
}

export default App;
