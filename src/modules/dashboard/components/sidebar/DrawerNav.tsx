import 'react-bootstrap-drawer/lib/style.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Drawer } from 'react-bootstrap-drawer';
import { Collapse } from 'react-bootstrap';
import { faCog, faExternalLinkAlt, faHome, faList, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavItem from './NavItem';

import routes from '../../../routing/routes';
import CollapsibleNavItem from './CollapsibleNavItem';

const DrawerNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Drawer className="full-height-drawer bg-dark drawer-sidebar">
      <Drawer.Toggle onClick={handleToggle} className="text-white force-left ms-3" />
      <Collapse in={open}>
        <Drawer.Overflow>
          <Drawer.ToC className="ps-3">
            <Drawer.Header href="/" className="text-white mb-3">
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={faExternalLinkAlt} />{' '}
              </span>
              <span className="sidebar-text">Home</span>
            </Drawer.Header>

            <Drawer.Nav>
              <NavItem title="Overview" link={routes.Dashboard.absolutePath} pathname={location.pathname} icon={faHome} />
              <NavItem title="Profile" link={routes.Profile.absolutePath} pathname={location.pathname} icon={faCog} />
              <CollapsibleNavItem title="Users" eventKey="dashboard-users" pathname={location.pathname} icon={faUser}>
                <NavItem title="Add New" link={routes.NewUser.absolutePath} pathname={location.pathname} icon={faPlus} />
                <NavItem title="List" link={routes.UserList.absolutePath} pathname={location.pathname} icon={faList} />
              </CollapsibleNavItem>
            </Drawer.Nav>
          </Drawer.ToC>
        </Drawer.Overflow>
      </Collapse>
    </Drawer>
  );
};

export default DrawerNav;
