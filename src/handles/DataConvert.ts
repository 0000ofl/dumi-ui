import { request } from "umi";

class DataConvert {
  get request() {
    if (window.QUARK_UMI_REQUEST) {
      return window.QUARK_UMI_REQUEST as typeof request;
    }
    return request;
  }
  queryConvert = (url: string, options: Record<string, any>, resultMap?: Record<string, any>) => {
    return new Promise((resolve, reject) => {
      return this.request(url, options)
        .then((res: any) => {
          const data = res?.data;
          let result = { content: [] } as any;
          if (data) {
            if (data instanceof Array) {
              result = { content: data };
            } else if (data instanceof Object) {
              const { content, dataList, ...rest } = data;
              result = { content: content || dataList || [], ...rest };
            }
          }
          res!.data = result;
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
export default DataConvert;
