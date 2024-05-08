/*
 * @Author: ofl
 * @Description:
 * @Date: 2024-01-04 16:21:04
 * @LastEditTime: 2024-02-02 11:40:56
 * @FilePath: \dumi-template\src\OflIcon\index.tsx
 */
import { createFromIconfontCN } from '@ant-design/icons';
import type { IconBaseProps } from '@ant-design/icons/es/components/Icon';
import React from 'react';

const scriptUrl = window.QUARK_ICON_SCRIPT_URL ?? `https://cdn3.codesign.qq.com/icons/XgRxnjPPmkjLmqr/latest/iconfont.js?t=${new Date().getTime()}`;

const OflIcon = createFromIconfontCN({
  scriptUrl: window.QUARK_HAS_LOCAL_ICON ? undefined : scriptUrl,
});

export default ({
  type = '',
  ...props
}: IconBaseProps) => {
  return (
    <OflIcon type={`${type}`} data-tips={`${type}`} {...props}  />
  );
};

export const jsonUrl = '//at.alicdn.com/t/font_1935092_e6cmzdazobo.js'.replace('.js', '.json');

export const getIconTypes = () => {
  const iconSymbols = document.querySelectorAll('symbol');
  return [...iconSymbols].map(item => {
    if (item.id) {
      return item.id;
    }
    return null;
  }).filter(item => !!item);
};
