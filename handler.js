'use strict';
const dotenv = require('dotenv')

dotenv.config({path: './env'});
const connectToDatabase = require('./db');
const Video = require('./models/video');


module.exports.create = async (event,context,callback) =>{

    context.callbackWaitsForEmptyEventLoop = false;

    return connectToDatabase()
    .then(()=>
      await  Video.create(JSON.parse(event.body))
    )
    .then(video => callback(null,{
        statusCode: 200,
        body: JSON.stringify(video)
    }))
    .catch(err => callback(null,{
        statusCode: err.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not create the video.'
    }))
}

module.exports.getOne = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return connectToDatabase()
      .then(() =>
        await Video.findById(event.pathParameters.id)
      )
      .then(video => callback(null, {
        statusCode: 200,
        body: JSON.stringify(video)
      }))
      .catch(err => callback(null, {
        statusCode: err.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not fetch the video.'
      }));
  };

  module.exports.getAll = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return connectToDatabase()
      .then(() =>
       await Video.find()
      )
      .then(videos => callback(null, {
        statusCode: 200,
        body: JSON.stringify(videos)
      }))
      .catch(err => callback(null, {
        statusCode: err.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not fetch the videos.'
      }))
  
    };