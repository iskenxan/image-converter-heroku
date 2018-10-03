const { createCanvas, loadImage } = require('canvas');


const createMarkedImage = (imageUrl) => {
  return loadImage(imageUrl).then(image => {
    const { width, height } = image;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, height - (height/4), width, (height/4));

    return canvas.toBuffer('image/png', {compressionLevel: 3});
  });
};

module.exports = { createMarkedImage };