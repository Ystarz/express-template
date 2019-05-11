# express-template

自用express项目模板，该项目整合了 babel 和 热更新，引入了 mysql 的数据库查询，并封装了一些主要操作

# 需求

- node版本 10.13.0
- yarn版本 1.13

# 部署

- 安装 `yarn install`
- 运行 `npm run start`

# 内容

## 中间件

本模板整合了 `cros` 跨域中间件、`bodyParser / multer` post解析中间件以及 `morgan` 日志中间件，并自定义了一个 `checkArgs` 参数检查中间件

**checkArgs 参数检查中间件**

该中间件会将接受的所以参数转换成一个字符串数组，数组的元素是后续中间件执行所必须的参数名，该中间件会去指定的位置寻找该数组中的参数 (GET请求 > `req.query`, POST请求 > `req.body`)，若请求中包含全部必填参数，则将正常触发下一个中间件。而只要出现参数没有找到，该中间件将会直接返回如下对象：

```js
{
    state: false,
    msg: '必填参数空缺'
}
```

示例用法（可参考 `src/router/HelloWorld` 路由中的 `/needArgs` 路由）

```js
// 引入checkArgs
import { checkArgs } from '../middleware'

// 将中间件插入路由, 该路由需要 username 和 password 参数
router.get('/testRouter', checkArgs('username', 'password'), (req, res) => {
    let { username, password } = req.reqDatas
    res.send(username)
})
```

## mysql 查询封装

- mysql 数据库的连接参数定义在 `src/config.js` 的 `dbLogin` 中
- mysql 连接池定义在 `src/db/pool.js` 中，并且在该文件中也封装了 mysql 的查询操作 `sqlQuery`

**sqlQuery 数据库查询**

`sqlQuery` 和 mysql 的 `query` 方法接受的参数一样，第一个参数是查询语句，第二个参数是一个数组，数组元素是查询语句中 ? 占位符的替换值

示例用法

请参考 `src/router/HelloWorld` 路由中的 `/sqlQuery` 路由。请注意，直接访问该方法将会出错，请在 `src/config.js` 中正确配置数据库的连接信息 

## https 集成

在 `src/app.js` 中集成了https服务，若想启用https服务，请按如下操作进行

- 解除 `src/app.js` 中 *引入https服务中间件* 下的代码
- 填写上述被注释代码中 `credentials` 对象中的证书 key 和 crt 文件路径
- 重启服务，https服务将被开放在 3001 端口上，默认开放端口定义在 `src/config.js` 的 `startPort` 中。

# 结构

```
├── src ------------------------------- 代码主目录
│   ├── db ---------------------------- 数据库相关代码
│   │   ├── pool.js ------------------- 数据库连接池实现
│   ├── router ------------------------ 路由目录
│   │   ├── HelloWorld.js ------------- helloworld代码示例
│   │   ├── index.js ------------------ 路由装载到app的实现
│   ├── app.js ------------------------ epxress app
│   ├── config.js --------------------- 静态设置
│   ├── middleware.js ----------------- 自定义的中间件
├── start.js -------------------------- 使用babel编译代码
```