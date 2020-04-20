import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'

import { app } from './app'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')
