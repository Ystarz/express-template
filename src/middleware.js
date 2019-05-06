/**
 * 参数检查中间件
 * 所有需要读取请求参数的路由都应该调用主动该中间件
 * 该中间件会根据提供的参数名称去寻找指定的参数
 * 若都找到则将其放在 req.Datas 中，若有一个没找到则直接返回 "必填字段空缺"
 * 
 * @param {Array} argsName 接口需要的参数名列表
 */
export function checkArgs(argsName=[]) {
    return (req, res, next) => {
        // 判断请求类型 获取不同的参数存放对象
        const methodType = Object.keys(req.route.methods)[0]
        let reqDatas = []
        switch (methodType) {
            case 'get':
                reqDatas = req.query
            break
            case 'post':
                reqDatas = req.body
            break
            default:
                reqDatas = req.query
        }
        // 在 req 中声明 reqDatas 来存放筛选出的参数
        req.reqDatas = {}
        let argNotExist = false
        argsName.map(item => {
            if (!argNotExist && !(item in reqDatas)) {
                argNotExist = true
                return
            }

            req.reqDatas[item] = reqDatas[item]
        })
        // 如果没有参数不存在则执行下个中间件
        if (!argNotExist) {
            next()
        }
        else {
            res.send({
                state: false,
                msg: '必填字段空缺'
            })
        }
    }
}