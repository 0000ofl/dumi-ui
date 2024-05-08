---
title: OWButton
group:
  title: 基础功能组件
  path: /basicFun
nav:
  title: 组件
  path: /components
---

## OWButton

Demo:

```tsx
import React from 'react';
import OWButton from './index';
import { Flex } from 'antd';

export default () => {
  return (
  <Flex gap="small" wrap>
    <OWButton text='Primary Button' type="primary"/>
    <OWButton text='Default Button'/>
    <OWButton text='Dashed Button' type="dashed"/>
    <OWButton text='Text Button' type="text"/>
    <OWButton text='Link Button' type="link"/>
  </Flex>
  )
};
```
