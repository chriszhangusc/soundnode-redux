import { connect } from 'react-redux';
import { startLogin } from 'client/redux/modules/user';
import { getUid, getDisplayName, getPhotoUrl } from 'client/redux/modules/reducers';
import NavUser from '../components/NavUser';

const mapStateToProps = state => ({
  uid: getUid(state),
  displayName: getDisplayName(state),
  photoUrl: getPhotoUrl(state)
});

const mapDispatchToProps = dispatch => ({
  handleLogin: () => {
    dispatch(startLogin());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavUser);
