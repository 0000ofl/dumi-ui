import { Button } from 'antd';
import React from 'react';

const OWButton = (props: { [key: string]: any }) => {
  return <Button {...props}>{props?.text ?? '测试按钮'}</Button>;
};

export default OWButton;
