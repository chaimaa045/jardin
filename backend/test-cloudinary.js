const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Parsing CLOUDINARY_URL
cloudinary.config({
  cloudinary_url: 'cloudinary://991942237122491:Et8S9NuJnZd9kYaVJ1Pc6hTlU2Q@ueqq486d'
});

async function test() {
  try {
    // create a dummy file
    fs.writeFileSync('dummy.txt', 'hello world');
    const res = await cloudinary.uploader.upload('dummy.txt', { resource_type: 'raw' });
    console.log('Success!', res.secure_url);
  } catch (err) {
    console.error('Cloudinary Error:', err);
  } finally {
    if (fs.existsSync('dummy.txt')) fs.unlinkSync('dummy.txt');
  }
}

test();
