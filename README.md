# json



[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

开源地址：

## 目录

- [介绍](#介绍)
- [安装](#安装)
- [快速开始](#快速开始)
- [属性说明](#属性说明)
- [事件](#事件)
- [方法](#方法)
- [自定义样式](#自定义样式)
- [示例](#示例)
- [发布](#发布)
- [贡献指南](#贡献指南)
- [维护者](#维护者)
- [许可证](#许可证)
- [致谢](#致谢)

## 介绍

简要介绍该组件的功能和用途。

## 安装

```bash
pnpm add unplugin-auto-import dyn-components --save-dev
```

修改 vite.config.js

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import DynComponents, {
  unpluginDynReactComponentsResolver,
} from "dyn-components";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DynComponents(),
    AutoImport({
      resolvers: [unpluginDynReactComponentsResolver()],
    }),
  ],
});
```

## 快速开始

```ts
// global import theme.css
import "dyn-components/theme.css";
```

```vue
<template>
  <dyn-react-json :data="{ foo: 'bar' }"></dyn-react-json>
</template>
```

## 属性说明

## 属性（Props）

| 属性名 | 类型     | 默认值 | 必填 | 描述      |
| ------ | -------- | ------ | ---- | --------- |
| data   | `Object` | 否     | 是   | json 对象 |

### 详细说明

- **data**

  - 类型: `Object`
  - 默认值: `否`
  - 描述: 要可视化展示的数据对象。

## 发布

```bash
dyn-components publish
```
