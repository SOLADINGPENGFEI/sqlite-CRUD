const express = require('express');
const router = express.Router();
const curd = require('mongodb-curd');
const dbname = 'monthA';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**地址查询 */
router.get('/api/getdata', (req, res, next) => {
        curd.find(dbname, 'address', result => {
            if (result) {
                res.send({ code: 1, msg: 'success', data: result })
            } else {
                res.send({ code: 0, msg: 'error' })
            }
        })
    })
    /**添加地址 */
router.post('/api/adddata', (req, res, next) => {
        const { name, tel, add } = req.body;
        if (!name || !tel || !add) {
            return res.send({ code: 2, msg: '参数不完整' })
        }
        curd.insert(dbname, 'address', req.body, result => {
            if (result) {
                res.send({ code: 1, msg: 'success' })
            } else {
                res.send({ code: 0, msg: 'error' })
            }
        })
    })
    /**删除地址 */
router.get('/api/deldata', (req, res, next) => {
        const { _id } = req.query;
        if (!_id) {
            return res.send({ code: 2, msg: '参数不完整' })
        }
        curd.remove(dbname, 'address', req.query, result => {
            if (result) {
                res.send({ code: 1, msg: 'success' })
            } else {
                res.send({ code: 0, msg: 'error' })
            }
        })
    })
    /**修改地址 */
router.get('/api/finddata', (req, res, next) => {
    const { _id } = req.query;
    if (!_id) {
        return res.send({ code: 2, msg: '参数不完整' })
    }
    curd.find(dbname, 'address', req.query, result => {
        if (result) {
            res.send({ code: 1, msg: 'success', data: result })
        } else {
            res.send({ code: 0, msg: 'error' })
        }
    })
})
router.post('/api/updata', (req, res, next) => {
    const { name, tel, add } = req.body;
    if (!name || !tel || !add) {
        return res.send({ code: 2, msg: '参数不完整' })
    }
    curd.update(dbname, 'address', req.body, result => {
        if (result) {
            res.send({ code: 1, msg: 'success' })
        } else {
            res.send({ code: 0, msg: 'error' })
        }
    })
})



module.exports = router;