import mysql from 'mysql'
import { dbLogin } from '../config'
let pool = mysql.createPool(dbLogin)

/**
 * 数据库查询封装
 * 
 * 封装从数据库连接池获取连接并进行查询的功能
 * 
 * @param {String} queryStr 查询语句
 * @param {Array} options 查询语句中需要替换的 ? 参数
 */
export const sqlQuery = (queryStr, options = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
                return
            }
            
            connection.query(queryStr, options, (err, result) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(result)
                connection.release()
            })
        })
    })
}
