<h1 align="center">create-conventional-app</h1>
<p align="center">约定代替编码，更灵活、迅速的脚手架搭建工具</p>

---

## 介绍

create-conventional-app 对脚手架核心业务进行封装，使用者只需关心脚手架的内容，约定代替编码的方式更灵活、迅速的创建脚手架。
<br />

## 安装

```shell
npm install -g create-conventional-app
```

<br />

## 演示

```sh
npm create conventional-app <project-name>
# or
npm init conventional-app <project-name>
# or
npx create-conventional-app <project-name>
```

<br />

## 使用

如果我们只需要使用这个仓库快速创建脚手架，我们只需要关心`templates`文件夹。仓库会自动扫描`templates`文件夹下的模板去提供使用者选择。

`template`文件夹第一层是大项目名称，例如 Vue3、React18 这种命名。进入其中一个大项目文件夹，里面还有三个文件夹。

- `base`文件夹：里面的内容就是一个项目的基本构架，里面所有内容都是直接复制到初始化路径

- `ejs`文件夹：里面的内容是用于更精细化的配置可选配置

- `options`文件夹：就是用于给用户选择第三方库的权利，例如 Axios、Pinia 或者自己个人配置等等

<br />

## 约定

`templates`文件夹就是我们脚手架模板存放的地方，里面使用约定代替配置的方式，有着以下约定

- templates 文件夹里面的第一层为模板名，例如：templates/vue3、templates/nest
- 模板名里面有着三个文件夹，分别是`base`、`options`、`ejs`（可通过配置变量自定义命名）
- options 文件夹里面的各种选项里面的文件目录需要跟 base 目录一一对应
- options 里面的`package.json`会和 base 的`package.json`进行合并，其他文件全是替换
- options 里面的`ejsData.js`为参数变量，用于给 ejs 模板引擎渲染的，同时里面可以定义一个回调函数，到该 options 执行完成之后会调用回调函数，可以接收两个值，一个是新项目路径，一个是 config 参数。该文件也不会添加到 base 里（可通过配置变量自定义命名）
- ejs 文件夹为模板引擎，里面的文件目录也是和 base 目录一一对应，例如：`main.ts.ejs`文件名最终合并到 base 里面的名字为`main.ts`，也会覆盖 base

核心函数`createTemplate`接收三个参数：

```ts
const config: configType = {
  // 渲染参数
  projectName: 'test-project',
  template: 'umi4',
  ejsDataJsAlias: 'ejsData.js',
  options: ['dayjs']
}

const templatesRoot = path.resolve(__dirname, './templates') // 模板文件夹path

createTemplate(config, templatesRoot, ({ newProjectPath }) => {
  // 渲染完成的回调函数
})
```

仓库里面的入口文件`index.ts`询问方式可以自定义，你只需要将数据给到 createTemplate 渲染函数即可

<br />

## 渲染流程

```text
1. 数据传递createTemplate函数

2. createTemplate函数内部设置参数默认值

3. 复制base文件夹进入目标路径

4. 递归Options文件夹下面的所有ejsData.js文件并获得它们的Key，因为ejs模板存在不存在的Key会报错（考虑换一个）

5. 根据数据里的options渲染指定的插件，并且加载插件目录下的ejsData.js数据

6. 渲染Ejs文件夹

7. 调用收尾函数 （重置package.json文件）

8. 调用用户的回调函数
```
