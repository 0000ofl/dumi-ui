/*
 * @Author: ofl
 * @Description:
 * @Date: 2024-02-01 15:05:59
 * @LastEditTime: 2024-02-01 15:06:08
 * @FilePath: \dumi-template\src\global.d.ts
 */
/* eslint-disable no-unused-vars */
declare module '*.less' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.svg' {
  export const ReactComponent = (props: any) => JSX.Element;
  export default ReactComponent;
}

interface Window {
  seal_execute?: any;
  QUARK_ICON_SCRIPT_URL?: string;
  getSelection: () => any;
  cacheMap: any;
  __POWERED_BY_QIANKUN__?: boolean;
  QUARK_HAS_LOCAL_ICON?: boolean;
  QUARK_UMI_REQUEST: any;
  QUARK_RIGHT_GETED_BY_COMPONENT?: boolean;
  jspdf?: any;
  amsFun?: any
}

declare const global: NodeJS.Global & typeof globalThis & { cacheMap?: any; notificationList?: any};


declare module "umi" {
  export const request: IRequest;
  export const Link: any;
}
