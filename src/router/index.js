import HelloWorld from './HelloWorld'

export default (app) => {
    app.use('/', HelloWorld)
}