import React from 'react';

export default props => {
  let { pic } = props;
  return (
    <div className='problem-box logo grey-hover'>
      <img className='header-logo' src={`/assets/${pic}`} />
    </div>
  );
}