import db from '../../../lib/db';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
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

// Helper function to extract the public ID from a Cloudinary URL
const getPublicId = (imageUrl) => {
  // This logic assumes you are using the 'school_images' folder
  // Example URL: https://res.cloudinary.com/demo/image/upload/school_images/school_12345.jpg
  const parts = imageUrl.split('/');
  const fileName = parts.pop(); // school_12345.jpg
  const publicIdWithFolder = `school_images/${fileName.split('.')[0]}`;
  return publicIdWithFolder;
};


export default async function handler(req, res) {
  const { id } = req.query;
  const dbName = '`school_db`'; // Correct database name

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
        maxFileSize: 10 * 1024 * 1024, // 10MB
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
        // First, get the current school's image URL to delete the old one
        const [currentSchool] = await db.execute(`SELECT image FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);

        // If an old image exists on Cloudinary, delete it
        if (currentSchool[0]?.image) {
          try {
            const publicId = getPublicId(currentSchool[0].image);
            await cloudinary.uploader.destroy(publicId);
          } catch (e) {
            console.error("Failed to delete old image from Cloudinary", e);
          }
        }

        // Upload the new image to Cloudinary
        const file = files.image[0];
        const uploadResult = await cloudinary.uploader.upload(file.filepath, {
          folder: 'school_images',
        });
        imageUrl = uploadResult.secure_url;

        // Update database with the new image URL
        await db.execute(
          `UPDATE ${dbName}.\`schools\` SET name = ?, address = ?, city = ?, state = ?, contact = ?, image = ?, email_id = ? WHERE id = ?`,
          [name, address, city, state, contact, imageUrl, email_id, id]
        );
      } else {
        // If no new image is uploaded, just update the text fields
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
      // Get the image URL from the database before deleting the record
      const [currentSchool] = await db.execute(`SELECT image FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);

      // If an image exists on Cloudinary, delete it first
      if (currentSchool[0]?.image) {
        try {
          const publicId = getPublicId(currentSchool[0].image);
          await cloudinary.uploader.destroy(publicId);
        } catch (e) {
          console.error("Failed to delete image from Cloudinary", e);
        }
      }

      // Finally, delete the school record from the database
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

// import db from '../../../lib/db';
// import formidable from 'formidable';
// import path from 'path';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   const { id } = req.query;
//   const dbName = '`prateek-gupta-noum`'; // Define database name once

//   if (req.method === 'GET') {
//     try {
//       // SQL FIX: Added database name
//       const [rows] = await db.execute(`SELECT * FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);
//       if (rows.length === 0) {
//         return res.status(404).json({ error: 'School not found' });
//       }
//       res.status(200).json(rows[0]);
//     } catch (error) {
//       console.error('Error fetching school:', error);
//       res.status(500).json({ error: 'Failed to fetch school' });
//     }
//   } else if (req.method === 'PUT') {
//     // IMPORTANT: This block will still fail on Vercel due to file system writes.
//     // You must replace the 'fs' logic with a cloud storage service.
//     try {
//       const form = formidable({
//         // This will not work on Vercel's read-only file system
//         uploadDir: './public/schoolImages', 
//         keepExtensions: true,
//         maxFileSize: 10 * 1024 * 1024, // 10MB
//       });

//       const [fields, files] = await form.parse(req);

//       const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
//       const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
//       const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
//       const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
//       const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
//       const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

//       let imageName = null;
//       if (files.image && files.image[0]) {
//         // SQL FIX: Added database name
//         const [currentSchool] = await db.execute(`SELECT image FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);
        
//         // This file system logic will fail on Vercel
//         if (currentSchool[0]?.image) {
//           const oldImagePath = `./public/schoolImages/${currentSchool[0].image}`;
//           if (fs.existsSync(oldImagePath)) {
//             fs.unlinkSync(oldImagePath);
//           }
//         }

//         const file = files.image[0];
//         const timestamp = Date.now();
//         const ext = path.extname(file.originalFilename);
//         imageName = `school_${timestamp}${ext}`;
//         const newPath = `./public/schoolImages/${imageName}`;
        
//         fs.renameSync(file.filepath, newPath); // This line will cause an error on Vercel

//         // SQL FIX: Added database name
//         await db.execute(
//           `UPDATE ${dbName}.\`schools\` SET name = ?, address = ?, city = ?, state = ?, contact = ?, image = ?, email_id = ? WHERE id = ?`,
//           [name, address, city, state, contact, imageName, email_id, id]
//         );
//       } else {
//         // SQL FIX: Added database name
//         await db.execute(
//           `UPDATE ${dbName}.\`schools\` SET name = ?, address = ?, city = ?, state = ?, contact = ?, email_id = ? WHERE id = ?`,
//           [name, address, city, state, contact, email_id, id]
//         );
//       }

//       res.status(200).json({ message: 'School updated successfully' });
//     } catch (error) {
//       console.error('Error updating school:', error);
//       res.status(500).json({ error: 'Failed to update school' });
//     }
//   } else if (req.method === 'DELETE') {
//     try {
//       // SQL FIX: Added database name
//       const [currentSchool] = await db.execute(`SELECT image FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);

//       // This file system logic will fail on Vercel
//       if (currentSchool[0]?.image) {
//         const imagePath = `./public/schoolImages/${currentSchool[0].image}`;
//         if (fs.existsSync(imagePath)) {
//           fs.unlinkSync(imagePath);
//         }
//       }

//       // SQL FIX: Added database name
//       await db.execute(`DELETE FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);
//       res.status(200).json({ message: 'School deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting school:', error);
//       res.status(500).json({ error: 'Failed to delete school' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }







// import db from '../../../lib/db';
// import formidable from 'formidable';
// import path from 'path';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   const { id } = req.query;

//   if (req.method === 'GET') {
//     try {
//       const [rows] = await db.execute('SELECT * FROM schools WHERE id = ?', [id]);
//       if (rows.length === 0) {
//         return res.status(404).json({ error: 'School not found' });
//       }
//       res.status(200).json(rows[0]);
//     } catch (error) {
//       console.error('Error fetching school:', error);
//       res.status(500).json({ error: 'Failed to fetch school' });
//     }
//   } else if (req.method === 'PUT') {
//     try {
//       const form = formidable({
//         uploadDir: './public/schoolImages',
//         keepExtensions: true,
//         maxFileSize: 10 * 1024 * 1024, // 10MB
//       });

//       const [fields, files] = await form.parse(req);

//       const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
//       const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
//       const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
//       const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
//       const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
//       const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

//       let imageName = null;
//       if (files.image && files.image[0]) {
//         // Get current image to delete old one
//         const [currentSchool] = await db.execute('SELECT image FROM schools WHERE id = ?', [id]);
//         if (currentSchool[0]?.image) {
//           const oldImagePath = `./public/schoolImages/${currentSchool[0].image}`;
//           if (fs.existsSync(oldImagePath)) {
//             fs.unlinkSync(oldImagePath);
//           }
//         }

//         const file = files.image[0];
//         const timestamp = Date.now();
//         const ext = path.extname(file.originalFilename);
//         imageName = `school_${timestamp}${ext}`;
//         const newPath = `./public/schoolImages/${imageName}`;
        
//         fs.renameSync(file.filepath, newPath);

//         await db.execute(
//           'UPDATE schools SET name = ?, address = ?, city = ?, state = ?, contact = ?, image = ?, email_id = ? WHERE id = ?',
//           [name, address, city, state, contact, imageName, email_id, id]
//         );
//       } else {
//         await db.execute(
//           'UPDATE schools SET name = ?, address = ?, city = ?, state = ?, contact = ?, email_id = ? WHERE id = ?',
//           [name, address, city, state, contact, email_id, id]
//         );
//       }

//       res.status(200).json({ message: 'School updated successfully' });
//     } catch (error) {
//       console.error('Error updating school:', error);
//       res.status(500).json({ error: 'Failed to update school' });
//     }
//   } else if (req.method === 'DELETE') {
//     try {
//       // Get current image to delete
//       const [currentSchool] = await db.execute('SELECT image FROM schools WHERE id = ?', [id]);
//       if (currentSchool[0]?.image) {
//         const imagePath = `./public/schoolImages/${currentSchool[0].image}`;
//         if (fs.existsSync(imagePath)) {
//           fs.unlinkSync(imagePath);
//         }
//       }

//       await db.execute('DELETE FROM schools WHERE id = ?', [id]);
//       res.status(200).json({ message: 'School deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting school:', error);
//       res.status(500).json({ error: 'Failed to delete school' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
