import { treeForEach } from '../../utils/data';
import { DownOutlined, FilterFilled } from '@ant-design/icons';
import {
  BaseTable,
  LoadingContentWrapperProps,
  features,
  useTablePipeline,
} from 'ali-react-table';
import {
  Button,
  Checkbox,
  ConfigProvider,
  Dropdown,
  Empty,
  Input,
  Menu,
  MenuProps,
  Popover,
  Radio,
  Select,
  Space,
  Spin,
  Tooltip,
  Tree,
} from 'antd';
import React, { useContext, useState } from 'react';
import OflIcon from '../OflIcon';
import GlobalDndContext from './HTML5Backend';
import select from './select';
import './index.less';

function BlockSpin() {
  return <Spin style={{ display: 'block' }} />;
}

const AntEmptyContent = React.memo(() => (
  <>
    <Empty
      imageStyle={{
        height: 'auto',
      }}
      image={
        <div
          style={{ fontSize: '120px', display: 'inline-block', lineHeight: 1 }}
        >
          <OflIcon type="noData" />
        </div>
      }
      description="暂无数据"
    />
  </>
));

function AntLoadingContentWrapper({
  children,
  visible,
}: LoadingContentWrapperProps) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  // const antdPrefix = getPrefixCls();
  return (
    <div
      // className={`${antdPrefix}-loading-content-wrapper`}
      style={{
        opacity: visible ? 0.2 : undefined,
        filter: visible ? 'blur(3px)' : undefined,
      }}
    >
      {children}
    </div>
  );
}

const OflBaseTable = (props: any, ref: any) => {
  const {
    rowKey = 'id',
    selectMode,
    bordered = true,
    borderedLine = false,
    columns: defaultColumns,
    dataSource: defaultDataSource,
    columnResize,
    isStickyHeader = true, //吸顶
    isActionBar = true,
    actionBar,
    // dataSourceHash,
    // className,
    // noBorderBottom,
    // className = 'compact',
    size = 'large', // 表格模式
    useVirtual = { horizontal: defaultColumns?.length > 10, vertical: 'auto' },
    useOuterBorder = true,
    defaultColumnWidth,
    estimatedRowHeight = 28,
    // loading,
    getRowProps = false,
    treeMode,
    isSelectCheck = false,
    // sortMode,
    // currentRecord,
    // selectedRowKeys,
    // expandedRowKeys,
    // featuresOptions,
    dragColumnWidth = true,
    // onChangeSelectedKeys,
    // onDataChange,
    useEdit = false,
    components = {},
    // valueTypes = {},
    useFrameSelection: propsUseFrameSelection = false,
    // onFrameSelectionsChange,
    // checkboxDisabled,
    // isShowReversCheck,
    // sortHeader,
    // borderedHeader,
    // filterMode,
    // filteredDataCountCallback,
    // switcherIcon,
    contentWidth,
    // upDownKeyFun,
    ...tableProps
  } = props;
  console.log(props, defaultColumns, defaultDataSource, '11111111111111111111');
  // 表格过滤
  // const [columns, dataSource] = useAmsTableFilter(
  //   defaultColumns,
  //   defaultDataSource,
  //   filterMode,
  //   (node) => {
  //     return artTableWrapRef?.current || document.body;
  //   },
  // );

  const dataSource = defaultDataSource;
  const columns = defaultColumns;

  const primaryKey = rowKey;

  const pipeline = useTablePipeline({
    components: {
      Checkbox,
      Radio,
      Button,
      Input,
      Select,
      FilterFilled,
      // QuarkSelect,
      Tooltip,
      Popover,
      Tree,
    },
  });

  pipeline.ctx.indents = {
    ...pipeline.ctx.indents,
    iconIndent: 0,
  };

  // 主键
  pipeline.primaryKey(rowKey);

  // 表格数据与列头结构
  pipeline.input({
    dataSource,
    columns,
  });

  // 排序
  pipeline.use(
    features.sort({
      mode: 'single',
      highlightColumnWhenActive: true,
    }),
  );

  // 启动树形同时开启树形选择
  if (selectMode?.treeMode) {
    pipeline.use(
      features.treeMode({
        clickArea: 'cell',
      }),
    );
  }

  // // 行列滑上高亮
  // pipeline.use(features.columnHover());

  // 提示信息
  pipeline.use(features.tips());

  // 拖拽调整列宽
  if (columnResize) {
    pipeline.use(
      features.columnResize({
        fallbackSize: 120,
        handleBackground: '#ddd',
        handleHoverBackground: '#aaa',
        handleActiveBackground: '#89bff7',
      }),
    );
  }

  // 自动合并多行
  if (props.useAutoRowSpan) {
    pipeline.use(features.autoRowSpan());
  }

  // 勾选框
  if (selectMode && selectMode?.mode) {
    pipeline.use(
      select({
        mode: selectMode?.mode,
        treeMode: selectMode?.treeMode || false,
        dataSource,
        isSelectCheck,
        columns,
      }) as any,
    );
  }

  const pipelineProps = pipeline.getProps();
  let customComponet = {} as Record<string, any>;

  let maxWidth: undefined | number = 8;

  treeForEach({
    source: pipelineProps.columns,
    handler: (col: any) => {
      if (!!col.children) {
        return;
      }
      maxWidth += col.width || 0;
    },
  });

  if (contentWidth && contentWidth < maxWidth) {
    maxWidth = undefined;
  }

  if (
    props.repeatWidth === undefined ||
    props.repeatWidth ||
    props.hasHeader === false ||
    columns.length === 0
  ) {
    maxWidth = undefined;
  }

  // const [lastClickRowIndex, setLastClickRowIndex] = useState<any>();

  return (
    <GlobalDndContext>
      {/* <div style={{ height: '100%', overflow: 'auto' }}> */}
      {isActionBar ? (
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: 48,
            border: '1px solid #ccc',
            zIndex: 30,
            background: 'var(--ifm-background-surface-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            paddingRight: '16px',
          }}
        >
          <div className="buttonAll">
            {/* <Button>重置</Button>
            <Button type="primary">查询</Button> */}
            {actionBar}
          </div>
        </div>
      ) : null}

      <BaseTable
        isStickyHeader={isStickyHeader}
        stickyTop={0}
        // className={`BaseTable`}
        primaryKey={primaryKey}
        isLoading={false}
        stickyScrollHeight={Number(8) + 8}
        useVirtual={{ horizontal: true, vertical: 'auto' }}
        components={{
          EmptyContent: AntEmptyContent,
          LoadingContentWrapper: AntLoadingContentWrapper,
          LoadingIcon: BlockSpin,
          ...components,
          ...customComponet,
        }}
        {...tableProps}
        {...pipelineProps}
        // getRowProps={
        //   getRowProps === false || getRowProps
        //     ? getRowProps
        //     : (record, rowIndex) => {
        //         return {
        //           style:
        //             rowIndex === lastClickRowIndex
        //               ? {
        //                   outlineOffset: -2,
        //                   outline: '2px solid gold',
        //                   '--hover-bgcolor': 'transparent',
        //                   background:
        //                     'linear-gradient(140deg, #ff000038, #009cff3d)',
        //                 }
        //               : {},
        //           onClick() {
        //             setLastClickRowIndex(rowIndex);
        //           },
        //         };
        //       }
        // }
        getRowProps={getRowProps ? getRowProps : () => {}}
        style={{
          maxWidth,
          minHeight: '100%',
          ...tableProps?.style,
        }}
        useOuterBorder
      />
      {/* </div> */}
    </GlobalDndContext>
  );
};

export default OflBaseTable;
