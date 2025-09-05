import db from '../../../lib/db';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const getPublicId = (imageUrl) => {
  try {
    const urlParts = imageUrl.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    const publicIdWithVersion = urlParts.slice(uploadIndex + 2).join('/');
    const publicId = publicIdWithVersion.substring(0, publicIdWithVersion.lastIndexOf('.'));
    return publicId;
  } catch (e) {
    console.error("Could not extract public_id from URL:", imageUrl);
    return null;
  }
};

export default async function handler(req, res) {
  const { id } = req.query;
  const dbName = '`prateek-gupta-noum`';

  if (req.method === 'GET') {
    try {
      const [rows] = await db.execute(`SELECT * FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'School not found' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error fetching school:', error);
      res.status(500).json({ error: 'Failed to fetch school' });
    }
  } else if (req.method === 'PUT') {
    try {
      const form = formidable({
        maxFileSize: 10 * 1024 * 1024,
        keepExtensions: true,
      });

      const [fields, files] = await form.parse(req);

      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
      const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
      const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
      const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
      const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

      let imageUrl = null;
      if (files.image && files.image[0]) {
        const [currentSchool] = await db.execute(`SELECT image FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);

        if (currentSchool[0]?.image) {
          const publicId = getPublicId(currentSchool[0].image);
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        }

        const file = files.image[0];
        const uploadResult = await cloudinary.uploader.upload(file.filepath, {
          folder: 'school_images',
        });
        imageUrl = uploadResult.secure_url;

        await db.execute(
          `UPDATE ${dbName}.\`schools\` SET name = ?, address = ?, city = ?, state = ?, contact = ?, image = ?, email_id = ? WHERE id = ?`,
          [name, address, city, state, contact, imageUrl, email_id, id]
        );
      } else {
        await db.execute(
          `UPDATE ${dbName}.\`schools\` SET name = ?, address = ?, city = ?, state = ?, contact = ?, email_id = ? WHERE id = ?`,
          [name, address, city, state, contact, email_id, id]
        );
      }

      res.status(200).json({ message: 'School updated successfully' });
    } catch (error) {
      console.error('Error updating school:', error);
      res.status(500).json({ error: 'Failed to update school' });
    }
  } else if (req.method === 'DELETE') {
    try {
        const [currentSchool] = await db.execute(`SELECT image FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);
  
        if (currentSchool[0]?.image) {
          const publicId = getPublicId(currentSchool[0].image);
          if (publicId) {
              await cloudinary.uploader.destroy(publicId);
          }
        }
  
        await db.execute(`DELETE FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);
        res.status(200).json({ message: 'School deleted successfully' });
      } catch (error) {
        console.error('Error deleting school:', error);
        res.status(500).json({ error: 'Failed to delete school' });
      }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


