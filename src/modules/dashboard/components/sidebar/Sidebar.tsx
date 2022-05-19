import { faHome, faCog, faUser, faPlus, faList, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Nav, Collapse } from 'react-bootstrap';
import routes from '../../../common/routing/routes';
import NavItem from './NavItem';
import CollapsibleNavItem from './CollapsibleNavItem';
import Toggle from './Toggle';
import restrictions from '../../../common/routing/restrictions';

const Sidebar = () => {
  const [open, setOpen] = useState(!isMobile);
  const location = useLocation();

  const handleToggle = () => setOpen(!open);

  return (
    <div className="bg-dark wrapper">
      <Toggle onClick={handleToggle} />
      <Collapse in={open}>
        <Nav className="flex-column navbar w-100 text-white p-3" defaultActiveKey={routes.Dashboard.absolutePath}>
          <NavItem title="Home" link={routes.Home.absolutePath} pathname={location.pathname} icon={faExternalLinkAlt} />
          <NavItem title="Overview" link={routes.Dashboard.absolutePath} pathname={location.pathname} icon={faHome} />
          <NavItem title="Profile" link={routes.Profile.absolutePath} pathname={location.pathname} icon={faCog} />
          <CollapsibleNavItem
            title="Users"
            eventKey="dashboard-users"
            pathname={location.pathname}
            icon={faUser}
            restrictedTo={restrictions.admin}
          >
            <NavItem
              title="Add New"
              link={routes.NewUser.absolutePath}
              pathname={location.pathname}
              icon={faPlus}
              restrictedTo={restrictions.admin}
            />
            <NavItem
              title="List"
              link={routes.UserList.absolutePath}
              pathname={location.pathname}
              icon={faList}
              restrictedTo={restrictions.admin}
            />
          </CollapsibleNavItem>
        </Nav>
      </Collapse>
    </div>
  );
};

export default Sidebar;
