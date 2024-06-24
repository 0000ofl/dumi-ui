import { BeanUtil, YSS_Storage, treeForEach, treeMap, getStorageKeyMap } from '@ams/quark-utils';
import type BaseService from '../services/BaseService';
import type { ModelType } from '../hooks/BaseModel';
import { request } from 'umi';
import umiRequest from 'umi-request';
import _ from 'lodash';


class QueryHandle<T extends ModelType, S extends BaseService = BaseService> {
  model!: T;
  extraParams!: any;
  cacheParams: null | Record<string, any> = null;
  service!: S;
  messageMap: Record<string, any> = {
    extraParamsOne: '请至少选择一条主表数据',
    extraParamsMulti: '请选择一条主表数据',
  };
  get request() {
    if (window.QUARK_UMI_REQUEST) {
      return window.QUARK_UMI_REQUEST as typeof request;
    }
    return request;
  }
  queryCancelFc = null as null | (() => void);

  constructor(model: T) {
    this.model = model;
  }

  dataSourceHash = new Date().getTime();

  setMode(model?: T) {
    if (model) {
      this.model = model;
    }
  }

  setExtraParams(extraParams: any) {
    this.extraParams = extraParams;
  }

  getSelectedRows(keys?: string[]) {
    const { selectedRowKeys, dataSource, rowKey } = this.model;
    const useKeys = keys || selectedRowKeys;
    const rows: any[] = [];
    const setArray = new Set(useKeys);
    treeForEach({
      source: dataSource,
      handler: (item) => {
        if (item && setArray.has(item[rowKey])) {
          rows.push(item);
        }
      },
    });
    return rows;
  }

  getNewState(params: any = {}) {
    const { currentPage, pageSize, totalCount } = params;

    let { pageInfo } = this.model;
    if (pageInfo) {
      pageInfo = {
        currentPage: currentPage || 1,
        pageSize: pageSize || pageInfo.pageSize,
        totalCount: totalCount || 0,
      };
    }

    // let { sortList } = params;
    // if (!sortList) {
    //   sortList = this.model.sortList;
    // }

    return { pageInfo };
  }

  getSearchParams() {
    const searchForm = this.model?.searchFormRef;
    if (searchForm) {
      const params = { ...searchForm.getFieldsValue(true) };
      Object.keys(params).forEach((item) => {
        if (params[item] === '' || params[item] === null) {
          delete params[item];
        }
        if (params[item] instanceof Array) {
          if (params[item].length === 0) {
            delete params[item];
          }
        }
      });
      return { params };
    }
    return {};
  }

  getSortList(sorts: any[]) {
    const sortList = sorts.map((item: { order: string; code: any }) => {
      return {
        key: item.code,
        direction: item.order?.toLocaleUpperCase(),
      };
    });

    return { sortList };
  }

  getCustomParams() {
    return {};
  }

  getSearchTabsParams() {
    if (!this.model.tabsInfo) {
      return {};
    }
    const { activeKey, fieldName } = this.model.tabsInfo;
    if (activeKey === 'null' || activeKey === 'undefind') {
      return {};
    }
    return _.set({}, fieldName, activeKey);
  }
  getQueryParams(newParams: any) {
    const searchParams = this.getSearchParams();
    const customParams = this.getCustomParams();
    const searchTabsParams = this.getSearchTabsParams();
    const { pageInfo, ...rest } = newParams;
    // const sortList = this.getSortList(sorts);
    const queryParams = BeanUtil.merge({}, searchParams, customParams, pageInfo, searchTabsParams, rest);
    return queryParams;
  }

  /**
   * 根据参数和默认参数构建查询条件
   * @param {*} params
   */
  queryBefore(params: any) {
    if (params === null) {
      return false;
    }
    return true;
  }

  async handleQueryData(result: any) {
    return result;
  }

