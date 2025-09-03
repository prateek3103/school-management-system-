


// import Image from 'next/image';
// import Link from 'next/link';
// import { MapPin, Edit, Phone, Mail, Star } from 'lucide-react';

// export default function SchoolCard({ school }) {
//   return (
//     <div className="group card-modern overflow-hidden hover:scale-105 transition-all duration-500">
//       {/* Image Section */}
//       <div className="relative h-56 overflow-hidden">
//         <Image
//           src={school.image ? `/schoolImages/${school.image}` : '/api/placeholder/400/300'}
//           alt={school.name}
//           fill
//           className="object-cover group-hover:scale-110 transition-transform duration-700"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
//         {/* Action Buttons */}
//         <div className="absolute top-4 right-4 flex space-x-2">
//           <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
//             <Star className="h-4 w-4 text-yellow-400 fill-current" />
//             <span className="text-white text-sm font-medium">4.8</span>
//           </div>
//           <Link
//             href={`/editSchool/${school.id}`}
//             className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors group/edit"
//           >
//             <Edit className="h-4 w-4 group-hover/edit:rotate-12 transition-transform duration-300" />
//           </Link>
//         </div>

//         {/* School Name Overlay */}
//         <div className="absolute bottom-4 left-4 right-4">
//           <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 drop-shadow-lg">
//             {school.name}
//           </h3>
//         </div>
//       </div>
      
//       {/* Content Section */}
//       <div className="p-6">
//         {/* Location */}
//         <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-400 mb-4">
//           <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-blue-500" />
//           <div>
//             <p className="text-sm line-clamp-2 font-medium">{school.address}</p>
//             <p className="text-sm font-semibold text-gray-900 dark:text-white">
//               {school.city}, {school.state}
//             </p>
//           </div>
//         </div>
        
//         {/* Contact Info */}
//         <div className="space-y-2 mb-6">
//           <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//             <Phone className="h-4 w-4 text-green-500" />
//             <span>{school.contact}</span>
//           </div>
//           <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//             <Mail className="h-4 w-4 text-red-500" />
//             <span className="truncate">{school.email_id}</span>
//           </div>
//         </div>
        
//         {/* Action Button */}
//         <Link
//           href={`/editSchool/${school.id}`}
//           className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group/btn"
//         >
//           <span>View Details</span>
//           <Edit className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
//         </Link>
//       </div>
//     </div>
//   );
// }







import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Edit, Phone, Mail } from 'lucide-react';

export default function SchoolCard({ school }) {
  return (
    <div className="card-elevated overflow-hidden transition-all duration-500 hover:scale-105 group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={school.image ? `/schoolImages/${school.image}` : '/api/placeholder/400/300'}
          alt={school.name}
          fill
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
