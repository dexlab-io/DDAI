import React, { Component } from 'react';
import Application from 'react-rainbow-components/components/Application';


class App extends Component {

    componentDidUpdate() {
    }

    render() {
        return (
            <Application>
                <div className="react-rainbow-admin-app_router-container">
                    {/*<Routes />*/}
                    Hello
                </div>
            </Application>
    );
    }
}

App.propTypes = {
};

export default App;