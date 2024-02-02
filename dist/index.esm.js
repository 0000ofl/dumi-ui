import React, { useState, useContext, useRef } from 'react';
import { Checkbox, Dropdown, Space, Radio, Button, Input, Select, Tooltip, Popover, Tree, Spin, Empty, ConfigProvider } from 'antd';
import { createFromIconfontCN, DownOutlined, UpOutlined, FilterFilled } from '@ant-design/icons';
import { features, useTablePipeline, BaseTable } from 'ali-react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

var index = (function (_ref) {
  var title = _ref.title;
  return /*#__PURE__*/React.createElement("h1", null, title);
});

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/*
 * @Author: ofl
 * @Description:
 * @Date: 2023-12-20 15:47:20
 * @LastEditTime: 2024-02-02 11:42:02
 * @FilePath: \dumi-template\src\utils\data.ts
 */
/**
 * @description 遍历树
 * @title 遍历树`
 * @export false
 */
function treeForEach(_ref) {
  var handler = _ref.handler,
    _ref$source = _ref.source,
    source = _ref$source === void 0 ? [] : _ref$source,
    _ref$deep = _ref.deep,
    deep = _ref$deep === void 0 ? 0 : _ref$deep,
    _ref$parent = _ref.parent,
    parent = _ref$parent === void 0 ? null : _ref$parent;
  source.forEach(function (item, index) {
    handler(item, index, deep, parent);
    if (item.children) {
      treeForEach({
        source: item.children,
        handler: handler,
        deep: deep + 1,
        parent: item
      });
    }
  });
}

var _excluded = ["type"];
var _window$QUARK_ICON_SC;
var scriptUrl = (_window$QUARK_ICON_SC = window.QUARK_ICON_SCRIPT_URL) !== null && _window$QUARK_ICON_SC !== void 0 ? _window$QUARK_ICON_SC : "https://cdn3.codesign.qq.com/icons/XgRxnjPPmkjLmqr/latest/iconfont.js?t=".concat(new Date().getTime());
var OflIcon = createFromIconfontCN({
  scriptUrl: window.QUARK_HAS_LOCAL_ICON ? undefined : scriptUrl
});
var OflIcon$1 = (function (_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? '' : _ref$type,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(OflIcon, _objectSpread2({
    type: "".concat(type),
    "data-tips": "".concat(type)
  }, props));
});
var jsonUrl = '//at.alicdn.com/t/font_1935092_e6cmzdazobo.js'.replace('.js', '.json');

