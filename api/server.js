const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/accounts', (req,res) => {
    db.select('*').from('accounts')
    .then(item => {
        res.status(200).json({data: item})
    })
    .catch(error => {
        res.status(500).json({error: "Error"})
    })
})

server.get('/api/accounts/:id', (req,res) => {
    db('accounts').where('id', req.params.id)
    .then(item => {
        res.status(200).json({data: item})
    })
    .catch(error => {
        res.status(500).json({error: "Error"})
    })
})

server.post('/api/accounts', (req,res) => {
    const postData = req.body
    db('accounts')
    .insert(postData) 
    .then(ids => {
        const id = ids[0];
        db('accounts')
        .where ({id})
        .first()
        .then(item => {
            res.status(201).json(item)
        }) 
    })
    .catch(error => {
        res.status(500).json({errorMessage: "Error"})
    })
})

server.put('/api/accounts/:id', (req,res) => {
    const changes = req.body
    const {id} = req.params

    db('accounts').where({id})
    .update(changes)
    .then(count => {
        if (count >0 ) {
            res.status(200).json({data: "account updated"})
        } else {
            res.status(404).json({error: "no account by that id"})
        }
    })
})

server.delete('/api/accounts/:id', (req,res) => {
    const {id} = req.params
    db('accounts').where({id})
    .del()
    .then(count => {
        if(count > 0) {
            res.status(201).json({message: "account deleted"})
        } else {
            res.status(404).json({error: "no account by that id"})
        }
    })
    .catch(error => {
        res.status(500).json({error: "Error"})
    })
})

module.exports = server;
