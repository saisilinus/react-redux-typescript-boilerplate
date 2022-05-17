import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

type Props = {
  children: React.ReactNode;
  inProp?: boolean;
};

const Animate = ({ children, inProp }: Props) => {
  const [change, setChange] = useState(false);

  if (!inProp) {
    setTimeout(() => {
      setChange(true);
    }, 0);
  }
  return (
    <CSSTransition in={inProp ?? change} timeout={500} classNames="fade">
      {children}
    </CSSTransition>
  );
};

export default Animate;
