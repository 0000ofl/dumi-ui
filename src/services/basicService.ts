import request from 'umi-request';

class BasicService {
  queryUrl = '/api/treeList2';
  queryMethodType = 'post';
  dataMap = ['data', 'list'];
  request = request;

  async query(params: any) {
    const data = await this.request[this.queryMethodType](this.queryUrl, {
      data: params,
    });
    let result = data;
    this.dataMap.forEach(item => {
      result = result![item];
    });
    return result;
  }
}

export default BasicService;