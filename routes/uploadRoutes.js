require("dotenv").config();
const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const mime = require("mime-types");
const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");

// const s3 = new AWS.S3({
//   accessKeyId: keys.accessKeyId,
//   secretAccessKey: keys.secretAccessKey,
//   signatureVersion: "v4",
//   region: "us-east-2"
// });

const s3 = new AWS.S3({
  signatureVersion: "v4"
});

module.exports = app => {
  app.post("/api/upload", requireLogin, (req, res) => {
    const { file } = req.body;

    const key = `${req.user.id}/${uuid()}.${mime.extension(mime.lookup(file))}`;

    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "blogster-bucket-djw",
        ContentType: mime.lookup(file),
        Key: key
      },
      (err, url) => res.send({ key, url })
    );
  });
};
