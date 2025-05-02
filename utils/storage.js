const path = require('path');
const fs = require('fs');

function saveToLocal(file) {
  const uploadDir = path.join(__dirname, '../uploads');
  const filename = `${Date.now()}-${file.originalname}`;
  const filepath = path.join(uploadDir, filename);
  fs.writeFileSync(filepath, file.buffer);
  return {
    localPath: `/uploads/${filename}`,
    filename
  };
}

module.exports = { saveToLocal };
