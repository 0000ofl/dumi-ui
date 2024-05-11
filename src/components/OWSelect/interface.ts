interface totalInfo {
  /**
   * 所有数据总和
   */
  totalAll: number;
  /**
   * 所有子节点总和
   */
  totalChild: number;
}
export interface OWSelectProps {
  /**
   * 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动
   * @default true
   */
  dropdownMatchSelectWidth?: boolean | number;
  /**
   * 显示清除图标
   * @default true
   */
  allowClear?: boolean;
  /**
   * 是否有边框
   * @default true
   */
  bordered?: boolean;
  /**
   * 显示下拉小箭头
   * @default true
   */
  showArrow?: boolean;
  /**
   * 自定义共计 数字
   */
  totalInfo?:
    | ((
        totalInfo?: totalInfo,
        checkAllState?: {
          checkAll: boolean;
          indeterminate: boolean;
        },
        rawData?: {
          rawOptions: any[];
          notreeArr: any[];
        },
      ) => number)
    | { totalCild: true };

  /**
   * 自定义已选 数字
   */
  selectedInfo?:
    | ((
        totalInfo?: totalInfo,
        checkAllState?: {
          checkAll: boolean;
          indeterminate: boolean;
        },
        num?: number,
      ) => number)
    | number;
  /**
   * 多列配置信息
   */
  columns?: {
    /**
     * 列宽
     */
    width: number | string;
    /**
     * 需要展示的内容对应的属性名
     */
    dataIndex: string;
    /**
     * 自定义渲染方法
     */
    render?: (row: any, rowIndex: number) => React.ReactNode;
  }[];
  /**
   * 数据化配置选项内容
   */
  options?: any[];
  /**
   * 指定当前选中的条目(受控)
   */
  value?: any;
  /**
   * 差异对比的value,设置null则认为该组件之前未空值
   */
  diffValue?: any;
  /**
   * value分隔符，设置时无论多选单选，返回字符串
   */
  valueSeparator?: string;
  /**
   * 设置 Select 的模式为多选
   */
  mode?: 'multiple';
  /**
   * 单选是否返回字符串（默认返回数组类型）
   */
  radioSrting?: boolean;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 判断某选项是否可选，非表格模式下有用，表格请参考QuarkTree配置
   */
  disabledRow?: (row?: any) => boolean;
  /**
   * 输入框默认提示
   */
  placeholder?: string;
  /**
   * 值变化时的回调（模式不同，rows和other返回不同）
   */
  onChange?: (keys: any, rows?: any[], other?: any) => void;
  /**
   * 勾选全选时的回调,若有返回值，则采用返回值作为onchange数据(表格模式无效)
   */
  onCheckAll?: (
    keys: any,
    rows: any[],
  ) => {
    keys: any[];
    rows: any[];
  };
  /**
   * 悬停展示更多已选择信息,此功能消费性能,不要滥用
   * @default false
   */
  tooltip?: boolean;
  /**
   * 返回选中信息的value值
   * @default "value"
   */
  optionValue?: string;
  /**
   * 下拉框信息展示及选框回显
   * @default "label"
   */
  optionLabel?: string;
  /**
   * 设置下拉选项滚动高度,非必要不要去配置
   * @default 256
   */
  listHeight?: number;
  /**
   * 表格模式下部分配置
   */
  tableProps?: {
    /**
     * 表格列信息配置
     */
    columns: any[];
    /**
     * 表格最大宽度设置
     */
    maxWidth?: string | number;
    /**
     * 表格最大高度设置
     */
    maxHeight?: string | number;
    /**
     * 表格是否需要边框
     */
    bordered?: boolean;
    /**
     * 选择模块
     */
    selectMode?: {
      mode?: 'checkbox' | 'radio';
      selectType?: 'treeSelect' | 'singleSelect';
      isDisabled?: (row: any) => boolean;
      idDetached?: (row: any) => boolean;
      checkStrictly?: boolean;
    };
  };
  /**
   * 数据加载状态（下拉展示框）,保留API不再生效
   * @default false
   */
  dataLoading?: boolean;
  /**
   * 数据加载状态(选择框)
   */
  loading?: boolean;
  /**
   * 调取远程服务接口地址
   */
  url?: string;

