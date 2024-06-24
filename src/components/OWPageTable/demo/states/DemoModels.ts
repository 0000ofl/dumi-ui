/*
 * @Author: ofl
 * @Description:
 * @Date: 2024-06-24 16:25:23
 * @LastEditTime: 2024-06-24 16:25:48
 * @FilePath: \dumi-ui\src\components\OWPageTable\demo\states\DemoModels.ts
 */
import { Form } from 'antd';

export const funCode = 'QuarkUI';
export default function useModel() {
  const state = {
    rowKey: 'id',
    detailFormRef: Form.useForm()[0],
    funCode,
    pageInfo: false,
    tabsInfo: {
      tabs: [
        {
          key: 'null',
          tab: '全部',
        },
        {
          key: 0,
          tab: '中国',
        },
        {
          key: 1,
          tab: '美国',
        },
        {
          key: 2,
          tab: '俄罗斯',
        },
        {
          key: 3,
          tab: '乌克兰',
        },
        {
          key: 4,
          tab: '韩国',
        },
        {
          key: 5,
          tab: '日本',
        },
      ],
      fieldName: 'params.country',
      activeKey: 'null',
    },
    titleTranslate: {
      export: {
        fileName:
          '[组合代码]\r[资产代码]\r[组合名称]\r[组合简称]\r[协会代码]\r[日期]\r[YYYY年MM月DD日]\r[管理人名称]\r[资产类型]\r',
        mainTitle:
          '[组合代码]\r[资产代码]\r[组合名称]\r[组合简称]\r[协会代码]\r[日期]\r[YYYY年MM月DD日]\r[管理人名称]\r[资产类型]\r',
        subTitle:
          '[组合代码]\r[资产代码]\r[组合名称]\r[组合简称]\r[协会代码]\r[日期]\r[YYYY年MM月DD日]\r[管理人名称]\r[资产类型]\r',
      },
      print: {
        mainTitle:
          '[组合代码]\r[资产代码]\r[组合名称]\r[组合简称]\r[协会代码]\r[日期]\r[YYYY年MM月DD日]\r[管理人名称]\r[资产类型]\r',
        subTitle:
          '[组合代码]\r[资产代码]\r[组合名称]\r[组合简称]\r[协会代码]\r[日期]\r[YYYY年MM月DD日]\r[管理人名称]\r[资产类型]\r',
      },
    },
  };
  return useBaseModel({
    state,
  });
}
