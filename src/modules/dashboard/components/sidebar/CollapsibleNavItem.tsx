import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Nav } from 'react-bootstrap';

type Props = {
  eventKey: string;
  title: string;
  icon: IconDefinition;
  children: React.ReactNode | null;
  pathname: string;
};

const CollapsibleNavItem = ({ eventKey, title, icon, pathname, children = null }: Props) => {
  const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : '';

  return (
    <Accordion as={Nav.Item} defaultActiveKey={defaultKey} className="my-2">
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Button as={Nav.Link} className="bg-dark">
          <span>
            <span className="sidebar-icon">
              <FontAwesomeIcon icon={icon} />{' '}
            </span>
            <span className="sidebar-text">{title}</span>
          </span>
        </Accordion.Button>
        <Accordion.Body className="bg-dark">
          <Nav className="flex-column">{children}</Nav>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CollapsibleNavItem;
