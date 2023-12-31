import React, { useState } from 'react';
import { Rate } from 'antd';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const UserRating = () => {
  const [value, setValue] = useState(0);
  return (
    <span>
      <Rate tooltips={desc} onChange={setValue} value={value} />
      {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
    </span>
  );
};
export default UserRating;
