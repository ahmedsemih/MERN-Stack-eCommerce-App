const express = require('express');
const router = express.Router();
const { getAllReports, getReportById, getReportByUserId, addReport, updateReport, deleteReport } = require('../controllers/reportController');

router.route('/').get(getAllReports);
router.route('/:id').get(getReportById);
router.route('/user/:id').get(getReportByUserId);
router.route('/').post(addReport);
router.route('/:id').put(updateReport);
router.route('/:id').delete(deleteReport);

module.exports = router;