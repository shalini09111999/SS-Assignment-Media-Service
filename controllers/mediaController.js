const Media = require('../models/Media');
const { saveToLocal } = require('../utils/storage');

exports.uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : {};
    const type = req.body.type || file.mimetype.split('/')[0];
    //const userId = req.user.id;
    const userId = req.user.userId; // ✅ correct field


    const { localPath, filename } = saveToLocal(file); // save locally
    console.log({ localPath, filename });

    const media = await Media.create({
      userId,
      url: `${req.protocol}://${req.get('host')}${localPath}`,
      type,
      size: file.size,
      metadata
    });

    res.status(201).json({
      mediaId: media._id,
      url: media.url,
      type: media.type,
      size: media.size,
      createdAt: media.createdAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
};


exports.getMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.mediaId);
    if (!media) return res.status(404).json({ error: 'Media not found' });
    res.status(200).json(media);
  } catch {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
};

exports.listMedia = async (req, res) => {
  try {
    const items = await Media.find({ userId: req.user.userId }); 
    res.json({ items });
  } catch {
    res.status(500).json({ error: 'Failed to list media' });
  }
};

exports.updateMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.mediaId);
    if (!media) return res.status(404).json({ error: 'Media not found' });

    media.metadata = req.body.metadata || media.metadata;
    await media.save();

    res.json({ message: 'Media metadata updated successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to update metadata' });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.mediaId);
    if (!media) return res.status(404).json({ error: 'Media not found' });

    await media.deleteOne();
    res.json({ message: 'Media deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete media' });
  }
};
