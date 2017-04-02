import { PropTypes } from 'react';
import { NotificationContainer } from 'react-notifications';
import Player from 'client/components/Player';
import Nav from 'client/components/Nav';
import Sidebar from 'client/components/Sidebar';
import Playlist from 'client/components/Playlist';
import { notificationFailure, notificationSuccess } from 'client/redux/modules/notification';
import { connect } from 'react-redux';

// Main container of our app.
class App extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        window.addEventListener('offline', function(e) {
            dispatch(notificationFailure('Looks like your internet connection is down!'));
        });

        window.addEventListener('online', function(e) {
            dispatch(notificationSuccess('Great, you are back online!'));
        });

        const fetchUser = username => ({ type: 'FETCH_USER', payload: username });
        dispatch(fetchUser('MiniPekka'));
    }

    componentWillUmmount() {
        // Remove global listeners
        window.removeEventListener('offline');
        window.removeEventListener('online');
    }

// <Sidebar />
    render() {
        return (
            <div id="main-wrapper">
                <Nav />
                <Sidebar />
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                      <div className="row">

                          <div className="col-lg-12">
                              { this.props.children }
                          </div>
                          <Player />
                          <Playlist />
                      </div>
                    </div>
                </div>
                <NotificationContainer />
            </div>
      );
    }
}


App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default connect()(App);
