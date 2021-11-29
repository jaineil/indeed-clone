import AWS from "aws-sdk";
const ACCESS_KEY = "AKIAQL5KLZPDA3RB7SER";
const SECRET_KEY = "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";
const S3_BUCKET = "indeed-clone";

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: "us-west-2",
});

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

export default uploadFile