  /**
   * 查询表格数据
   * @param {*} props
   * @param cacheParams 缓存查询条件？？？
   * @noChangeState 是否不需要改变状态渲染页面，仅仅拿数据，不做处理
   */
  async query(newParams: any = {}, cacheParams: boolean = false, noChangeState: boolean = false) {
    const { currentPage, pageSize, totalCount, ...params } = newParams;
    const newState = this.getNewState({ currentPage, pageSize, totalCount });
    let allParams = null as any;
    if (cacheParams && this.cacheParams) {
      const { pageInfo } = newState;
      allParams = BeanUtil.merge(
        {},
        this.cacheParams,
        pageInfo,
        params,
      );
    } else {
      allParams = this.getQueryParams({ ...newState, ...params });
    }

    if (!this.queryBefore(allParams)) {
      return false;
    }
    let cancelToken;
    if (!noChangeState) {
      if (this.request.CancelToken) {
        cancelToken = new this.request.CancelToken((c: (() => void) | null) => {
          this.queryCancelFc = c;
        });
      } else {
        cancelToken = new umiRequest.CancelToken((c: (() => void) | null) => {
          this.queryCancelFc = c;
        });
      }
      this.model?.changeState({ tableLoading: true, queryParams: allParams });
    }
    this.cacheParams = allParams;

    let result: any = null;
    if (allParams.pageSize) {
      result = await this.service.page(
        allParams,
        {
          cancelToken,
        }
      ).catch((error) => {
        console.log(error);
      });
      allParams.totalCount = result?.data?.totalCount;
    } else {
      result = await this.service.query(
        allParams,
        {
          cancelToken,
        }
      ).catch((error) => {
        console.log(error);
      });
    }
    result = await this.handleQueryData(result);
    this.queryCancelFc = null;
    if (noChangeState) {
      return result;
    }
    if (!result) {
      this.model?.changeState({ tableLoading: false });
      return;
    }
    return this.queryAfter({ ...newState, result, cacheParams });
  }

  /**
   * 是否在查询后将选中行数据清空
   */
  clearSelectedAfterQuery() {
    return true;
  }

  /**
   * 查询结果处理
   * @param {*} result
   */
  queryAfter(options: any) {
    const { pageInfo, result, cacheParams } = options;
    let dataSource = [] as any[];
    const { data } = result;
    if (pageInfo) {
      pageInfo!.totalCount = data?.totalCount || 0;
    }
    const { content, dataList } = data;
    dataSource = content || dataList || [];
    let clearCurrent = true;
    if (this.model.currentRecord) {
      treeForEach({
        source: dataSource,
        handler: (row) => {
          if (row[this.model.rowKey] === this.model.currentRecord?.[this.model.rowKey]) {
            clearCurrent = false;
          }
        },
      });
    }
    const custObj = this.clearSelectedAfterQuery() ? {
      selectedRowKeys: [],
      ...clearCurrent ? {currentRecord: null}: {},
    } : {};
    this.dataSourceHash = new Date().getTime();
    this.model.changeState({
      dataSource,
      pageInfo,
      tableLoading: false,
      ...custObj,
    });
    return result;
  }

  /**
   * 变更页码或页大小
   * @param {*} currentPage
   * @param {*} pageSize
   */
  changePage(currentPage: any, pageSize: any) {
    const { totalCount } = this.model?.pageInfo || {};
    const storageKeyMap = getStorageKeyMap();
    const cachePageInfoString = YSS_Storage.localGet(storageKeyMap.FUN_PAGEINFO);
    const cachePageInfo = cachePageInfoString ? JSON.parse(cachePageInfoString) : {};
    cachePageInfo[this.model.funCode] = {
      pageSize,
    };
    YSS_Storage.localSet(storageKeyMap.FUN_PAGEINFO, JSON.stringify(cachePageInfo));
    return this.query({ currentPage, pageSize, totalCount });
  }

  /**
   * 取消查询方法
   */
  cancelQuery() {
    if (this.queryCancelFc) {
      this.queryCancelFc?.();
      this.queryCancelFc = null;
      this.model.changeState({
        tableLoading: false,
      });
    }
  }
  /**
   * 后端排序
   * @param {*} sortList
   */
  changeSortList(newParams: any) {
    // this.query({ sortList }, true);

  }
  /**
   * 后端过滤
   * @param {*} allParams
   */
  async screenData(allParams: any) {
    let result: any = null;
    result = await this.service.query(allParams);
    return result;
  }

  pollingQuery() {
    this.query(undefined, true);
  }

  listHead() {
  }
}

export default QueryHandle;
