const express = require("express");
const router = express.Router();
const connection = require('../connect')
const auth = require('../auth')
const utils = require('../utils')
var sql_queries = require('../sql')

router.get('/:franchise/countries/', auth.validateAccess, (req, res) => {
    const franchise = req.params.franchise
    const startdate = utils.parseDate(req.query.start) ?? utils.defaultStartDate();
    const enddate = utils.parseDate(req.query.end) ?? utils.defaultEndDate();

    connection.execute({
        sqlText: sql_queries.top_10_countries,
        binds: [franchise, startdate, enddate],
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Unable to retrieve order data', err);
                res.status(500).json({ error: 'Unable to retrieve order data' });
            } else {
                res.status(200).json(rows);
            }
        },
    });
    
});

router.get('/:franchise/trucks/:truckbrandname/sales_topitems', auth.validateAccess, (req, res) => {
    const franchise = req.params.franchise;
    const truckbrandname = req.params.truckbrandname;
    const startdate = utils.parseDate(req.query.start) ?? utils.defaultStartDate();
    const enddate = utils.parseDate(req.query.end) ?? utils.defaultEndDate();

    connection.execute({
        sqlText: sql_queries.top_selling_items_by_truck,
        binds: [franchise, startdate, enddate, truckbrandname],
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Unable to retrieve order data', err);
                res.status(500).json({ error: 'Unable to retrieve order data' });
            } else {
                res.status(200).json(rows);
            }
        },
    });
});


// Additional routes
router.get('/:franchise/trucks/', auth.validateAccess, (req, res) => {
    const franchise = req.params.franchise;
    const startdate = utils.parseDate(req.query.start) ?? utils.defaultStartDate();
    const enddate = utils.parseDate(req.query.end) ?? utils.defaultEndDate();

    connection.execute({
        sqlText: sql_queries.top_10_trucks,
        binds: [franchise, startdate, enddate],
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Unable to retrieve order data', err);
                res.status(500).json({ error: 'Unable to retrieve order data' });
            } else {
                res.status(200).json(rows);
            }
        },
    });
});

router.get('/:franchise/revenue/:year(\\d{4})', auth.validateAccess, (req, res) => {
    const franchise = req.params.franchise;
    const year = req.params.year;

    connection.execute({
        sqlText: sql_queries.ytd_revenue_by_country,
        binds: [franchise, year],
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Unable to retrieve order data', err);
                res.status(500).json({ error: 'Unable to retrieve order data' });
            } else {
                res.status(200).json(rows);
            }
        },
    });
});

router.get('/:franchise/trucks/:truckbrandname/sales_dayofweek', auth.validateAccess, (req, res) => {
    const franchise = req.params.franchise;
    const truckbrandname = req.params.truckbrandname;
    const startdate = utils.parseDate(req.query.start) ?? utils.defaultStartDate();
    const enddate = utils.parseDate(req.query.end) ?? utils.defaultEndDate();

    connection.execute({
        sqlText: sql_queries.sales_by_day_of_week,
        binds: [franchise, startdate, enddate, truckbrandname],
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Unable to retrieve order data', err);
                res.status(500).json({ error: 'Unable to retrieve order data' });
            } else {
                res.status(200).json(rows);
            }
        },
    });
});

router.get('/:franchise/trucks/:truckbrandname/sales_topitems_dayofweek', auth.validateAccess, (req, res) => {
    const franchise = req.params.franchise;
    const truckbrandname = req.params.truckbrandname;
    const startdate = utils.parseDate(req.query.start) ?? utils.defaultStartDate();
    const enddate = utils.parseDate(req.query.end) ?? utils.defaultEndDate();

    connection.execute({
        sqlText: sql_queries.top_selling_items_by_day_of_week,
        binds: [franchise, startdate, enddate, truckbrandname],
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Unable to retrieve order data', err);
                res.status(500).json({ error: 'Unable to retrieve order data' });
            } else {
                res.status(200).json(rows);
            }
        },
    });
});

router.get('/:franchise/trucks/:truckbrandname/locations', auth.validateAccess, (req, res) => {
    const franchise = req.params.franchise;
    const truckbrandname = req.params.truckbrandname;
    const startdate = utils.parseDate(req.query.start) ?? utils.defaultStartDate();
    const enddate = utils.parseDate(req.query.end) ?? utils.defaultEndDate();

    connection.execute({
        sqlText: sql_queries.best_cities_by_day_ofweek,
        binds: [franchise, startdate, enddate, truckbrandname],
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Unable to retrieve order data', err);
                res.status(500).json({ error: 'Unable to retrieve order data' });
            } else {
                res.status(200).json(rows);
            }
        },
    });
});


module.exports = router;