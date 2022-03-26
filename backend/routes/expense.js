const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const Expense = require('../models/Expense');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the expense using: GET "/api/expense/fetchexpense".
router.get('/fetchallexpense', async (req, res) => {
    try {
        const expense = await Expense.find();
        res.json(expense)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/expense/addexpense". Login required
router.post('/addexpense', fetchuser, [
    body('cost', 'Enter Cost in Rupess').isLength({ min: 3 }),
    body('date', 'Enter a valid Date').isLength({ min: 3 }),
    body('reason', 'reason must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            // checking if user is admin or not.
            userId = req.user.id;
            const user = await User.findById(userId).select("role")
            if (user.role != 1){
                return res.status(401).send("Not Allowed");
            }
            const { cost, reason, date} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const expense = new Expense({
                cost, reason, date, user: req.user.id
            })
            const savedExpense = await expense.save()

            res.json(savedExpense)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Note using: PUT "/api/expense/updateespense". Login required
router.put('/updateexpense/:id', fetchuser, async (req, res) => {
    const { cost, reason, date} = req.body;
    try {
        // checking if user is admin or not.
        userId = req.user.id;
        const user = await User.findById(userId).select("role")
        if (user.role != 1){
            return res.status(401).send("Not Allowed");
        }
        // Create a newNote object
        const newExpense = {};
        if (cost) { newExpense.cost = cost };
        if (reason) { newNote.reason = reason };
        if (date) { newExpense.date = date };

        // Find the note to be updated and update it
        let note = await Expense.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Expense.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/expense/deleteexpense". Login required
router.delete('/deleteexpense/:id', fetchuser, async (req, res) => {
    try {
        // checking if user is admin or not.
        userId = req.user.id;
        const user = await User.findById(userId).select("role")
        if (user.role != 1){
            return res.status(401).send("Not Allowed");
        }
        // Find the note to be delete and delete it
        let note = await Expense.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        note = await Expense.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Notice has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router