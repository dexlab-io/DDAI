import React, { Component } from 'react';
import Application from 'react-rainbow-components/components/Application';
import Routes from '../routes';
import './styles.css';


class App extends Component {

    render() {
        return (
            <Application>
                <div className="react-rainbow-admin-app_router-container">
                    <Routes />
                </div>
            </Application>
    );
    }
}

App.propTypes = {
};

export default App;