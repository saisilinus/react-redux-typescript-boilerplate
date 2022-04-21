import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

type Props = {
  hide: boolean;
};

const Loader = ({ hide }: Props) => (
  <div className={`loader ${hide ? 'hide' : ''}`}>
    <Spinner animation="grow" role="status" className="loader-element" />
  </div>
);

export default Loader;
