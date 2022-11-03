const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const streamifier = require('streamifier');

const upload = multer();

// to take the image parameter from the formdata
exports.getFile = (key) => upload.single(key);

// Uploading image function to our cloudinary and get its URL
const uploadFile = async (buffer, uploadOptions) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    // Convert buffer to object mode before uploading it
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Execute upload image function to our cloudiary and store the URL to our DB
exports.storeLink = (filename, folderPath, type) => async (req, res, next) => {
  if (!req.file) return next();

  // Upload Options are the options that we will pass to our upload function in cloudinary
  const uploadOptions = {
    upload_preset: 'ml_default',
    folder: `quiz-app/${folderPath}`,
  };
  if (filename === 'original') {
    uploadOptions.public_id = req.file.originalname.split('.')[0];
  }
  if (type === 'userImage') {
    uploadOptions.transformation = {
      gravity: 'faces',
      height: 100,
      width: 100,
      crop: 'thumb',
    };
  }

  const uploadTester = await uploadFile(req.file.buffer, uploadOptions);
  req.body.image = uploadTester.secure_url;

  /**
   * Deleting the previous image if existed for the user
   * NOTE: its better to make this operation works on another thread where there is no need to
   * let user wait for handling cloud storage
   */
  if (req.user.image) {
    const imageId = req.user.image.split('/').reverse()[0].split('.')[0];
    await cloudinary.uploader.destroy(`quiz-app/${folderPath}/${imageId}`);
  }

  next();
};
