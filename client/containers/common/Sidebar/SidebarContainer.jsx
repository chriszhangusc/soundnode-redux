import React from 'react';
import { fetchSidebarData } from 'client/api/common/sidebar';
import Sidebar from './Sidebar';

class SidebarContainer extends React.Component {
  componentWillMount() {
    // Should be fetched from database, but keep it here for simplicity.
    const sidebarData = fetchSidebarData();
    this.setState({ sidebarData });
  }

  render() {
    return <Sidebar sidebarData={this.state.sidebarData} />;
  }
}

export default SidebarContainer;
