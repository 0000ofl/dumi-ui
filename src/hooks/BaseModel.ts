/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useRef, useCallback } from 'react';
import type { FormInstance } from 'antd';
import { Form } from 'antd';

const filterMethod = ['selectedRows', 'rowKey'];

// const storageKeyMap = getStorageKeyMap();

const formState = {
  // 统一设置按钮操作入口
  initialOperate:'detail',
  operate: 'query',
  detailVisible: false,
  formVisible: false,
  // 用作设置界面的loading状态
  formLoading: false,
  formData: {} as Record<any, any>,
  queryParams: {} as Record<any, any>,
  tableIndex: 1,
  relationMenuVisible: false,
  relationMenu: [] as any[],
  // 统一设置弹窗开关
  dataSettingVisible: false as boolean,
  // 搜索区域加载状态
  searchFormLoading: true,
};

const toolbarState = {
  // 按钮权限加载状态
  toolbarLoading: false,
};

// 全局设置相关
const sysConfig = {
  // 设置按钮
  settingVisible: false,
  // 打印预览弹窗
  printVisible: false,
  // 打印类型,当前数据，所有pdgeInfo数据，所有tab页签数据，自定义
  printType: 'current' as 'current' | 'all' | 'allTabs' | string,
  // 导出、打印 主副标题转义提示文本
  titleTranslate: {
    export: {
      fileName: '',
      mainTitle: '',
      subTitle: '',
    },
    print: {
      mainTitle: '',
      subTitle: '',
    },
  },
};

const tableState = {
  rowKey: 'id',
  tabsInfo: null as null | {
    fieldName: string;
    tabs: {
      tab: string;
      key: number | string;
    }[];
    activeKey: string;
  },
  columns: [] as any[],
  dataSource: [] as any[],
  tableLoading: false,
  selectedRowKeys: [] as string[],
  expandedRowKeys: [] as string[], // 展开
  sortList: [],
  pageInfo: {
    currentPage: 1,
    pageSize: 100,
    totalCount: 0,
  } as {
    currentPage: number;
    pageSize: number;
    totalCount: number;
  } | null,
  currentRecord: null as Record<string, any> | null,
};

type fromRefType = {
  paneRef: React.MutableRefObject<any>;
  searchFormRef: FormInstance<any>;
  detailFormRef: FormInstance<any>;
};

type myPartial<T> = {
  [P in keyof T]?: T[P] | any;
};

type UsuallyModelType = typeof tableState &
  typeof formState &
  typeof toolbarState &
  typeof sysConfig &
  fromRefType &
  Record<string, any>;

export type ModelType = UsuallyModelType & {
  changeState: (
    obj: myPartial<typeof tableState & typeof formState & typeof toolbarState & typeof sysConfig & Record<string, any>>,
  ) => void;
  getSelectedRows: () => any[];
};

export type BaseModel<T extends UsuallyModelType = UsuallyModelType> = {
  state?: T;
  reducers?: Record<string, (args?: any) => any> & any;
};

export const useCreateModel = <T extends UsuallyModelType = UsuallyModelType>(props: BaseModel) => {
  const { state: initState = {} as T, reducers } = props;
  const [state, setState] = useState({
    ...initState,
  });
  let extReducers = {};
  if (typeof reducers === 'function') {
    extReducers = reducers(setState);
  } else if (reducers) {
    extReducers = reducers;
  }

  const allReducers = useMemo(() => {
    const reducer: any = {};
    Object.keys(state).forEach((key) => {
      if (filterMethod.indexOf(key) < 0) {
        reducer[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = (newValue: any) => {
          setState((preState) => {
            const newState = preState;
            if (typeof newValue === 'function') {
              newState[key] = newValue(newState[key]);
            } else {
              newState[key] = newValue;
            }
            return { ...newState };
          });
        };
      }
    });

    return {
      changeState: (newState: any) => {
        setState((preState) => {
          return { ...preState, ...newState };
        });
      },
      ...reducer,
      ...extReducers,
    };
  }, []) as {
    changeState: (x: Record<string, any>) => void;
  } & Record<string, (x: any) => void>;

  const { selectedRowKeys, dataSource, rowKey } = state;
  const getSelectedRows = useCallback(
    (keys?: string[]) => {
      const useKeys = keys || selectedRowKeys;
      const rows: any[] = [];
      const setArray = new Set(useKeys);
      // treeForEach({
      //   source: dataSource,
      //   handler: (item) => {
      //     if (item && setArray.has(item[rowKey])) {
      //       rows.push(item);
      //     }
      //   },
      // });
      return rows;
    },
    [selectedRowKeys, dataSource, rowKey],
  );
  return { ...state, getSelectedRows, ...allReducers } as T & {
    getSelectedRows: () => any[];
  } & typeof allReducers;
};
export type userModalType<T = Record<string, any>> = {
  state?: T & {
    funCode?: string;
  };
  reducers?: any;
  useCache?: boolean;
  cacheFields?: string[];
};

type CacheState =
  | {
      dataSource?: any[];
      selectedRowKeys?: string[];
      pageInfo?: typeof tableState.pageInfo;
      [x: string]: any;
    }
  | undefined;

export const useBaseModel = <T>(props: userModalType<T>) => {
  const {
    state = {} as T & {
      funCode?: string;
    },
    reducers,
    useCache = true,
  } = props || {};
  let chacheState: CacheState;
  const initState = {
    paneRef: useRef(null as any),
    searchFormRef: Form.useForm()[0],
    detailFormRef: Form.useForm()[0],
    useCache,
    ...tableState,
    ...formState,
    ...toolbarState,
    ...sysConfig,
    ...state,
    ...chacheState,
  };
  // if (initState.pageInfo && initState.funCode) {
  //   const cachePageInfoString = YSS_Storage.localGet(storageKeyMap.FUN_PAGEINFO);
  //   const cachePageInfo = cachePageInfoString ? JSON.parse(cachePageInfoString) : {};
  //   initState.pageInfo = {
  //     ...initState.pageInfo,
  //     ...cachePageInfo[initState.funCode],
  //   };
  // }
  const result = useCreateModel<typeof initState>({
    state: initState,
    reducers,
  });
  return result;
};

export const useTableModel = (props?: userModalType) => {
  const { state = {}, reducers } = props || {};
  return useCreateModel({
    state: {
      paneRef: useRef(),
      searchFormRef: Form.useForm()[0],
      detailFormRef: Form.useForm()[0],
      ...tableState,
      ...formState,
      ...toolbarState,
      ...sysConfig,
      ...state,
    },
    reducers,
  });
};