  /**
   * 请求方式 (默认为 GET 请求， 大数据模式下使用 POST 请求)
   */
  fetchType?: 'GET' | 'POST';
  /**
   * 是否使用接口缓存数据，下次不再请求接口,只适合直接配置url的模式,loadData为自定义数据获取函数（都不一定是接口请求）
   * @default true
   */
  useCache?: boolean;
  /**
   * 请求参数 (适用于大数据情况下的下拉框数据回填、数据搜索和postURL请求参数)
   */
  fetchOption?: Record<string, any>;
  /**
   * 调取远程服务方法，需要返回数据,不建议使用箭头函数,会导致内存地址刷新重载数据
   */
  loadData?: any;
  /**
   * 自定义返回刷新按钮方法，返回内容直接用作数据展示,分页模式下无效
   */
  refreshFun?: () => any;
  /**
   * 调取远程方法之后的回调,用于处理返回数据，并需要返回一个新的options数据
   */
  afterGetData?: (options?: any[]) => any;
  /**
   * 数据层级，接口返回数据根据数据层级获取对应的数据
   */
  levelData?: any[];
  /**
   * 关键字筛选,低于十条不显示
   * @default false
   */
  showSearch?: boolean;

  /**
   * 是否允许使用非法值，即不在选项中的值
   * @default false
   */
  useIllicitValue?: boolean;
  /**
   * 后端搜索
   * @default false
   */
  remoteMode?: boolean;
  /**
   * 刷新功能(仅调取远程接口模式下有效)
   * @default false
   */
  showRefresh?: boolean;
  /**
   * 底部是否显示数据计算,权重高于reconfirm
   * @default false
   */
  showFooterTotal?: boolean;
  /**
   * 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。
   * @default () => document.body
   */
  getPopupContainer?: any;
  /**
   * 开启checkbox模式(mode自动设置为multiple)
   * @default false
   */
  showCheckbox?: boolean;
  /**
   * checkbox模式平铺( px | % )
   */
  tileColumnWidth?: string;
  /**
   * 底部显示已选,多选框下可用，大数据推荐使用表格模式
   * @default true
   */
  showSelect?: boolean;
  /**
   * 开启树形数据模式
   * @default false
   */
  treeMode?: boolean;
  /**
   * 展开收起的icon样式（三角箭头或文件夹）
   * @default arrow
   */
  iconType?: 'arrow' | 'fileFolder';
  /**
   * 组件class名
   */
  className?: string;
  /**
   * 展开下拉菜单的回调
   */
  onDropdownVisibleChange?: (open: boolean) => void;
  /**
   * 下拉菜单的 className 属性
   */
  dropdownClassName?: string;
  /**
   * 选择框大小
   */
  size?: 'large' | 'middle' | 'small';
  /**
   * 是否启用审核展示机制，设置为true时开启默认审核未审核展示机制，配置函数可自定义审核未审核机制
   * @default true
   */
  showIsAudit?: ((row: any) => boolean) | boolean;
  /**
   * 底部内容,设置后覆盖一切底部默认配置
   */
  footer?: React.ReactNode;
  /**
   * 是否展开下拉菜单
   */
  open?: boolean;
  /**
   * 树形下拉框联动规则,遵循表格树联动规则
   */
  treeCheckModel?: {
    /**
     * 勾选父级是否联动勾选子级
     * @default true
     */
    checkParentWidthChild?: boolean;
    /**
     * 勾选子级是否联动勾选父级
     * @default false
     */
    checkChildWidthParent?: boolean;
  };
  /**
   * 定义选中节点回填的方式,树形勾选模式下生效
   * @default 'all'
   */
  showCheckedStrategy?: 'all' | 'child';
  /**
   * 作为显示的 prop 设置,树形勾选模式（非表格）下生效
   * @default 'title'
   */
  treeNodeLabelProp?: 'title' | 'value';
  /**
   * 获得焦点时回调
   */
  onFocus?: () => void;
  /**
   * 失去焦点时回调
   */
  onBlur?: () => void;
  /**
   * 只读
   */
  readOnly?: boolean;
  /**
   * 是否是优雅阅读态
   */
  readPretty?: boolean;

  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * 反选
   * @default false
   */
  invertSelect?: boolean;
  /**
   * 设置后置标签
   */
  addonAfter?: React.ReactNode;
  /**
   * 重新渲染下拉框各选项（出于性能考虑只接收一次方法）
   */
  optionRender?: (row: any) => React.ReactNode;
  /**
   * (!!!废弃)由于antd底层问题，树形选择的回显由于若使用了optionRender，则会回显optionRender中返回的字符，并不会回显定义的optionLabel,
   * 框架声明optionRenderUseTagRender是询问是否重新返回定义的optionLabel,若render仅仅是为了更改样式，建议不用开启该配置。
   * 该配置仅在treeMode情况下使用
   */
  optionRenderUseTagRender?: boolean;
  /**
   * (!!!废弃)最多显示多少标签
   */
  maxTagCount?: number | 'responsive';
  /**
   * (!!!废弃)自定义 tag 内容 render
   */
  tagRender?: (props: any) => React.ReactElement;
}
