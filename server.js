const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const { uploadToS3 } = require('./s3');
const { createMarkedImage } = require('./canvas');

const app = express();
app.use(bodyParser.urlencoded());

const port = process.env.PORT || 3000;

app.post('/contacts/mark-existing', (req, res) => {
  const { image_url, user_id, contact_id } = req.body;
  processRequest(image_url, user_id, contact_id, res);
});


app.post('/contacts/create-marked', (req, res) => {
  const { user_id, contact_id} = req.body;

  const imageUrl = 'blue-head.jpg';
  processRequest(imageUrl, user_id, contact_id, res);
});


const processRequest = (imageUrl, userId, contactId, res) => {
  createMarkedImage(imageUrl)
    .then(imageBuffer => {
      return uploadToS3(imageBuffer, userId, contactId);
    }).then(s3Data => {
    res.send(s3Data.ETag);
  }).catch(error => {
    console.log(error);
    res.status(400).send(error.message)
  });
};


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports.handler = serverless(app);