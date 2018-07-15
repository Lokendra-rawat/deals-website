var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'supremedeals',
  api_key: '686682926945333',
  api_secret: 'Ci23hGKo44rpP0r7zqlgWerGeM8'
});

// cloudinary.uploader.upload("../../public/images/fkm.jpg", {
//   "crop": "limit",
//   "tags": "samples",
//   "width": 3000,
//   "height": 2000
// }, function(result,err) {
//   console.log(result);
//   console.log(err);
// });

cloudinary.uploader.upload(
  "../../public/images/banner1.jpg",
  function(result) {
    console.log(result.secured_url);
    console.log(result.eager[0].secured_url);
  }, {
  	public_id : "banner",
    crop: 'limit',
    width: 2000,
    height: 2000,
    eager: [{
      width: 180,
      height: 140,
    }],
    tags: ['special', 'for_homepage']
  }
);

