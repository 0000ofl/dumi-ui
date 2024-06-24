/*
 * @Author: ofl
 * @Description:
 * @Date: 2024-06-24 16:22:44
 * @LastEditTime: 2024-06-24 16:40:50
 * @FilePath: \dumi-ui\src\components\OWPageTable\demo\index.tsx
 */
import React from 'react';
import OWPageTable from '..';
import { Button } from 'antd';
import useModel from './states/DemoModels';
import useHandles from './handles/DemoHandles';

const DemoPage = () => {
    const model = useModel();
    const handles = useHandles(model);
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
    <Button>导出</Button>,
  ];

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

export default DemoPage;
