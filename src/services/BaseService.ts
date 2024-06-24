import { request } from 'umi';
import DataConvert from '../handles/DataConvert';
import type DataConvertType from '../handles/DataConvert';

const defaultApi = {
  base: '',
  all: '/all',
  page: '/page',
  query: '/query',
  queryByIds: '/ids',
  detail: '/{id}',
  deletes: '',
  save: '',
  check: '/check',
  uncheck: '/uncheck',
  listhead: '/listhead',
  export: '/page/export',
  exportConfig: '/api/fomp-fast-foundation/v1/sysmanager/export/query',
  exportQueryUrl: '/query',
  printConfig:'/api/fomp-fast-foundation/v1/sysmanager/print/query',
  import: '/import',
  columnsSet: '/api/fomp-fast-foundation/v1/sysmanager/pagesetting/querysetting/{funCode}',
  columnsSave: '/api/fomp-fast-foundation/v1/sysmanager/pagesetting/savesetting/{funCode}',
  realtionMenu: '/api/fomp-fast-foundation/v1/right/funrelation/query',
  uploadExportFile:"/api/fomp-fast-foundation/v1/communication/sendedmail/uploadfile",
  sendExportEmail:"/api/fomp-fast-foundation/v1/communication/sendedmail/send",
};
// export type ApiUrl = typeof defaultApi & Record<string, any>;

const initUrl = (url: any) => {
  const urls = url || {};
  let { base } = urls;
  if (base.endsWith('/')) {
    base = base.slice(0, -1);
  }
  Object.keys(urls).forEach((key: any) => {
    if (key !== 'base') {
      urls[key] = urls[key].replace('{base}', base);
    }
  });
  Object.keys(defaultApi).forEach((key: any) => {
    if (!url[key]) {
      const UrlKeysWithoutBase = ['columnsSet','columnsSave','realtionMenu','exportConfig','printConfig'];
      urls[key] = UrlKeysWithoutBase.includes(key) ? defaultApi[key] : base + defaultApi[key];
    } else {
      urls[key] = urls[key].replace('{base}', base);
    }
  });
  return urls;
};

export default class BaseService {
  url: any;
  dataConvert: DataConvertType = new DataConvert();
  get request() {
    if (window.QUARK_UMI_REQUEST) {
      return window.QUARK_UMI_REQUEST as typeof request;
    }
    return request;
  }
  constructor(url: any) {
    this.init(url);
  }

  init(url: any) {
    this.url = initUrl(url);
  }

  get(url: string, params: any, options: any) {
    return this.request(url, {
      method: 'GET',
      params,
      ...options,
    });
  }

  post(url: string, data: any, options: any) {
    return this.request(url, {
      method: 'POST',
      data,
      ...options,
    });
  }

