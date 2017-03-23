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
    }

    render() {
      return (
          <div>
              <Nav />
              <div className="container-fluid">
                  <div className="row">
                  <div className="col-sm-2 sidebar">
                    <Sidebar />
                  </div>
                  <div className="col-sm-8 col-sm-offset-2">
                    { this.props.children }
                  </div>
                  <Player />
                  <Playlist />
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
