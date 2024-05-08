---
title: OWSelect
group:
  title: 基础功能组件
  path: /basicFun
nav:
  title: 组件
  path: /components
---

## OWSelect

Demo:

```tsx
import React from 'react';
import OWSelect from './index';
import { Flex } from 'antd';

export default () => {
  return (
    <Flex gap="small" wrap>
      <OWSelect
        defaultValue="lucy"
        style={{ width: 120 }}
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ]}
      />
      <OWSelect
        defaultValue="lucy"
        style={{ width: 120 }}
        disabled
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
      <OWSelect
        defaultValue="lucy"
        style={{ width: 120 }}
        loading
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
      <OWSelect
        defaultValue="lucy"
        style={{ width: 120 }}
        allowClear
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
    </Flex>
  );
};
```
