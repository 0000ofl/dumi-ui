---
nav:
  title: 组件
  path: /components
---

## Foo

Demo:

```tsx
import React from 'react';
import { Foo } from 'ow-ui';

export default () => <Foo title="First Demo" />;
```

## DumiBigCalendar

Demo:

```tsx
import React from 'react';
import BigCalendar from '../OflBigCalendar/index';
import '../OflBigCalendar/index.less'

export default () => {
  return (
    <div className="BigCalendar">
      <BigCalendar />
    </div>
  )
};
```

## DumiTable

Demo:

```tsx
import React from 'react';
import OflTable from '../OflTable/index'
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
    // <>
    //  <Upload multiple={true}>
    //   <Button icon={<UploadOutlined />}>Upload</Button>
    // </Upload>
    // </>
    <OflTable
      actionBar={actionBar}
      dataSource={dataSource}
      rowKey="id"
      columns={columns}
      // selectMode={false}
      // request={async () => {
      //   const res = await getAll();
      //   console.log(res?.data);

      //   return {
      //     success: true,
      //     data: res?.data,
      //   };
      // }}
    />
  );

};
```

Demo1:

```tsx
import React from 'react';
import OflTable from '../OflTable/index'
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

  const selectMode = {
    mode: 'radio'
  }

  const actionBar = [
    <Button>新增</Button>,
    <Button>修改</Button>,
    <Button>审核</Button>,
    <Button>反审核</Button>,
    <Button>导入</Button>,
    <Button>导出</Button>
  ]

  return (
    // <>
    //  <Upload multiple={true}>
    //   <Button icon={<UploadOutlined />}>Upload</Button>
    // </Upload>
    // </>
    <OflTable
      actionBar={actionBar}
      dataSource={dataSource}
      rowKey="id"
      columns={columns}
      selectMode={selectMode}
      // selectMode={false}
      // request={async () => {
      //   const res = await getAll();
      //   console.log(res?.data);

      //   return {
      //     success: true,
      //     data: res?.data,
      //   };
      // }}
    />
  );

};
```

Demo2:

```tsx
import React from 'react';
import OflTable from '../OflTable/index'

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
    { code: 'prov', name: '省份', width: 80, features: { sortable: true },lock: true },
    { code: 'confirmed', name: '确诊', width: 100, align: 'right' },
    { code: 'cured', name: '治愈', width: 100, align: 'right' },
    { code: 'dead', name: '死亡', width: 100, align: 'right' },
    {
      code: 't',
      name: '最后更新时间',
      width: 180,
      features: { tips: '我是指标的详细信息~~' },
    },
    {
      code: 'code',
      name: '操作',
      width: 100,
      lock: true
    },
  ];

  return (
    // <>
    //  <Upload multiple={true}>
    //   <Button icon={<UploadOutlined />}>Upload</Button>
    // </Upload>
    // </>
    <OflTable
      style={{ width: 500, height: 300, overflow: 'auto' }}
      dataSource={dataSource}
      rowKey="id"
      columns={columns}
      isActionBar={false}
      // selectMode={false}
      // request={async () => {
      //   const res = await getAll();
      //   console.log(res?.data);

      //   return {
      //     success: true,
      //     data: res?.data,
      //   };
      // }}
    />
  );

};
```

Demo3:

```tsx
import React, { useState } from 'react';
import OflTable from '../OflTable/index'
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
    { code: 'prov', name: '省份', width: 80, features: { sortable: true },lock: true },
    { code: 'confirmed', name: '确诊', width: 100, align: 'right' },
    { code: 'cured', name: '治愈', width: 100, align: 'right' },
    { code: 'dead', name: '死亡', width: 100, align: 'right' },
    {
      code: 't',
      name: '最后更新时间',
      width: 180,
      features: { tips: '我是指标的详细信息~~' },
    },
    {
      code: 'code',
      name: '操作',
      width: 100,
      lock: true
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

  const [lastClickRowIndex, setLastClickRowIndex] = useState<any>();

  const getRowProps = (record, rowIndex) => {
    return {
      style:
        rowIndex === lastClickRowIndex
          ? {
              outlineOffset: -2,
              outline: '2px solid gold',
              '--hover-bgcolor': 'transparent',
              background:
                'linear-gradient(140deg, #ff000038, #009cff3d)',
            }
          : {},
      onClick() {
        setLastClickRowIndex(rowIndex);
      },
    };
  }

  return (
    // <>
    //  <Upload multiple={true}>
    //   <Button icon={<UploadOutlined />}>Upload</Button>
    // </Upload>
    // </>
    <OflTable
      actionBar={actionBar}
      isSelectCheck={true}
      dataSource={dataSource}
      rowKey="id"
      columns={columns}
      columnResize
      getRowProps={getRowProps}
      style={{
        '--bgcolor': 'transparent',
      }}
      // selectMode={false}
      // request={async () => {
      //   const res = await getAll();
      //   console.log(res?.data);

      //   return {
      //     success: true,
      //     data: res?.data,
      //   };
      // }}
    />
  );
};
```

[更多技巧](https://d.umijs.org/guide/demo-principle)
