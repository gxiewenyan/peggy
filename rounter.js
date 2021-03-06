const router = require('koa-router')();
const HomeController = require('./controller/home');
const ExcelController = require('./controller/excel');
const MysqlController = require('./controller/mysql');
const UserController = require('./controller/user');

module.exports = (app) => {
    router.get('/', HomeController.index);

    router.get('/home', HomeController.home);

    router.get('/home/:id/:name', HomeController.homeParams);

    router.get('/user', HomeController.login);

    router.get('/hbs', HomeController.hbs);

    router.post('/user/register', HomeController.register);

    router.get('/json', HomeController.json);

    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------

    router.get('/xls', ExcelController.parse);

    // 上传页面
    router.get('/p/upload', ExcelController.upload);

    // 上传表单提交
    router.post('/upload', ExcelController.uploadHandler);

    // 数据录入页面
    router.get('/p/dataInput', MysqlController.dataInputPageHandler);

    // 已录数据页面
    router.get('/p/submittedData', MysqlController.submittedDataPageHandler);
    router.get('/a/getSubmittedData', MysqlController.submittedDataInterface);

    // 成本详情页面
    router.get('/p/costDetails/:costId/:isShowNav', MysqlController.costDetailsHandler);

    /*  ------------- 图表页 ------------- */
    // 登录页面
    router.get('/p/login', UserController.loginHandler);

    // 堆叠柱状图页面
    router.get('/p/stackedBar', MysqlController.stakedBarByOfficeHandler);

    // 成本一览表页面
    router.get('/p/costList', MysqlController.costListHandler);


    /*  ------------- 接口 ------------- */
    // 登录
    router.post('/login', UserController.loginInterface);
    // 获取堆叠柱状图数据
    router.get('/getAnnualCostDataByOfficeId', MysqlController.stackedBarByOfficeInterface);

    // 获取成本一览表数据
    router.get('/getCostListData', MysqlController.costListDataInterface);

    // 获取成本数据
    router.get('/getCostData', MysqlController.costDataInterface);

    // 获取成本详情
    router.get('/a/getCostDetails', MysqlController.costDetailsInterface);

    // 提交数据
    router.post('/a/submitData', MysqlController.submitDataInterface);

    app.use(router.routes())
        .use(router.allowedMethods())
};