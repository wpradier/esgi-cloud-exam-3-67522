module.exports = {
  s3: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    endpoint: 's3.eu-west-1.amazonaws.com',
    bucket: 'esgi-cloud-exam-bucket-67522',
  },
  suffix: {
    small: '_small.jpg',
    full: '_full.jpg'
  }
};
