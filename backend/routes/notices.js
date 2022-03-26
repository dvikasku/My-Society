const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const Notices = require('../models/Notices');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notices/fetchnotices".
router.get('/fetchallnotices', async (req, res) => {
    try {
        const notices = await Notices.find();
        res.json(notices)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notices/addnotice". Login required
router.post('/addnotice', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            // checking if user is admin or not.
            userId = req.user.id;
            const user = await User.findById(userId).select("role")
            if (user.role != 1){
                return res.status(401).send("Not Allowed");
            }
            const { title, description} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const notices = new Notices({
                title, description, user: req.user.id
            })
            const savedNotices = await notices.save()

            res.json(savedNotices)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenotice/:id', fetchuser, async (req, res) => {
    const { title, description} = req.body;
    try {
        // checking if user is admin or not.
        userId = req.user.id;
        const user = await User.findById(userId).select("role")
        if (user.role != 1){
            return res.status(401).send("Not Allowed");
        }
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };

        // Find the note to be updated and update it
        let note = await Notices.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notices.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // checking if user is admin or not.
        userId = req.user.id;
        const user = await User.findById(userId).select("role")
        if (user.role != 1){
            return res.status(401).send("Not Allowed");
        }
        // Find the note to be delete and delete it
        let note = await Notices.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        note = await Notices.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Notice has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router