/* eslint-disable no-underscore-dangle */
var cacheGlobal = global || globalThis || window;
var GlobalDndContext = /*#__PURE__*/React.memo(function (_ref) {
  var _ref$useDnd = _ref.useDnd,
    useDnd = _ref$useDnd === void 0 ? true : _ref$useDnd,
    children = _ref.children;
  if (useDnd) {
    return /*#__PURE__*/React.createElement(DndProvider, {
      key: 1,
      context: cacheGlobal,
      backend: HTML5Backend
    }, children);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
});

function select(props) {
  var _props$mode = props.mode,
    mode = _props$mode === void 0 ? false : _props$mode,
    _props$treeMode = props.treeMode,
    treeMode = _props$treeMode === void 0 ? false : _props$treeMode,
    _props$dataSource = props.dataSource,
    dataSource = _props$dataSource === void 0 ? [] : _props$dataSource,
    isSelectCheck = props.isSelectCheck,
    columns = props.columns;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    _onChange = _useState2[1];
  var _useState3 = useState([/*#__PURE__*/React.createElement(DownOutlined, null)]),
    _useState4 = _slicedToArray(_useState3, 2),
    onIcon = _useState4[0],
    setOnIcon = _useState4[1];
  var allKeys = dataSource.map(function (row) {
    return row.id;
  });
  var isAllChecked = value.length === allKeys.length;
  var isAnyChecked = value.length > 0;
  console.log(dataSource, allKeys, value, isAllChecked, isAnyChecked, 'allKeysallKeys');
  var items = [{
    key: 'all',
    label: ( /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      // href="https://www.antgroup.com"
      onClick: function onClick() {
        return _onChange(allKeys);
      }
    }, "\u5168\u9009"))
  }, {
    key: 'kong',
    label: ( /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      // href="https://www.antgroup.com"
      onClick: function onClick() {
        return _onChange([]);
      }
    }, "\u6E05\u7A7A"))
  }, {
    key: 'other',
    label: ( /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      // href="https://www.antgroup.com"
      onClick: function onClick() {
        return _onChange(allKeys.filter(function (key) {
          return !value.includes(key);
        }));
      }
    }, "\u53CD\u9009"))
  }, {
    key: 'select',
    label: ( /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      // href="https://www.antgroup.com"
      onClick: function onClick() {
        return _onChange(allKeys.filter(function () {
          return Math.random() < 0.4;
        }));
      }
    }, "\u968F\u673A\u9009\u62E9"))
  }];
  var title = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Checkbox, {
    checked: isAllChecked,
    indeterminate: !isAllChecked && isAnyChecked,
    onChange: function onChange() {
      _onChange(isAllChecked ? [] : allKeys);
    }
  }), /*#__PURE__*/React.createElement(Dropdown, {
    menu: {
      items: items
    },
    trigger: ['click'],
    onOpenChange: function onOpenChange(o) {
      if (o) {
        setOnIcon([/*#__PURE__*/React.createElement(UpOutlined, null)]);
      } else {
        setOnIcon([/*#__PURE__*/React.createElement(DownOutlined, null)]);
      }
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: function onClick(e) {
      return e.preventDefault();
    }
  }, /*#__PURE__*/React.createElement(Space, null, onIcon))));
  if (treeMode) {
    if (mode === 'checkbox') {
      return features.treeSelect({
        tree: dataSource,
        rootKey: 'root',
        checkboxPlacement: 'start',
        clickArea: 'cell',
        // defaultValue: ['1', '3'],
        checkboxColumn: {
          lock: true
        },
        highlightRowWhenSelected: true
      });
    }
  } else {
    if (mode === 'checkbox') {
      if (isSelectCheck) {
        var _columns$0$width, _columns$;
        return features.multiSelect({
          value: value,
          onChange: _onChange,
          // clickArea: 'row',
          checkboxColumn: {
            lock: true,
            width: (_columns$0$width = columns === null || columns === void 0 ? void 0 : (_columns$ = columns[0]) === null || _columns$ === void 0 ? void 0 : _columns$.width) !== null && _columns$0$width !== void 0 ? _columns$0$width : 60,
            title: title
          },
          highlightRowWhenSelected: true,
          // defaultValue: ['1', '2'],
          // defaultLastKey: '1',
          checkboxPlacement: 'start',
          clickArea: 'cell'
        });
      } else {
        return features.multiSelect({
          highlightRowWhenSelected: true,
          // defaultValue: ['1', '2'],
          // defaultLastKey: '1',
          checkboxPlacement: 'start',
          checkboxColumn: {
            lock: true
          },
          clickArea: 'cell'
        });
      }
    }
    if (mode === 'radio') {
      return features.singleSelect({
        // defaultValue: '1',
        highlightRowWhenSelected: true,
        clickArea: 'row'
      });
    }
  }
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".BaseTable ::-webkit-scrollbar,\n.BaseTable .art-horizontal-scroll-container ::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n.BaseTable ::-webkit-scrollbar-thumb,\n.BaseTable .art-horizontal-scroll-container ::-webkit-scrollbar-thumb {\n  background: #ccc;\n  border: 1px solid #eaeaea;\n}\n.BaseTable ::-webkit-scrollbar-thumb:hover,\n.BaseTable .art-horizontal-scroll-container ::-webkit-scrollbar-thumb:hover {\n  background: #6e6e6e;\n}\n.BaseTable ::-webkit-scrollbar-track,\n.BaseTable .art-horizontal-scroll-container ::-webkit-scrollbar-track {\n  background: #eaeaea;\n}\n.buttonAll .ant-btn {\n  margin-right: 8px;\n}\n";
styleInject(css_248z);

