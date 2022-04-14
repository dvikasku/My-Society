const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const Complain = require('../models/Complain');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the complains using: GET "/api/complain/fetchcomplain". Login required
router.get('/fetchcomplain', fetchuser, async (req, res) => {
    try {
        const compain = await Complain.find({ user: req.user.id });
        res.json(complain)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Get All the complains of user using: GET "/api/complain/fetchallcomplain".
router.get('/fetchallcomplain',fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("role")
        if (user.role != 1){
            return res.status(401).send("Not Allowed");
        }
        const complain = await Complain.find();
        res.json(complain)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Add a new complain using: POST "/api/complain/addcomaplain". Login required
router.post('/addcomplain', fetchuser, [
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { description } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            userId = req.user.id;
            const user = await User.findById(userId).select()
            const complain = new Complain({
                description, user: req.user.id,flat_no: user.flat_no
            })
            const savedComplain = await complain.save()

            res.json(savedComplain)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 4: Update an existing Note using: PUT "/api/complain/updatecomplain". Login required
router.put('/updatecomplain/:id', fetchuser, async (req, res) => {
    const { description} = req.body;
    try {
        // Create a newNote object
        const newComplain = {};
        if (description) { newNote.description = description };

        // Find the note to be updated and update it
        let complain = await Complain.findById(req.params.id);
        if (!complain) { return res.status(404).send("Not Found") }

        if (complain.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        complain = await Complain.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ complain });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/comaplin/deletecomplain". Login required
router.delete('/deletecomplain/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let complain = await Complain.findById(req.params.id);
        if (!complain) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (complain.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        complain = await Complain.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router