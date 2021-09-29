const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3-transform");
const sharp = require("sharp");

const Product = require("./../models/product");

// exports.uploadProductImage = (req, res, next) => {
//   console.log("Here!");
//   upload.single("productImg");
//   console.log("req:", req);

//   res.status(200).json({
//     status: "Sucess",
//   });
// };

const s3 = new aws.S3({ apiVersion: "2006-03-01" });
s3.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-west-1",
});

const multerFilter = (req, file, cb) => {
  // Test if uploaded file is an image. Pass true into callback function if image, otherwise false if not.
  // console.log("file:", file);
  console.log("Hello??");
  if (file.mimetype.startsWith("image")) {
    console.log("passes through filter");
    cb(null, true);
  } else {
    cb(new AppError("Not an image!", 400), false);
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_PRODUCTS,
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [
      {
        id: "original",
        key: function (req, file, cb) {
          cb(null, "placeholder.jpeg");
        },
        transform: function (req, file, cb) {
          cb(null, sharp.apply().resize(400, 400).jpeg());
        },
      },
    ],
  }),
  fileFilter: multerFilter,
});

exports.uploadProductImage = upload.single("photo");

exports.updateProduct = (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
};

exports.getProductImages = async (req, res, next) => {
  try {
    const bucket = process.env.BUCKET_PRODUCTS;

    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "eu-west-1",
    });

    // Retrieve list of object keys
    const s3 = new aws.S3();
    const response = await s3
      .listObjectsV2({
        Bucket: bucket,
      })
      .promise();

    // Retrieve signed URLs
    let imageKeys = await Promise.all(
      response.Contents.map(async (k) => {
        let url = await s3.getSignedUrlPromise("getObject", {
          Bucket: bucket,
          Key: k.Key,
          Expires: 3600,
        });
        return { Key: k.Key, url };
      })
    );
    res.status(200).json({
      status: "Success",
      data: {
        imageKeys,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Bad request",
      error: err,
    });
  }
};
