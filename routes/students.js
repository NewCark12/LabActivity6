const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const requireAuth = require('../middleware/auth');

router.get('/', requireAuth, async (req, res) => {
    try {
        const students = await Student.find().populate('createdBy', 'name email');
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => { 
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', requireAuth, async (req, res) => { // Added requireAuth
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully', deletedStudent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const stats = await Student.aggregate([
            { $match: { status: 'active' } }, 
            
            { 
                $group: { 
                    _id: '$department', 
                    totalStudents: { $sum: 1 },
                    avgGpa: { $avg: '$gpa' }
                } 
            },
            
            { $sort: { totalStudents: -1 } }
        ]);

        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;