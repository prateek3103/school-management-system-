import { useState, useEffect } from 'react';
import SchoolCard from '../components/SchoolCard';
import { Search, Filter, Grid3X3, List, Plus, Home } from 'lucide-react';
import Link from 'next/link';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    filterSchools();
  }, [schools, searchTerm, filterCity]);

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/schools');
      const data = await response.json();
      setSchools(data);
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSchools = () => {
    let filtered = schools;

    if (searchTerm) {
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCity) {
      filtered = filtered.filter(school =>
        school.city.toLowerCase().includes(filterCity.toLowerCase())
      );
    }

    setFilteredSchools(filtered);
  };

  const cities = [...new Set(schools.map(school => school.city))];

  if (loading) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading schools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            School Directory
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Explore our comprehensive directory of educational institutions
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
          >
            <Home className="h-5 w-5 mr-2" />
            Home
          </Link>
          <Link
            href="/addSchool"
            className="inline-flex items-center px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add School
          </Link>
        </div>

        {/* No Schools Message */}
        {schools.length === 0 && (
          <div className="max-w-md mx-auto text-center mb-12">
            <p className="text-slate-500 mb-6">No schools found. Start by adding your first school.</p>
            <Link
              href="/addSchool"
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <Plus className="h-5 w-5" />
              <span>Add First School</span>
            </Link>
          </div>
        )}

        {schools.length > 0 && (
          <>
            {/* Search and Filters */}
            <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="card-elevated p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search schools by name, city, or state..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-elegant pl-12"
                      />
                    </div>
                    <div className="relative min-w-0 sm:min-w-[200px]">
                      <Filter className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                      <select
                        value={filterCity}
                        onChange={(e) => setFilterCity(e.target.value)}
                        className="input-elegant pl-12"
                      >
                        <option value="">All Cities</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'grid' 
                        ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Grid3X3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'list' 
                        ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-slate-600 dark:text-slate-400">
                {filteredSchools.length} {filteredSchools.length === 1 ? 'school' : 'schools'} found
                {schools.length !== filteredSchools.length && ` of ${schools.length} total`}
              </p>
            </div>

            {/* Schools Grid - Enhanced for perfect image fit */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              {filteredSchools.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    No schools found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Try adjusting your search criteria or filters
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterCity('');
                    }}
                    className="btn-accent"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'flex flex-col gap-8 max-w-4xl mx-auto'
                }>
                  {filteredSchools.map((school) => (
                    <div 
                      key={school.id}
                      className={viewMode === 'list' ? 'w-full' : ''}
                    >
                      <SchoolCard 
                        school={school} 
                        viewMode={viewMode}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}










// import { useState, useEffect } from 'react';
// import SchoolCard from '../components/SchoolCard';
// import { Search, Filter, Grid3X3, List, Plus, Home } from 'lucide-react';
// import Link from 'next/link';

// export default function ShowSchools() {
//   const [schools, setSchools] = useState([]);
//   const [filteredSchools, setFilteredSchools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCity, setFilterCity] = useState('');
//   const [viewMode, setViewMode] = useState('grid');

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   useEffect(() => {
//     filterSchools();
//   }, [schools, searchTerm, filterCity]);

//   const fetchSchools = async () => {
//     try {
//       const response = await fetch('/api/schools');
//       const data = await response.json();
//       setSchools(data);
//     } catch (error) {
//       console.error('Error fetching schools:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterSchools = () => {
//     let filtered = schools;

//     if (searchTerm) {
//       filtered = filtered.filter(school =>
//         school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         school.state.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (filterCity) {
//       filtered = filtered.filter(school =>
//         school.city.toLowerCase().includes(filterCity.toLowerCase())
//       );
//     }

//     setFilteredSchools(filtered);
//   };

//   const cities = [...new Set(schools.map(school => school.city))];

//   if (loading) {
//     return (
//       <div className="min-h-screen hero-bg flex items-center justify-center">
//         <div className="text-center animate-fade-in">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900 mx-auto mb-4"></div>
//           <p className="text-slate-600 dark:text-slate-400">Loading schools...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen hero-bg py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8 animate-slide-up">
//           <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
//             School Directory
//           </h1>
//           <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
//             Explore our comprehensive directory of educational institutions
//           </p>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
//           <Link
//             href="/"
//             className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
//           >
//             <Home className="h-5 w-5 mr-2" />
//             Home
//           </Link>
//           <Link
//             href="/addSchool"
//             className="inline-flex items-center px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
//           >
//             <Plus className="h-5 w-5 mr-2" />
//             Add School
//           </Link>
//         </div>

//         {/* No Schools Message */}
//         {schools.length === 0 && (
//           <div className="max-w-md mx-auto text-center mb-12">
//             <p className="text-slate-500 mb-6">No schools found. Start by adding your first school.</p>
//             <Link
//               href="/addSchool"
//               className="inline-flex items-center space-x-2 btn-primary"
//             >
//               <Plus className="h-5 w-5" />
//               <span>Add First School</span>
//             </Link>
//           </div>
//         )}

//         {schools.length > 0 && (
//           <>
//             {/* Search and Filters */}
//             <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//               <div className="card-elevated p-6">
//                 <div className="flex flex-col lg:flex-row gap-6">
//                   <div className="flex flex-col sm:flex-row gap-4 flex-1">
//                     <div className="relative flex-1">
//                       <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
//                       <input
//                         type="text"
//                         placeholder="Search schools by name, city, or state..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="input-elegant pl-12"
//                       />
//                     </div>
//                     <div className="relative min-w-0 sm:min-w-[200px]">
//                       <Filter className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
//                       <select
//                         value={filterCity}
//                         onChange={(e) => setFilterCity(e.target.value)}
//                         className="input-elegant pl-12"
//                       >
//                         <option value="">All Cities</option>
//                         {cities.map(city => (
//                           <option key={city} value={city}>{city}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => setViewMode('grid')}
//                       className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'grid' 
//                         ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg' 
//                         : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
//                       }`}
//                     >
//                       <Grid3X3 className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode('list')}
//                       className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'list' 
//                         ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg' 
//                         : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
//                       }`}
//                     >
//                       <List className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Results Count */}
//             <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
//               <p className="text-slate-600 dark:text-slate-400">
//                 {filteredSchools.length} {filteredSchools.length === 1 ? 'school' : 'schools'} found
//                 {schools.length !== filteredSchools.length && ` of ${schools.length} total`}
//               </p>
//             </div>

//             {/* Schools Grid */}
//             <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
//               {filteredSchools.length === 0 ? (
//                 <div className="text-center py-16">
//                   <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <Search className="h-12 w-12 text-slate-400" />
//                   </div>
//                   <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
//                     No schools found
//                   </h3>
//                   <p className="text-slate-600 dark:text-slate-400 mb-6">
//                     Try adjusting your search criteria or filters
//                   </p>
//                   <button
//                     onClick={() => {
//                       setSearchTerm('');
//                       setFilterCity('');
//                     }}
//                     className="btn-accent"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               ) : (
//                 <div className={viewMode === 'grid' 
//                   ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
//                   : 'space-y-6'
//                 }>
//                   {filteredSchools.map((school) => (
//                     <SchoolCard key={school.id} school={school} viewMode={viewMode} />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
