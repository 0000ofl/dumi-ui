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
export function treeForEach({
  handler,
  source = [],
  deep = 0,
  parent = null,
}: any) {
  source.forEach((item: any, index: number) => {
    handler(item, index, deep, parent);
    if (item.children) {
      treeForEach({
        source: item.children,
        handler,
        deep: deep + 1,
        parent: item,
      });
    }
  });
}

/**
 * @description 遍历树
 * @title 遍历树
 * @export false
 */
export function treeMap({ handler, source = [], deep = 0 }: any) {
  return source
    .map((item: any, index: number) => {
      const custom = {} as Record<any, any>;
      const handledData = handler(item, index, deep);
      if (handledData && handledData.children) {
        custom.children = treeMap({
          source: handledData.children,
          handler,
          deep: deep + 1,
        });
        return {
          ...handledData,
          ...custom,
        };
      }
      return handledData;
    })
    .filter((child: any) => !!child);
}

