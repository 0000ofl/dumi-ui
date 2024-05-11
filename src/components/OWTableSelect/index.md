---
title: OWTableSelect
group:
  title: 基础功能组件
  path: /basicFun
nav:
  title: 组件
  path: /components
---

## OWTableSelect

Demo:

```tsx
import React from 'react';
import OWTableSelect from './index';
import { Flex } from 'antd';

export default () => {
  return (
    <Flex gap="small" wrap>
      <OWTableSelect
        defaultValue="lucy"
        style={{ width: 120 }}
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ]}
      />
      <OWTableSelect
        defaultValue="lucy"
        style={{ width: 120 }}
        disabled
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
      <OWTableSelect
        defaultValue="lucy"
        style={{ width: 120 }}
        loading
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
      <OWTableSelect
        defaultValue="lucy"
        style={{ width: 120 }}
        allowClear
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
    </Flex>
  );
};
```
