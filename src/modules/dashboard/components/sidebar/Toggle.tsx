import React from 'react';

type Props = {
  onClick: () => void;
};

const Toggle = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      className="toggle p-0 d-md-none ml-3 btn btn-link btn-lg text-white force-left ms-3 mb-2"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false">
        <title>Menu</title>
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M4 7h22M4 15h22M4 23h22"
        />
      </svg>
    </button>
  );
};

export default Toggle;
