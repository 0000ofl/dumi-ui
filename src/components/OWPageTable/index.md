---
title: OWPageTable
group:
  title: 基础功能组件
  path: /basicFun
nav:
  title: 组件
  path: /components
---

## OWPageTable

Demo:

```tsx
import React from 'react';
import OWPageTable from './index';
import { Button } from 'antd';

export default () => {
  const dataSource = [
    {
      prov: '湖北省',
      confirmed: 54406,
      cured: 4793,
      dead: 1457,
      t: '2020-02-15 19:52:02',
      id: '1',
    },
    {
      prov: '广东省',
      confirmed: 1294,
      cured: 409,
      dead: 2,
      t: '2020-02-15 19:52:02',
      id: '2',
    },
    {
      prov: '河南省',
      confirmed: 1212,
      cured: 390,
      dead: 13,
      t: '2020-02-15 19:52:02',
      id: '3',
    },
    {
      prov: '浙江省',
      confirmed: 1162,
      cured: 428,
      dead: 0,
      t: '2020-02-15 19:52:02',
      id: '4',
    },
    {
      prov: '湖南省',
      confirmed: 1001,
      cured: 417,
      dead: 2,
      t: '2020-02-15 19:52:02',
      id: '5',
    },
  ];

  const columns = [
    { code: 'prov', name: '省份', width: 150, features: { sortable: true } },
    { code: 'confirmed', name: '确诊', width: 100, align: 'right' },
    { code: 'cured', name: '治愈', width: 100, align: 'right' },
    { code: 'dead', name: '死亡', width: 100, align: 'right' },
    {
      code: 't',
      name: '最后更新时间',
      width: 180,
      features: { tips: '我是指标的详细信息~~' },
    },
  ];

  const actionBar = [
    <Button>新增</Button>,
    <Button>修改</Button>,
    <Button>审核</Button>,
    <Button>反审核</Button>,
    <Button>导入</Button>,
    <Button>导出</Button>
  ]

  return (
    <OWPageTable
      model
      handles
      actionBar={actionBar}
      dataSource={dataSource}
      rowKey="id"
      columns={columns}
    />
  );
};
```
