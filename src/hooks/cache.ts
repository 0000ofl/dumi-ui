import _ from "lodash";

const cacheGlobal: any = global || globalThis || window;

if (!cacheGlobal.cacheMap) {
  cacheGlobal.cacheMap = {};
}

type StateCahche = {
  model?: any;
  searchInitialValues?: Record<any, any>;
};

type cacheMapType = Record<string, Record<string, StateCahche>>;
class QuarkCache {
  cacheMap = cacheGlobal.cacheMap as cacheMapType;
  initCache = (funCode: string, stateId: string) => {
    if (!this.cacheMap[funCode]) {
      this.cacheMap[funCode] = {};
    }
    if (!this.cacheMap[funCode][stateId]) {
      this.cacheMap[funCode][stateId] = {};
    }
  }
  mergeCache = (cache: cacheMapType) => {
    Object.keys(cache).forEach(key => {
      this.cacheMap[key] = _.cloneDeep(cache[key]);
    });
  }
  setCache = (funCode: string, stateId: string, stateCache: any) => {
    this.initCache(funCode, stateId);
    this.cacheMap[funCode][stateId] = {
      ...this.cacheMap[funCode][stateId],
      ..._.cloneDeep(stateCache),
    };
  }
  getCache = (funCode: string, stateId: string) => {
    if (!funCode || !stateId) {
      return;
    }
    this.initCache(funCode, stateId);
    return this.cacheMap[funCode][stateId];
  }
}

export default new QuarkCache();
