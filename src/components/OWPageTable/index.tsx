/*
 * @Author: ofl
 * @Description:
 * @Date: 2024-06-24 09:51:35
 * @LastEditTime: 2024-06-24 16:20:58
 * @FilePath: \dumi-ui\src\components\OWPageTable\index.tsx
 */
import React, { useState } from 'react';
import OflTable from '../OflTable';
import { Pagination } from 'antd';

const OWPageTable = ({
  model,
  handles,
  customSearchReset,
  searchColumns,
  searchItems,
  searchConfig,
  toolbar,
  columns,
  checkedStrategy = 'all',
  searchButtonRender,
  headRender,
  defaultShowIndex = true,
  searchRender,
  tabsRender,
  bodyRender,
  footerRender,
  expandedAllRows = false,
  toolBarsUpKey,
  tableProps = {},
  autoQuery = false,
  polling,
  contextmenus,
  searchInitialValues,
  children,
  autoChangeDetail = true,
  autoDobuleClickDetail = true,
  filterDataSource,
  settingColumns = true,
  valueTypes,
  actionBar: defaultActionBar,
  showLoadingTime = true,
  simpleMode = false,
  showEmptyComponent = true,
  hideActionColumns,
  defaultGroupKey = '',
  batchButtons: defaultBatchButtons = [],
  searchTabProps,
  groupedDataSourceHandle,
  customEmptyComponentQueryState = false,
  formDataSteetingInfo,
  ...otherProps
}) => {
  // const [dataSource, setDataSource] = useState([]);
  const {
    selectedRowKeys,
    setSelectedRowKeys,
    pageInfo,
    rowKey,
    dataSource,
    tableLoading,
    searchFormRef,
    searchFormLoading,
    expandedRowKeys,
    setExpandedRowKeys,
    settingVisible,
    setSettingVisible,
    setRelationMenuVisible,
    relationMenuVisible,
    relationMenu,
    titleTranslate,
  } = model;

  return (
    <div>
      <div>search</div>
      <OflTable {...otherProps} />
      {pageInfo && (
        <div>
          <Pagination
            // total={85}
            showSizeChanger
            showQuickJumper
            // showTotal={total => `Total ${total} items`}
            style={{ height: 22, lineHeight: '20px', paddingRight: 16 }}
            size="small"
            pageSizeOptions={[
              '10',
              '20',
              '50',
              '100',
              '200',
              '500',
              '1000',
              '2000',
            ]}
            defaultPageSize={100}
            pageSize={pageInfo.pageSize}
            defaultCurrent={pageInfo.currentPage}
            total={pageInfo.totalCount}
            showTotal={total => `共 ${total} 条`}
            current={pageInfo.currentPage}
            onChange={(...arg) => {
              handles.changePage(...arg);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OWPageTable;
