const express = require('express');
const pug = require('pug');
const AWS = require('aws-sdk');
const config = require('./config');

const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'pug');
app.use('/img', express.static('img'));
app.use('/styles', express.static('styles'));
app.use('/scripts', express.static('scripts'));

AWS.config.update(config.s3);
const s3 = new AWS.S3();

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

app.get('/', function (req, res) {

  const params = {
    Bucket: config.s3.bucket,
    Delimiter: '/'
  };

  s3.listObjects(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      const images = [];
      console.log(data)
      for (i in data.Contents) {
        const image = data.Contents[i];
        const imageProps = {
          url: '/file/' + image.Key,
          full_suffix: config.suffix.full,
          rotation: (Math.random() * 20 - 10)
        };
        images.push(imageProps);
      }
      res.render('index', {
        'name': 'Gallery',
        'images': images
      });
    }
  });
});

app.get('/file/:filename', function (req, res) {
  const params = {
    Bucket: config.s3.bucket,
    Key: req.params.filename,
  };

  s3.getObject(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      console.log(data);
      res.contentType(data.ContentType);
      res.send(data.Body);
    }
  });
})

const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});
