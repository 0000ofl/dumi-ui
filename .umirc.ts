/*
 * @Author: ofl
 * @Description:
 * @Date: 2024-02-02 17:21:45
 * @LastEditTime: 2024-05-07 17:07:24
 * @FilePath: \dumi-ui\.umirc.ts
 */
import { defineConfig } from 'dumi';

const repo = 'dumi-ui';

export default defineConfig({
  title: 'ow-ui',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  history: { type: 'hash' },
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi-template',
    },
  ],
  // more config: https://d.umijs.org/config
});
