import { swaggerConfig } from '../config'

export default function setSwagger(app) {
    const expressSwagger = require('express-swagger-generator')(app)
    expressSwagger(swaggerConfig)
}