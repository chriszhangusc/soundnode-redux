import { connect } from 'react-redux';
import NavUser from '../components/NavUser';
import { startLogin } from '../actions/auth';
import { getUid, getDisplayName, getPhotoUrl } from '../reducers';

const mapStateToProps = state => ({
  uid: getUid(state),
  displayName: getDisplayName(state),
  photoUrl: getPhotoUrl(state)
});

const mapDispatchToProps = dispatch => ({
  handleLogin: () => {
    console.log('handleLogin()');
    dispatch(startLogin());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavUser);
