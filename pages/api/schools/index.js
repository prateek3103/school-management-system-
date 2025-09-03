import db from '../../../lib/db';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Define your database name once to use in all queries
  const dbName = '`prateek-gupta-noum`';

  if (req.method === 'GET') {
    try {
      // SQL FIX: Added database name to the query
      const [rows] = await db.execute(`SELECT * FROM ${dbName}.\`schools\` ORDER BY created_at DESC`);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching schools:', error);
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  } else if (req.method === 'POST') {
    // IMPORTANT: This block will fail on Vercel because it tries to save files.
    // You must replace this 'fs' logic with a cloud storage service like Cloudinary.
    try {
      const form = formidable({
        uploadDir: './public/schoolImages', // This will not work on Vercel
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB
      });

      // This will cause an error on Vercel's read-only file system
      if (!fs.existsSync('./public/schoolImages')) {
        fs.mkdirSync('./public/schoolImages', { recursive: true });
      }

      const [fields, files] = await form.parse(req);

      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
      const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
      const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
      const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
      const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

      let imageName = null;
      if (files.image && files.image[0]) {
        const file = files.image[0];
        const timestamp = Date.now();
        const ext = path.extname(file.originalFilename);
        imageName = `school_${timestamp}${ext}`;
        const newPath = `./public/schoolImages/${imageName}`;
        
        // This line will cause an error on Vercel
        fs.renameSync(file.filepath, newPath);
      }

      // SQL FIX: Added database name to the query
      const [result] = await db.execute(
        `INSERT INTO ${dbName}.\`schools\` (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, address, city, state, contact, imageName, email_id]
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
// import path from 'path';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const [rows] = await db.execute('SELECT * FROM schools ORDER BY created_at DESC');
//       res.status(200).json(rows);
//     } catch (error) {
//       console.error('Error fetching schools:', error);
//       res.status(500).json({ error: 'Failed to fetch schools' });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const form = formidable({
//         uploadDir: './public/schoolImages',
//         keepExtensions: true,
//         maxFileSize: 10 * 1024 * 1024, // 10MB
//       });

//       // Ensure upload directory exists
//       if (!fs.existsSync('./public/schoolImages')) {
//         fs.mkdirSync('./public/schoolImages', { recursive: true });
//       }

//       const [fields, files] = await form.parse(req);

//       const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
//       const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
//       const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
//       const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
//       const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
//       const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

//       let imageName = null;
//       if (files.image && files.image[0]) {
//         const file = files.image[0];
//         const timestamp = Date.now();
//         const ext = path.extname(file.originalFilename);
//         imageName = `school_${timestamp}${ext}`;
//         const newPath = `./public/schoolImages/${imageName}`;
        
//         fs.renameSync(file.filepath, newPath);
//       }

//       const [result] = await db.execute(
//         'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
//         [name, address, city, state, contact, imageName, email_id]
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
