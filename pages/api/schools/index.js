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

export default async function handler(req, res) {
  const dbName = '`prateek-gupta-noum`';

  if (req.method === 'GET') {
    try {
      const [rows] = await db.execute(`SELECT * FROM ${dbName}.\`schools\` ORDER BY created_at DESC`);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching schools:', error);
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  } else if (req.method === 'POST') {
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
        const file = files.image[0];
        
        const uploadResult = await cloudinary.uploader.upload(file.filepath, {
          folder: 'school_images',
        });

        console.log("Cloudinary Upload Result URL:", uploadResult.secure_url);

        imageUrl = uploadResult.secure_url;
      }
      console.log("Image URL being saved to database:", imageUrl);

      const [result] = await db.execute(
        `INSERT INTO ${dbName}.\`schools\` (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, address, city, state, contact, imageUrl, email_id]
      );

      res.status(201).json({ id: result.insertId, message: 'School added successfully' });
    } catch (error) {
      console.error('Error adding school:', error);
      res.status(500).json({ error: 'Failed to add school' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}




// import db from '../../../lib/db';
// import formidable from 'formidable';
// import { v2 as cloudinary } from 'cloudinary';

// // Configure Cloudinary with your credentials from environment variables
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   // FINAL FIX: Use the correct database name
//   const dbName = '`prateek-gupta-noum`';

//   if (req.method === 'GET') {
//     try {
//       const [rows] = await db.execute(`SELECT * FROM ${dbName}.\`schools\` ORDER BY created_at DESC`);
//       res.status(200).json(rows);
//     } catch (error) {
//       console.error('Error fetching schools:', error);
//       res.status(500).json({ error: 'Failed to fetch schools' });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const form = formidable({
//         maxFileSize: 10 * 1024 * 1024, // 10MB
//         keepExtensions: true,
//       });

//       const [fields, files] = await form.parse(req);

//       const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
//       const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
//       const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
//       const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
//       const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
//       const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

//       let imageUrl = null;
//       if (files.image && files.image[0]) {
//         const file = files.image[0];
        
//         // Upload the file to Cloudinary instead of using fs
//         const uploadResult = await cloudinary.uploader.upload(file.filepath, {
//           folder: 'school_images', // Optional: saves to a specific folder in Cloudinary
//         });

//         // Get the secure URL of the uploaded image
//         imageUrl = uploadResult.secure_url;
//       }

//       // Save the Cloudinary URL to the database
//       const [result] = await db.execute(
//         `INSERT INTO ${dbName}.\`schools\` (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//         [name, address, city, state, contact, imageUrl, email_id]
//       );

//       res.status(201).json({ id: result.insertId, message: 'School added successfully' });
//     } catch (error) {
//       console.error('Error adding school:', error);
//       res.status(500).json({ error: 'Failed to add school' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }












