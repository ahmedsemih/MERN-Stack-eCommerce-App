const Report = require('../models/Report');

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find({});

        res.status(200).json({
            reports
        });

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);

        res.status(200).json({
            report
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getReportByUserId = async (req, res) => {
    try {
        const reports = await Report.find({ userId: req.params.id });

        res.status(200).json({
            reports
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addReport = async (req, res) => {
    try {
        const newReport = await Report.create(req.body);

        res.status(201).json({
            newReport
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            report
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);

        res.status(200).json({
            report
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};