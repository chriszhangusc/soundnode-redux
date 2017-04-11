import { connect } from 'react-redux';
import { startLogin, getUserId, getDisplayName, getPhotoUrl } from 'client/redux/modules/user';
// import { auth } from 'client/redux/modules/auth';
import NavUser from '../components/NavUser';

const mapStateToProps = state => ({
  uid: getUserId(state),
  displayName: getDisplayName(state),
  photoUrl: getPhotoUrl(state),
});

const mapDispatchToProps = dispatch => ({
  handleLogin: () => {
    dispatch(startLogin());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavUser);
