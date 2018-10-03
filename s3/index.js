const aws = require('aws-sdk');
const s3 = new aws.S3();


const uploadToS3 = (buffer, userId, contactId) => {
  return new Promise((resolve, reject) => {
    const params = getUploadParams(buffer, userId, contactId);
    s3.putObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
};


const getUploadParams = (buffer, userId, contactId) => {
  return {
    Bucket : "contacts-images",
    Key : `${userId}/${contactId}.png`,
    Body : buffer
  }
};

module.exports = { uploadToS3 };