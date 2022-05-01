import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

type Props = {
  show?: boolean;
};

const Loader = ({ show }: Props) => (
  <div className={`loader ${show ? '' : 'hide'}`}>
    <Spinner animation="grow" role="status" className="loader-element" />
  </div>
);

export default Loader;
