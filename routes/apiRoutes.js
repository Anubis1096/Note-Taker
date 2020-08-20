const express = require('express');
const fs = require('fs');
const path = require('path');
const routerAPI = express.Router();

//API GET route
routerAPI.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

//API POST route
routerAPI.post('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;

        // Push data to notes array
        const dataArray = JSON.parse(data);
        dataArray.push(req.body);

        // Assign ID to each note
        dataArray.forEach((item, index) => {
            item.id = index + 1;
        });

        // Write new notes json file
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(dataArray), (err) => {
            if (err) throw err;
            console.log('File write successful!')
        });
    });

    res.sendStatus(200);
})

//API Delete route
routerAPI.delete('/notes/:id', (req, res) => {

    // Check for files to remove
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const targetId = req.params.id;
        const dataArray = JSON.parse(data);

        // Returns items not selected for deletion
        let newDataArray = dataArray.filter((obj) => {
            return obj.id != targetId;
        });

        // Write new notes to json file
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(newDataArray), (err) => {
            if (err) throw err;
            console.log('File write successful!')
        });
    });

    res.sendStatus(200);
})

module.exports = routerAPI;