import { connect } from 'react-redux';
import NavUser from '../components/NavUser';
import { startLogin } from '../../../modules/user/actions';
import { getUid, getDisplayName, getPhotoUrl } from '../../../modules/reducers';

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
