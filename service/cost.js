const pool = require('./pool');
const constants = require('../constants');
const logUtil = require('../util/logger');

module.exports = {
    getCostDataByOfficeYear: async (officeId, year) => {
        let [rows] = await pool.query('SELECT * FROM pg_cost WHERE office_id = ? AND year = ? ORDER BY MONTH ASC' , [officeId, year]);

        return rows;
    },
    getCostDataAndConsumableByOfficeYear: async (officeId, year) => {
        let sql = 'SELECT ' +
            'a.year, a.month, a.total_cost, a.labour_cost, a.administrative_cost, a.depreciation_cost, (a.variable_cost - b.consumable) AS variable_cost, ' +
            'b.consumable ' +
            'FROM pg_cost a, pg_variable_cost_details b ' +
            'WHERE a.id = b.cost_id ' +
            'AND office_id = ? AND year = ? ' +
            'ORDER BY a.month ASC;';
        let [rows] = await pool.query(sql, [officeId, year]);

        logUtil.sqlTrace('getCostDataAndConsumableByOfficeYear', sql, [officeId, year]);

        return rows;
    },
    getCostDataByOfficeYearMonth: async (officeId, year, month) =>{
        let [rows] = await pool.query('SELECT * FROM pg_cost WHERE year = ? AND month = ? AND office_id = ?', [year, month, officeId]);

        return rows;
    },
    getCostDataByYearMonth: async (year, month) =>{
        let sql = 'SELECT ' +
            'a.labour_cost, ' +
            'a.administrative_cost, ' +
            'a.depreciation_cost, ' +
            'a.variable_cost, ' +
            'a.year, ' +
            'a.month, ' +
            'b.name ' +
            'FROM pg_cost a, pg_offices b ' +
            'WHERE a.office_id = b.id AND a.year = ? AND a.month = ?;';
        let [rows] = await pool.query(sql, [year, month]);

        return rows;
    },
    getCostDataAndConsumableByYearMonth: async (year, month) =>{
        let sql = 'SELECT ' +
            'a.labour_cost, ' +
            'a.administrative_cost, ' +
            'a.depreciation_cost, ' +
            '(a.variable_cost - c.consumable) AS variable_cost, ' +
            'a.year, ' +
            'a.month, ' +
            'b.name, ' +
            'c.consumable ' +
            'FROM pg_cost a, pg_offices b, pg_variable_cost_details c ' +
            'WHERE a.office_id = b.id AND a.id = c.cost_id AND a.year = ? AND a.month = ?;';
        let [rows] = await pool.query(sql, [year, month]);

        return rows;
    },
    getCostDetailsByCostId: async (costId) => {
        let sql = 'select ' +
            'a.id, ' +
            'a.year,a.month,' +
            'a.total_cost, ' +
            'a.labour_cost, ' +
            'a.administrative_cost, ' +
            'a.depreciation_cost, ' +
            'a.variable_cost, ' +
            'b.salary, ' +
            'b.social_security, ' +
            'b.commercial_insurance, ' +
            'b.allowance, ' +
            'b.training, ' +
            'b.trade_union, ' +
            'b.labor_protection,' +
            'b.housing, ' +
            'b.tech_award, ' +
            'b.non_monetary, ' +
            'b.other AS labour_other, ' +
            'c.phone, ' +
            'c.mobile, ' +
            'c.post, ' +
            'c.books, ' +
            'c.other AS admin_other, ' +
            'd.trip, ' +
            'd.water_eletric, ' +
            'd.repair, ' +
            'd.consumable, ' +
            'd.rental, ' +
            'd.meeting, ' +
            'd.advertisement, ' +
            'd.greening, ' +
            'd.hospitality, ' +
            'd.decoration, ' +
            'd.sales_service, ' +
            'd.consultant, ' +
            'd.services, ' +
            'd.sampling, ' +
            'd.inspection, ' +
            'd.tax, ' +
            'd.cleaning, ' +
            'd.vehicle, ' +
            'd.other AS variable_other, ' +
            'e.name ' +
            'FROM pg_cost a, pg_labour_cost_details b, pg_administrative_cost_details c, pg_variable_cost_details d, pg_offices e ' +
            'WHERE a.id = b.cost_id AND a.id = c.cost_id AND a.id = d.cost_id AND a.office_id = e.id ' +
            'AND a.id = ?';
        let [rows] = await pool.query(sql, costId);

        return rows;
    },
    getAllCostDataByOfficeYearMonth: async (officeId, year, month) => {
        let sql = 'select ' +
            'a.id, ' +
            'a.year,a.month,' +
            'a.total_cost, ' +
            'a.labour_cost, ' +
            'a.administrative_cost, ' +
            'a.depreciation_cost, ' +
            'a.variable_cost, ' +
            'b.salary, ' +
            'b.social_security, ' +
            'b.commercial_insurance, ' +
            'b.allowance, ' +
            'b.training, ' +
            'b.trade_union, ' +
            'b.labor_protection,' +
            'b.housing, ' +
            'b.tech_award, ' +
            'b.non_monetary, ' +
            'b.other AS labour_other, ' +
            'c.phone, ' +
            'c.mobile, ' +
            'c.post, ' +
            'c.books, ' +
            'c.other AS admin_other, ' +
            'd.trip, ' +
            'd.water_eletric, ' +
            'd.repair, ' +
            'd.consumable, ' +
            'd.rental, ' +
            'd.meeting, ' +
            'd.advertisement, ' +
            'd.greening, ' +
            'd.hospitality, ' +
            'd.decoration, ' +
            'd.sales_service, ' +
            'd.consultant, ' +
            'd.services, ' +
            'd.sampling, ' +
            'd.inspection, ' +
            'd.tax, ' +
            'd.cleaning, ' +
            'd.vehicle, ' +
            'd.other AS variable_other, ' +
            'e.name ' +
            'FROM pg_cost a, pg_labour_cost_details b, pg_administrative_cost_details c, pg_variable_cost_details d, pg_offices e ' +
            'WHERE a.id = b.cost_id AND a.id = c.cost_id AND a.id = d.cost_id AND a.office_id = e.id ' +
            'AND a.office_id = ? AND a.year = ? AND a.month = ?';
        let [rows] = await pool.query(sql, [officeId, year, month]);

        return rows;
    },
    getAllCostData: async () => {
        let [rows] = await pool.query('SELECT a.id, a.year, a.month, a.total_cost, a.labour_cost, a.administrative_cost, a.depreciation_cost, a.variable_cost, b.name FROM pg_cost a, pg_offices b WHERE a.office_id = b.id ORDER BY a.year ASC, a.month ASC;');

        return rows;
    },
    getCostDataRowCountByOfficeYearMonth: async (officeId, year, month) => {
        let officeIdClause = officeId == '-1' ? '' : ` AND office_id = ${officeId} `;
        let yearClause = year == '-1' ? '' : ` AND year = ${year} `;
        let monthClause = month == '-1' ? '' : ` AND month = ${month} `;

        let sql = `SELECT COUNT(id) AS rowCount FROM pg_cost WHERE 1=1 ${officeIdClause} ${yearClause} ${monthClause};`;
        let rows = await pool.query(sql);

        return rows[0][0].rowCount;
    },
    getCostDataByOfficeYearMonthPage: async (officeId, year, month, start) => {
        let officeIdClause = officeId == '-1' ? '' : ` AND office_id = ${officeId} `;
        let yearClause = year == '-1' ? '' : ` AND year = ${year} `;
        let monthClause = month == '-1' ? '' : ` AND month = ${month} `;

        let limitClause = '';
        if(start != null && start != undefined){
            limitClause = ` LIMIT ${start}, ${constants.PAGE_SIZE}`;
        }

        let sql = `SELECT a.id, a.year, a.month, a.total_cost, a.labour_cost, a.administrative_cost, a.depreciation_cost, a.variable_cost, b.name FROM pg_cost a, pg_offices b WHERE a.office_id = b.id ${officeIdClause} ${yearClause} ${monthClause} ORDER BY a.year ASC, a.month ASC ${limitClause};`;
        console.log(sql);
        let [rows] = await pool.query(sql);

        return rows;
    },
    addCost: async (cost) => {
        let queryStatement = 'INSERT INTO pg_cost SET ?';
        let result = await pool.query(queryStatement, cost);

        logUtil.sqlTrace('addCost', queryStatement, [cost]);

        return result;
    },
    addLabourCostDetails: async (labourCostDetails) => {
        let result = pool.query('INSERT INTO pg_labour_cost_details SET ?', labourCostDetails);

        return result;
    },
    addAdminCostDetails: async (adminCostDetails) => {
        let result = pool.query('INSERT INTO pg_administrative_cost_details SET ?', adminCostDetails);

        return result;
    },
    addVariableCostDetails: async (variableCostDetails) => {
        let result = pool.query('INSERT INTO pg_variable_cost_details SET ?', variableCostDetails);

        return result;
    },
    updateCostByOfficeYearMonth: async (cost, officeId, year, month) => {
        let queryStatement = 'UPDATE pg_cost SET ? WHERE office_id = ? AND year = ? AND month = ?';
        let result = pool.query(queryStatement, [cost, officeId, year, month]);

        logUtil.sqlTrace('updateCostByOfficeYearMonth', queryStatement, [cost, officeId, year, month]);

        return result;
    },
    getCostIdByYearMonth: async (year, month) => {
        let result = await pool.query('SELECT id FROM pg_cost WHERE year = ? AND month = ?', [year, month]);
        let costId = result[0][0].id;

        return costId;
    },
    updateLabourCostDetailsByCostId: async (labourCostDetails, costId) => {
        let result = await pool.query('UPDATE pg_labour_cost_details SET ? WHERE cost_id = ?', [labourCostDetails, costId]);

        return result;
    },
    updateAdminCostDetailsByCostId: async (adminCostDetails, costId) => {
        let result = await pool.query('UPDATE pg_administrative_cost_details SET ? WHERE cost_id = ?', [adminCostDetails, costId]);

        return result;
    },
    updateVariableCostDetailsByCostId: async (variableCostDetail, costId) => {
        let result = await pool.query('UPDATE pg_variable_cost_details SET ? WHERE cost_id = ?', [variableCostDetail, costId]);

        return result;
    }
};