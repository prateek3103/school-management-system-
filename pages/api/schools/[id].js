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
  const { id } = req.query;
  const dbName = '`prateek-gupta-noum`'; // Define database name once

  if (req.method === 'GET') {
    try {
      // SQL FIX: Added database name
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
    // IMPORTANT: This block will still fail on Vercel due to file system writes.
    // You must replace the 'fs' logic with a cloud storage service.
    try {
      const form = formidable({
        // This will not work on Vercel's read-only file system
        uploadDir: './public/schoolImages', 
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB
      });

      const [fields, files] = await form.parse(req);

      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
      const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
      const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
      const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
      const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

      let imageName = null;
      if (files.image && files.image[0]) {
        // SQL FIX: Added database name
        const [currentSchool] = await db.execute(`SELECT image FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);
        
        // This file system logic will fail on Vercel
        if (currentSchool[0]?.image) {
          const oldImagePath = `./public/schoolImages/${currentSchool[0].image}`;
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        const file = files.image[0];
        const timestamp = Date.now();
        const ext = path.extname(file.originalFilename);
        imageName = `school_${timestamp}${ext}`;
        const newPath = `./public/schoolImages/${imageName}`;
        
        fs.renameSync(file.filepath, newPath); // This line will cause an error on Vercel

        // SQL FIX: Added database name
        await db.execute(
          `UPDATE ${dbName}.\`schools\` SET name = ?, address = ?, city = ?, state = ?, contact = ?, image = ?, email_id = ? WHERE id = ?`,
          [name, address, city, state, contact, imageName, email_id, id]
        );
      } else {
        // SQL FIX: Added database name
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
      // SQL FIX: Added database name
      const [currentSchool] = await db.execute(`SELECT image FROM ${dbName}.\`schools\` WHERE id = ?`, [id]);

      // This file system logic will fail on Vercel
      if (currentSchool[0]?.image) {
        const imagePath = `./public/schoolImages/${currentSchool[0].image}`;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // SQL FIX: Added database name
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