var _excluded$1 = ["rowKey", "selectMode", "bordered", "borderedLine", "columns", "dataSource", "columnResize", "isStickyHeader", "isActionBar", "actionBar", "size", "useVirtual", "useOuterBorder", "defaultColumnWidth", "estimatedRowHeight", "getRowProps", "treeMode", "isSelectCheck", "dragColumnWidth", "useEdit", "components", "useFrameSelection", "contentWidth"];
function BlockSpin() {
  return /*#__PURE__*/React.createElement(Spin, {
    style: {
      display: 'block'
    }
  });
}
var AntEmptyContent = /*#__PURE__*/React.memo(function () {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Empty, {
    imageStyle: {
      height: 'auto'
    },
    image: /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '120px',
        display: 'inline-block',
        lineHeight: 1
      }
    }, /*#__PURE__*/React.createElement(OflIcon$1, {
      type: "noData"
    })),
    description: "\u6682\u65E0\u6570\u636E"
  }));
});
function AntLoadingContentWrapper(_ref) {
  var children = _ref.children,
    visible = _ref.visible;
  var _useContext = useContext(ConfigProvider.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  // const antdPrefix = getPrefixCls();
  return /*#__PURE__*/React.createElement("div", {
    // className={`${antdPrefix}-loading-content-wrapper`}
    style: {
      opacity: visible ? 0.2 : undefined,
      filter: visible ? 'blur(3px)' : undefined
    }
  }, children);
}
var OflBaseTable = function OflBaseTable(props, ref) {
  var _props$rowKey = props.rowKey,
    rowKey = _props$rowKey === void 0 ? 'id' : _props$rowKey,
    selectMode = props.selectMode,
    _props$bordered = props.bordered,
    _props$borderedLine = props.borderedLine,
    defaultColumns = props.columns,
    defaultDataSource = props.dataSource,
    columnResize = props.columnResize,
    _props$isStickyHeader = props.isStickyHeader,
    isStickyHeader = _props$isStickyHeader === void 0 ? true : _props$isStickyHeader,
    _props$isActionBar = props.isActionBar,
    isActionBar = _props$isActionBar === void 0 ? true : _props$isActionBar,
    actionBar = props.actionBar,
    _props$size = props.size,
    _props$useVirtual = props.useVirtual,
    useVirtual = _props$useVirtual === void 0 ? {
      horizontal: (defaultColumns === null || defaultColumns === void 0 ? void 0 : defaultColumns.length) > 10,
      vertical: 'auto'
    } : _props$useVirtual,
    _props$useOuterBorder = props.useOuterBorder,
    defaultColumnWidth = props.defaultColumnWidth,
    _props$estimatedRowHe = props.estimatedRowHeight,
    _props$getRowProps = props.getRowProps,
    getRowProps = _props$getRowProps === void 0 ? false : _props$getRowProps,
    treeMode = props.treeMode,
    _props$isSelectCheck = props.isSelectCheck,
    isSelectCheck = _props$isSelectCheck === void 0 ? false : _props$isSelectCheck,
    _props$dragColumnWidt = props.dragColumnWidth,
    _props$useEdit = props.useEdit,
    _props$components = props.components,
    components = _props$components === void 0 ? {} : _props$components,
    _props$useFrameSelect = props.useFrameSelection,
    contentWidth = props.contentWidth,
    tableProps = _objectWithoutProperties(props, _excluded$1);
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
  var dataSource = defaultDataSource;
  var columns = defaultColumns;
  var primaryKey = rowKey;
  var pipeline = useTablePipeline({
    components: {
      Checkbox: Checkbox,
      Radio: Radio,
      Button: Button,
      Input: Input,
      Select: Select,
      FilterFilled: FilterFilled,
      // QuarkSelect,
      Tooltip: Tooltip,
      Popover: Popover,
      Tree: Tree
    }
  });
  pipeline.ctx.indents = _objectSpread2(_objectSpread2({}, pipeline.ctx.indents), {}, {
    iconIndent: 0
  });
  // 主键
  pipeline.primaryKey(rowKey);
  // 表格数据与列头结构
  pipeline.input({
    dataSource: dataSource,
    columns: columns
  });
  // 排序
  pipeline.use(features.sort({
    mode: 'single',
    highlightColumnWhenActive: true
  }));
  // 启动树形同时开启树形选择
  if (selectMode === null || selectMode === void 0 ? void 0 : selectMode.treeMode) {
    pipeline.use(features.treeMode({
      clickArea: 'cell'
    }));
  }
  // // 行列滑上高亮
  // pipeline.use(features.columnHover());
  // 提示信息
  pipeline.use(features.tips());
  // 拖拽调整列宽
  if (columnResize) {
    pipeline.use(features.columnResize({
      fallbackSize: 120,
      handleBackground: '#ddd',
      handleHoverBackground: '#aaa',
      handleActiveBackground: '#89bff7'
    }));
  }
  // 自动合并多行
  if (props.useAutoRowSpan) {
    pipeline.use(features.autoRowSpan());
  }
  // 勾选框
  if (selectMode && (selectMode === null || selectMode === void 0 ? void 0 : selectMode.mode)) {
    pipeline.use(select({
      mode: selectMode === null || selectMode === void 0 ? void 0 : selectMode.mode,
      treeMode: (selectMode === null || selectMode === void 0 ? void 0 : selectMode.treeMode) || false,
      dataSource: dataSource,
      isSelectCheck: isSelectCheck,
      columns: columns
    }));
  }
  var pipelineProps = pipeline.getProps();
  var customComponet = {};
  var maxWidth = 8;
  treeForEach({
    source: pipelineProps.columns,
    handler: function handler(col) {
      if (!!col.children) {
        return;
      }
      maxWidth += col.width || 0;
    }
  });
  if (contentWidth && contentWidth < maxWidth) {
    maxWidth = undefined;
  }
  if (props.repeatWidth === undefined || props.repeatWidth || props.hasHeader === false || columns.length === 0) {
    maxWidth = undefined;
  }
  // const [lastClickRowIndex, setLastClickRowIndex] = useState<any>();
  return /*#__PURE__*/React.createElement(GlobalDndContext, null, isActionBar ? ( /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      height: 48,
      border: '1px solid #ccc',
      zIndex: 30,
      background: 'var(--ifm-background-surface-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'end',
      paddingRight: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "buttonAll"
  }, actionBar))) : null, /*#__PURE__*/React.createElement(BaseTable, _objectSpread2(_objectSpread2(_objectSpread2({
    isStickyHeader: isStickyHeader,
    stickyTop: 0,
    // className={`BaseTable`}
    primaryKey: primaryKey,
    isLoading: false,
    stickyScrollHeight: Number(8) + 8,
    useVirtual: {
      horizontal: true,
      vertical: 'auto'
    },
    components: _objectSpread2(_objectSpread2({
      EmptyContent: AntEmptyContent,
      LoadingContentWrapper: AntLoadingContentWrapper,
      LoadingIcon: BlockSpin
    }, components), customComponet)
  }, tableProps), pipelineProps), {}, {
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
    getRowProps: getRowProps ? getRowProps : function () {},
    style: _objectSpread2({
      maxWidth: maxWidth,
      minHeight: '100%'
    }, tableProps === null || tableProps === void 0 ? void 0 : tableProps.style),
    useOuterBorder: true
  })));
};

