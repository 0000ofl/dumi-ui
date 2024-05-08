/*
 * @Author: ofl
 * @Description:
 * @Date: 2024-01-06 15:08:05
 * @LastEditTime: 2024-02-01 17:50:03
 * @FilePath: \dumi-template\src\OflTable\select.tsx
 */
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { features } from 'ali-react-table';
import { Checkbox, Dropdown, MenuProps, Space } from 'antd';
import React, { useState } from 'react';

export function select(props: any) {
  const {
    mode = false,
    treeMode = false,
    dataSource = [],
    isSelectCheck,
    columns,
  } = props;
  const [value, onChange] = useState<any>([]);
 const [onIcon, setOnIcon] = useState<any>([<DownOutlined />]);
  const allKeys = dataSource.map((row: { [key: string]: any }) => row.id);
  const isAllChecked = value.length === allKeys.length;
  const isAnyChecked = value.length > 0;

  console.log(
    dataSource,allKeys,
    value,
    isAllChecked,
    isAnyChecked,
    'allKeysallKeys',
  );

  const items: MenuProps['items'] = [
    {
      key: 'all',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.antgroup.com"
          onClick={() => onChange(allKeys)}
        >
          全选
        </a>
      ),
    },
    {
      key: 'kong',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.antgroup.com"
          onClick={() => onChange([])}
        >
          清空
        </a>
      ),
    },
    {
      key: 'other',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.antgroup.com"
          onClick={() =>
            onChange(allKeys.filter((key: string) => !value.includes(key)))
          }
        >
          反选
        </a>
      ),
    },
    {
      key: 'select',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.antgroup.com"
          onClick={() => onChange(allKeys.filter(() => Math.random() < 0.4))}
        >
          随机选择
        </a>
      ),
    },
  ];

  const title = (
    <>
      <Checkbox
        checked={isAllChecked}
        indeterminate={!isAllChecked && isAnyChecked}
        onChange={() => {
          onChange(isAllChecked ? [] : allKeys);
        }}
      />
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        onOpenChange={o => {
          if (o) {
            setOnIcon([<UpOutlined />]);
          } else {
            setOnIcon([<DownOutlined />]);
          }
        }}
      >
        <a onClick={e => e.preventDefault()}>
          <Space>{onIcon}</Space>
        </a>
      </Dropdown>
      {/* <MenuButton size='smaill' text>
        <Menu.Item onClick={() => onChange(allKeys)}>全选</Menu.Item>
        <Menu.Item onClick={() => onChange([])}>清空</Menu.Item>
        <Menu.Item
          onClick={() =>
            onChange(allKeys.filter((key: string) => !value.includes(key)))
          }
        >
          反选
        </Menu.Item>
        <Menu.Item
          onClick={() => onChange(allKeys.filter(() => Math.random() < 0.4))}
        >
          随机选择
        </Menu.Item>
      </MenuButton> */}
    </>
  );

  if (treeMode) {
    if (mode === 'checkbox') {
      return features.treeSelect({
        tree: dataSource,
        rootKey: 'root',
        checkboxPlacement: 'start',
        clickArea: 'cell',
        // defaultValue: ['1', '3'],
        checkboxColumn: { lock: true },
        highlightRowWhenSelected: true,
      });
    }
  } else {
    if (mode === 'checkbox') {
      if (isSelectCheck) {
        return features.multiSelect({
          value,
          onChange,
          // clickArea: 'row',
          checkboxColumn: {
            lock: true,
            width: columns?.[0]?.width ?? 60,
            title,
          },
          highlightRowWhenSelected: true,
          // defaultValue: ['1', '2'],
          // defaultLastKey: '1',
          checkboxPlacement: 'start',
          clickArea: 'cell',
        });
      } else {
        return features.multiSelect({
          highlightRowWhenSelected: true,
          // defaultValue: ['1', '2'],
          // defaultLastKey: '1',
          checkboxPlacement: 'start',
          checkboxColumn: { lock: true },
          clickArea: 'cell',
        });
      }
    }
    if (mode === 'radio') {
      return features.singleSelect({
        // defaultValue: '1',
        highlightRowWhenSelected: true,
        clickArea: 'row',
      });
    }
  }
}

export default select;