  all(data: any) {
    return this.dataConvert.queryConvert(this.url.all, {
      method: 'POST',
      data,
      headers: { TRANSFORM: 'true' },
    });
  }
  page(condition: any, config?: any) {
    return this.dataConvert.queryConvert(this.url.page, {
      method: 'POST',
      data: condition,
      headers: { TRANSFORM: 'true' },
      ...config,
    });
  }
  query(data: any, config?: any) {
    return this.dataConvert.queryConvert(this.url.query, {
      method: 'POST',
      data,
      headers: { TRANSFORM: 'true' },
      ...config,
    });
  }
  queryByIds(ids: any) {
    return this.dataConvert.queryConvert(this.url.queryByIds, {
      method: 'POST',
      data: ids,
      headers: { TRANSFORM: 'true' },
    });
  }
  detail(id: any) {
    const url = this.url.detail.replace('{id}', id);
    return this.request(url, {
      method: 'GET',
    });
  }
  deletes(defaultIds: any, config: any = {}) {
    let ids = defaultIds;
    if (ids instanceof Array) {
      ids = [...new Set(ids)];
    }
    return this.request(this.url.deletes, {
      method: 'DELETE',
      data: ids,
      ...config,
    });
  }
  save(data: any, config: any = {}) {
    return this.request(this.url.save, {
      method: 'POST',
      data,
      ...config,
    });
  }
  check(defaultIds: any, config: any = {}) {
    let ids = defaultIds;
    if (ids instanceof Array) {
      ids = [...new Set(ids)];
    }
    return this.request(this.url.check, {
      method: 'POST',
      data: ids,
      ...config,
    });
  }
  uncheck(defaultIds: any, config: any = {}) {
    let ids = defaultIds;
    if (ids instanceof Array) {
      ids = [...new Set(ids)];
    }
    return this.request(this.url.uncheck, {
      method: 'POST',
      data: ids,
      ...config,
    });
  }
  listHead() {
    return this.request(this.url.listhead, {
      method: 'POST',
    });
  }
  exports(data: any) {
    const formData = data;
    formData.append('queryUrl', this.url.page);
    return this.request(this.url.export, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain,application/octet-stream',
      },
      data: formData,
      responseType: 'blob',
      getResponse: true,
    });
  }

  exportConfig(data: any) {
    return this.request(this.url.exportConfig, {
      method: 'POST',
      data,
    });
  }

  printConfig(data: any) {
    return this.request(this.url.printConfig, {
      method: 'POST',
      data,
    });
  }
  import(data: any) {
    return this.request(this.url.import, {
      method: 'POST',
      data,
    });
  }
  getColumnsSet(data: any) {
    const url = this.url.columnsSet.replace('{funCode}', data);
    return this.request(url);
  }
  saveColumnsSet(funcode: string, data: any) {
    const url = this.url.columnsSave.replace('{funCode}', funcode);
    return this.request(url, {
      method: 'POST',
      data,
    });
  }


  queryRealtionMenu(funCode: string) {
    const param = {"funCode":funCode};
    return this.request(this.url.realtionMenu,{
      method:"POST",
      data:{params:{...param}},
    });
  }


  /**
   * 上传文件到服务器获取文件key
   *
   * @param {Blob} blob
   * @return {*}
   * @memberof BaseService
   */
  uploadExportFile(blob: Blob,fileName: string,type: "mail"|"fax") {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("fileName", fileName);
    const mailUploadURL = '/api/fomp-fast-foundation/v1/communication/sendedmail/uploadfile';
    const faxUploadURL = '/api/fomp-fast-foundation/v1/communication/sendedfax/uploadfile';
    const url = type === 'mail' ? mailUploadURL : faxUploadURL;
    return this.request(url,{
      method:"POST",
      data:formData,
      // requestType: 'form',
    });
  }


  /**
   * 发送邮件、传真
   *
   * @param {string} funCode 菜单代码
   * @param {string} fileKey 从 uploadExportFile 获取的 key
   * @return {*}
   * @memberof BaseService
   */
  sendExportFile(funCode: string, fileKey: string, type: "mail" | "fax") {
    const sendMailURL = "/api/fomp-fast-foundation/v1/communication/sendedmail/send";
    const sendFaxURL = "/api/fomp-fast-foundation/v1/communication/sendedfax/send";
    const url = type === 'mail' ? sendMailURL :  sendFaxURL;
    return this.request(`${url}/${funCode}/${fileKey}`,{
      method:"GET",
    });
  }

  async getSealInfo(funCode: string) {
    return request('/api/fomp-fast-foundation/v1/sysmanager/seal/query', {
      method: 'POST',
      data: {
        params: {
          funCode,
          sealCode: '',
        },
      },
      headers: { TRANSFORM: 'true' },
    });
  }

  cacheReqeustMap = new Map();
  /**
   * 缓存式请求，仅限用与get请求
   */
  async cacheRequest(url: string) {
    const cache = this.cacheReqeustMap.get(url);
    if (cache) {
      return cache;
    }
    const result = await this.dataConvert.queryConvert(url, {
      method: 'GET',
    });
    this.cacheReqeustMap.set(url, result);
    return result;
  }

  async uploadFile(formData: FormData) {
    const url = '/api/fomp-fast-foundation/v1/sysmanager/resourcerest/upload';
    return this.request(url,{
      method:"POST",
      data:formData,
      headers: { TRANSFORM: 'true' },
    });
  }

  async downloadFile(fileList: string[]) {
    const url = '/api/fomp-fast-foundation/v1/sysmanager/resourcerest/download';
    return this.request(url,{
      method:"POST",
      data:fileList,
      showMsg: false,
      responseType: 'blob',
    });
  }
}
