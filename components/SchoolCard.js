import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Edit, Phone, Mail } from 'lucide-react';

export default function SchoolCard({ school, viewMode = 'grid' }) {
  const placeholderImage = "https://media.gettyimages.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=gi&k=20&c=8to_zwGxxcI1iYcix7DhmWahoDTlaqxEMzumDwJtxeg=";

  return (
    <div className="card-elevated overflow-hidden transition-all duration-500 hover:scale-105 group">
      {/* Image Section with Perfect Fit */}
      <div className={`relative overflow-hidden ${
        viewMode === 'list' ? 'h-56 aspect-video' : 'h-48 aspect-video'
      }`}>
       <Image
          src={school.image ? `/schoolImages/${school.image}` : '/api/placeholder/400/300'}
          alt={school.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        {/* Edit Button */}
        <div className="absolute top-4 right-4">
          <Link
            href={`/editSchool/${school.id}`}
            className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            <Edit className="h-4 w-4" />
          </Link>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        {/* School Name */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 line-clamp-1">
          {school.name}
        </h3>
        
        {/* Location */}
        <div className="flex items-start space-x-3 mb-4">
          <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-slate-500" />
          <div className="min-w-0">
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-1">
              {school.address}
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {school.city}, {school.state}
            </p>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-sky-500 flex-shrink-0" />
            <span className="text-sm text-slate-600 dark:text-slate-400">{school.contact}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-sky-500 flex-shrink-0" />
            <span className="text-sm text-slate-600 dark:text-slate-400 truncate">{school.email_id}</span>
          </div>
        </div>
        
        {/* Action Button */}
        <Link
          href={`/editSchool/${school.id}`}
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 group/btn"
        >
          <span>View Details</span>
          <Edit className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}











// import Image from 'next/image';
// import Link from 'next/link';
// import { MapPin, Edit, Phone, Mail } from 'lucide-react';

// export default function SchoolCard({ school }) {
//    const placeholderImage = "https://media.gettyimages.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=gi&k=20&c=8to_zwGxxcI1iYcix7DhmWahoDTlaqxEMzumDwJtxeg=";
//   return (
//     <div className="card-elevated overflow-hidden transition-all duration-500 hover:scale-105 group">
//       {/* Image Section */}
//       <div className="relative h-48 overflow-hidden">
//         <Image
//           // Use the full school.image URL directly
//           src={school.image || placeholderImage}
//           // src={school.image || '/api/placeholder/400/300'}
//           alt={school.name}
//           fill
//           className="object-cover group-hover:scale-110 transition-transform duration-700"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
//         {/* Edit Button */}
//         <div className="absolute top-4 right-4">
//           <Link
//             href={`/editSchool/${school.id}`}
//             className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
//           >
//             <Edit className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
      
//       {/* Content Section */}
//       <div className="p-6">
//         {/* School Name */}
//         <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 line-clamp-1">
//           {school.name}
//         </h3>
        
//         {/* Location */}
//         <div className="flex items-start space-x-3 mb-4">
//           <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-slate-500" />
//           <div className="min-w-0">
//             <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-1">
//               {school.address}
//             </p>
//             <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
//               {school.city}, {school.state}
//             </p>
//           </div>
//         </div>
        
//         {/* Contact Info */}
//         <div className="space-y-2 mb-6">
//           <div className="flex items-center space-x-3">
//             <Phone className="h-4 w-4 text-sky-500 flex-shrink-0" />
//             <span className="text-sm text-slate-600 dark:text-slate-400">{school.contact}</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Mail className="h-4 w-4 text-sky-500 flex-shrink-0" />
//             <span className="text-sm text-slate-600 dark:text-slate-400 truncate">{school.email_id}</span>
//           </div>
//         </div>
        
//         {/* Action Button */}
//         <Link
//           href={`/editSchool/${school.id}`}
//           className="w-full inline-flex items-center justify-center px-4 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 group/btn"
//         >
//           <span>View Details</span>
//           <Edit className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
//         </Link>
//       </div>
//     </div>
//   );
// }