var _excluded$2 = ["filter", "dataSource", "columns", "defaultColumnWidth", "headContextMenu", "rowContextMenu", "size", "getRowProps", "changeSelectedRows", "onSelectedKeys", "selectMode", "checkedStrategy", "expandedAllRows", "dataSourceHash", "checkboxDisabled", "hasSelctedCountDom", "selectdCuntCheck", "onSelectdCuntCheckChange", "customFooterDom", "total", "currentRow", "setCurrentRow", "selectedRowKeys", "returnSelectedRows", "isShowReversCheck", "shortCutsHandles", "useVirtual", "filterMode", "isAudit", "treeModeIconType", "hasFootterSlectedAll", "hasFootterReversSlect", "actionBar", "filteredDataCountCallback", "fromPane", "tableTootipsInfo", "columnResize", "treeMode"];
var OflTable = function OflTable(_ref, ref) {
  var filter = _ref.filter,
    _ref$dataSource = _ref.dataSource,
    dataSource = _ref$dataSource === void 0 ? [] : _ref$dataSource,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    _ref$defaultColumnWid = _ref.defaultColumnWidth,
    headContextMenu = _ref.headContextMenu,
    defaultRowContextMenu = _ref.rowContextMenu,
    size = _ref.size,
    getRowProps = _ref.getRowProps,
    propsChangeSelectedRows = _ref.changeSelectedRows,
    onSelectedKeys = _ref.onSelectedKeys,
    _ref$selectMode = _ref.selectMode,
    selectMode = _ref$selectMode === void 0 ? {
      mode: 'checkbox',
      selectType: 'treeSelect'
    } : _ref$selectMode,
    _ref$checkedStrategy = _ref.checkedStrategy,
    checkedStrategy = _ref$checkedStrategy === void 0 ? 'all' : _ref$checkedStrategy,
    _ref$expandedAllRows = _ref.expandedAllRows,
    dataSourceHash = _ref.dataSourceHash,
    _ref$checkboxDisabled = _ref.checkboxDisabled,
    _ref$hasSelctedCountD = _ref.hasSelctedCountDom,
    selectdCuntCheck = _ref.selectdCuntCheck,
    onSelectdCuntCheckChange = _ref.onSelectdCuntCheckChange,
    customFooterDom = _ref.customFooterDom,
    total = _ref.total,
    currentRow = _ref.currentRow,
    setCurrentRow = _ref.setCurrentRow,
    propsSelectedRowKeys = _ref.selectedRowKeys,
    _ref$returnSelectedRo = _ref.returnSelectedRows,
    _ref$isShowReversChec = _ref.isShowReversCheck,
    shortCutsHandles = _ref.shortCutsHandles,
    useVirtual = _ref.useVirtual,
    _ref$filterMode = _ref.filterMode,
    defaultIsAudit = _ref.isAudit,
    _ref$treeModeIconType = _ref.treeModeIconType,
    _ref$hasFootterSlecte = _ref.hasFootterSlectedAll,
    _ref$hasFootterRevers = _ref.hasFootterReversSlect,
    actionBar = _ref.actionBar,
    filteredDataCountCallback = _ref.filteredDataCountCallback,
    _ref$fromPane = _ref.fromPane,
    tableTootipsInfo = _ref.tableTootipsInfo,
    _ref$columnResize = _ref.columnResize,
    columnResize = _ref$columnResize === void 0 ? false : _ref$columnResize,
    _ref$treeMode = _ref.treeMode,
    treeMode = _ref$treeMode === void 0 ? false : _ref$treeMode,
    props = _objectWithoutProperties(_ref, _excluded$2);
  /**
   * 监听表格滚动
   *
   * @param {*} e
   */
  var onTableScroll = function onTableScroll(e) {
    var _props$onTableScroll;
    (_props$onTableScroll = props.onTableScroll) === null || _props$onTableScroll === void 0 ? void 0 : _props$onTableScroll.call(props, e);
  };
  // 当前右键的区域
  var _useState = useState('body'),
    _useState2 = _slicedToArray(_useState, 2),
    contextMenuArea = _useState2[0],
    setContextMenuArea = _useState2[1];
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
  var footerSelectedContentRef = useRef(null);
  // 底部反选
  var footerReversSelectContentRef = useRef(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      transform: 'scale(1)'
      // ...props.style,
    },
    tabIndex: -1
  }, /*#__PURE__*/React.createElement(Dropdown, {
    transitionName: "",
    overlay: function overlay() {
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      width: '100%',
      flex: 'auto',
      height: '100%'
    },
    onContextMenu: function onContextMenu(e) {
      e.stopPropagation();
    },
    // className={`${custPrefix}`}
    onScroll: function onScroll() {
      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }
      onTableScroll === null || onTableScroll === void 0 ? void 0 : onTableScroll.apply(void 0, arg);
    }
  }, /*#__PURE__*/React.createElement(OflBaseTable, _objectSpread2(_objectSpread2({}, props), {}, {
    actionBar: actionBar,
    getRowProps: getRowProps,
    dataSource: dataSource,
    columns: columns,
    columnResize: columnResize,
    treeMode: treeMode,
    selectMode: selectMode ? _objectSpread2(_objectSpread2({
      mode: 'checkbox',
      selectType: 'treeSelect',
      cloneSlectedAllto: function cloneSlectedAllto() {
        return footerSelectedContentRef.current;
      },
      cloneReversSlectto: function cloneReversSlectto() {
        return footerReversSelectContentRef.current;
      }
    }, selectMode), {}, {
      checkedStrategy: checkedStrategy
    }) : undefined
  })))));
};

export { OflTable as DumiBigCalendar, OflIcon$1 as DumiIcon, OflTable as DumiTable, index as Foo };
