import { HOST } from 'client/constants/Config';

const NavHeader = () => (
  <div className="navbar-header">
    <a className="navbar-brand" href={HOST}>
      <span className="glyphicon glyphicon-headphones nav-icon" /><span>Redux Music</span>
    </a>
  </div>
);

export default NavHeader;
