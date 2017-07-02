import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SidebarNavLink from './SidebarNavLink';

const ListItem = styled.li`
  line-height: 80px;
`;

const Icon = styled.i`
  font-size: 1rem;
  margin-right: 10px;
`;

const Title = styled.span``;

function SidebarItem({ to, iconClassName, title }) {
  return (
    <ListItem>
      <SidebarNavLink to={to}>
        <Icon className={iconClassName} />
        <Title>{title}</Title>
      </SidebarNavLink>
    </ListItem>
  );
}

SidebarItem.propTypes = {
  to: PropTypes.string.isRequired,
  iconClassName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SidebarItem;
