/*
 * @Author: ofl
 * @Description:
 * @Date: 2024-02-01 14:29:01
 * @LastEditTime: 2024-02-02 09:51:16
 * @FilePath: \dumi-template\src\OflTable\index.tsx
 */
import { Dropdown } from 'antd';
import { useRef, useState } from 'react';
import OflBaseTable from './oflBaseTable';
import React from 'react';

const OflTable = (
  {
    filter,
    dataSource = [],
    columns = [],
    defaultColumnWidth = 120,
    headContextMenu,
    rowContextMenu: defaultRowContextMenu,
    size,
    getRowProps,
    changeSelectedRows: propsChangeSelectedRows,
    onSelectedKeys,
    selectMode = { mode: 'checkbox', selectType: 'treeSelect' },
    checkedStrategy = 'all',
    expandedAllRows = true,
    dataSourceHash,
    // isScrollToBottom,
    checkboxDisabled = false,
    hasSelctedCountDom = false,
    selectdCuntCheck,
    onSelectdCuntCheckChange,
    customFooterDom,
    total,
    currentRow,
    setCurrentRow,
    selectedRowKeys: propsSelectedRowKeys,
    returnSelectedRows = true,
    isShowReversCheck = false,
    shortCutsHandles,
    useVirtual,
    filterMode = false,
    isAudit: defaultIsAudit,
    treeModeIconType = 'arrow',
    hasFootterSlectedAll = false,
    hasFootterReversSlect = false,
    actionBar,
    filteredDataCountCallback,
    fromPane = false,
    tableTootipsInfo,
    columnResize = false,
    treeMode=false,
    ...props
  }: any,
  ref: any,
) => {
  /**
   * 监听表格滚动
   *
   * @param {*} e
   */
  const onTableScroll = (e: any) => {
    props.onTableScroll?.(e);
  };

  // 当前右键的区域
  const [contextMenuArea, setContextMenuArea] = useState('body');
  // // 表头右键菜单
  // const headContextMenuNode = useMemo(() => {
  //   if (
  //     contextMenuCell &&
  //     headContextMenu &&
  //     typeof headContextMenu !== 'function' &&
  //     headContextMenu?.length > 0
  //   ) {
  //     return (
  //       <Menu
  //         onContextMenu={(e) => {
  //           e.preventDefault();
  //         }}
  //       >
  //         {creatQuarkTreeMenuNode(headContextMenu, contextMenuCell, quarkPrefix)}
  //       </Menu>
  //     );
  //   }
  //   return <></>;
  // }, [contextMenuCell, headContextMenu]);
  // 底部全选
  const footerSelectedContentRef = useRef<HTMLDivElement | null>(null);
  const footerSelectedDom = (
    <div style={{ paddingLeft: '8px' }} ref={footerSelectedContentRef} />
  );
  // 底部反选
  const footerReversSelectContentRef = useRef<HTMLDivElement | null>(null);
  const footerReversSelectDom = (
    <div
      className={`footerReversSelectDom`}
      ref={footerReversSelectContentRef}
    />
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        transform: 'scale(1)',
        // ...props.style,
      }}
      tabIndex={-1}
    >
      <Dropdown
        transitionName=""
        overlay={() => {
          return <></>;
        }}
        // trigger={
        //   rowContextMenu || extralContenxtMenu.length || headContextMenu ? ['contextMenu'] : []
        // }
        // onVisibleChange={(visible) => {
        //   if (!visible) {
        //     setContextMenuArea('body');
        //     setContextMenuRow(null);
        //   }
        // }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflow: 'hidden',
            width: '100%',
            flex: 'auto',
            height: '100%',
          }}
          onContextMenu={e => {
            e.stopPropagation();
          }}
          // className={`${custPrefix}`}
          onScroll={(...arg) => {
            onTableScroll?.(...arg);
          }}
        >
          <OflBaseTable
            {...props}
            actionBar={actionBar}
            getRowProps={getRowProps}
            dataSource={dataSource}
            columns={columns}
            columnResize={columnResize}
            treeMode={treeMode}
            selectMode={
              selectMode
                ? {
                    mode: 'checkbox',
                    selectType: 'treeSelect',
                    cloneSlectedAllto: () => {
                      return footerSelectedContentRef.current;
                    },
                    cloneReversSlectto: () => {
                      return footerReversSelectContentRef.current;
                    },
                    ...selectMode,
                    checkedStrategy,
                  }
                : undefined
            }
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default OflTable;
