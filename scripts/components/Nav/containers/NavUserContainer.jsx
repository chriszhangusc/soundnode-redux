import { connect } from 'react-redux';
import { startLogin } from 'client/modules/user/actions';
import { getUid, getDisplayName, getPhotoUrl } from 'client/modules/reducers';
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
