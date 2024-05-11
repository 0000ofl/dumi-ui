/*
 * @Author: ofl
 * @Description:
 * @Date: 2024-05-09 09:01:22
 * @LastEditTime: 2024-05-11 09:19:44
 * @FilePath: \dumi-ui\src\components\OWTableSelect\index.tsx
 */
import { Select, Tooltip, TreeSelect } from 'antd';
import React, { useMemo } from 'react';

const OWTableSelect = ({
  treeMode,
  addonAfter,
  size,
  value,
  onChange,
  radioSrting = false,
  valueSeparator,
  ...props
}) => {
  // 计算实时value
  const realTimeValue = useMemo(() => {
    let myValue: any[] = value || [];
    if (value && typeof value === 'string') {
      const mySplitSign = value.includes('|') ? '|' : ',';
      myValue = radioSrting
        ? [value]
        : value.split(valueSeparator || mySplitSign);
    } else if (typeof value === 'number') {
      myValue = [value];
    }
    return myValue || [];
  }, [radioSrting, value, valueSeparator]);

  return (
    <div>
      <Tooltip>
        <div>
          {treeMode ? <TreeSelect /> : <Select value={value} {...props} />}
        </div>
      </Tooltip>
      {addonAfter ? (
        <div className={`addonAfter ${size || ''}`}>{addonAfter}</div>
      ) : null}
    </div>
  );
};

export default OWTableSelect;
