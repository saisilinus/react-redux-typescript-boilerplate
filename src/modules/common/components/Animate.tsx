import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

type Props = {
  children: React.ReactNode;
};

const Animate = ({ children }: Props) => {
  const [change, setChange] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setChange(true);
    }, 0);
  }, []);

  return (
    <CSSTransition nodeRef={nodeRef} in={change} timeout={500} classNames="fade">
      <div ref={nodeRef}>{children}</div>
    </CSSTransition>
  );
};

export default Animate;
