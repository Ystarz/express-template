# 配置

请确认 `src/config.js` 中 `swaggerConfig.files` 的路径填写无误

# 使用

- 第一行填写接口介绍
- `@route` 表示接口类型和接口路径
- `@group` 表示接口所处的分组 
- `@summary` 表示接口简介
- `@param` 
    - `{...}` 里指定参数的类型，注意首字母小写
    - `[paramName].[paramPlace].[required]` 第一个指定参数名，第二个指定参数来源 `query/body` 第三个指定是否必须
- `@returns` 表示返回值    

```js
/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/someRoute', (req, res) => {
    ...
})
```

# 参考

[express-swagger-generator](https://github.com/pgroot/express-swagger-generator)