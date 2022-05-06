import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { Badge, Nav, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Color } from 'react-bootstrap/esm/types';

type Props = {
  title: string;
  link: string;
  target?: string;
  icon?: IconDefinition;
  image?: string;
  badgeText?: string;
  badgeBg?: string;
  badgeColor?: Color;
  pathname: string;
};

const NavItem = ({ title, pathname, link, target, icon, image, badgeText, badgeBg, badgeColor = 'white' }: Props) => {
  const classNames = badgeText ? 'd-flex justify-content-between align-items-center' : '';
  const navItemClassName = link === pathname ? 'nav-item my-2 py-1 active rounded' : 'nav-item my-2 py-1 rounded';

  return (
    <Nav.Item className={navItemClassName}>
      <Nav.Link as={Link} to={link} target={target} className={classNames}>
        <span>
          {icon ? (
            <span className="sidebar-icon">
              <FontAwesomeIcon icon={icon} />{' '}
            </span>
          ) : null}
          {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

          <span className="sidebar-text">{title}</span>
        </span>
        {badgeText ? (
          <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count">
            {badgeText}
          </Badge>
        ) : null}
      </Nav.Link>
    </Nav.Item>
  );
};

export default NavItem;
