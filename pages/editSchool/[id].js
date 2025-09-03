// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
// import { School, Save, Trash2 } from 'lucide-react';

// export default function EditSchool() {
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [imagePreview, setImagePreview] = useState('');
//   const [school, setSchool] = useState(null);
//   const router = useRouter();
//   const { id } = router.query;
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue
//   } = useForm();

//   useEffect(() => {
//     if (id) {
//       fetchSchool();
//     }
//   }, [id]);

//   const fetchSchool = async () => {
//     try {
//       const response = await fetch(`/api/schools/${id}`);
//       const data = await response.json();
//       setSchool(data);
      
//       // Populate form with existing data
//       Object.keys(data).forEach(key => {
//         if (key !== 'image') {
//           setValue(key, data[key]);
//         }
//       });
      
//       if (data.image) {
//         setImagePreview(`/schoolImages/${data.image}`);
//       }
//     } catch (error) {
//       console.error('Error fetching school:', error);
//       alert('Error loading school data');
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
    
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => {
//         if (key === 'image' && data[key][0]) {
//           formData.append('image', data[key][0]);
//         } else if (key !== 'image') {
//           formData.append(key, data[key]);
//         }
//       });

//       const response = await fetch(`/api/schools/${id}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (response.ok) {
//         alert('School updated successfully!');
//         router.push('/showSchools');
//       } else {
//         throw new Error('Failed to update school');
//       }
//     } catch (error) {
//       alert('Error updating school: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (confirm('Are you sure you want to delete this school? This action cannot be undone.')) {
//       try {
//         const response = await fetch(`/api/schools/${id}`, {
//           method: 'DELETE',
//         });

//         if (response.ok) {
//           alert('School deleted successfully!');
//           router.push('/showSchools');
//         } else {
//           throw new Error('Failed to delete school');
//         }
//       } catch (error) {
//         alert('Error deleting school: ' + error.message);
//       }
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   if (fetchLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   if (!school) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">School not found</h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-12">
//           <School className="h-16 w-16 text-primary-600 mx-auto mb-4" />
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Edit School
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-400">
//             Update the school information below
//           </p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Similar form fields as AddSchool but pre-populated */}
//             {/* School Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 School Name *
//               </label>
//               <input
//                 type="text"
//                 {...register('name', { required: 'School name is required' })}
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               />
//               {errors.name && (
//                 <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//               )}
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Address *
//               </label>
//               <textarea
//                 {...register('address', { required: 'Address is required' })}
//                 rows="3"
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               />
//               {errors.address && (
//                 <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
//               )}
//             </div>

//             {/* City and State */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   City *
//                 </label>
//                 <input
//                   type="text"
//                   {...register('city', { required: 'City is required' })}
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//                 {errors.city && (
//                   <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   State *
//                 </label>
//                 <input
//                   type="text"
//                   {...register('state', { required: 'State is required' })}
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//                 {errors.state && (
//                   <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Contact and Email */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Contact Number *
//                 </label>
//                 <input
//                   type="tel"
//                   {...register('contact', {
//                     required: 'Contact number is required',
//                     pattern: {
//                       value: /^[0-9]{10}$/,
//                       message: 'Please enter a valid 10-digit phone number'
//                     }
//                   })}
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//                 {errors.contact && (
//                   <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   {...register('email_id', {
//                     required: 'Email is required',
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: 'Please enter a valid email address'
//                     }
//                   })}
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//                 {errors.email_id && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 School Image
//               </label>
//               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
//                 <div className="space-y-1 text-center">
//                   {imagePreview && (
//                     <div className="mb-4">
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="mx-auto h-32 w-32 object-cover rounded-lg"
//                       />
//                     </div>
//                   )}
//                   <div className="flex text-sm text-gray-600 dark:text-gray-400">
//                     <label className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary-600 hover:text-primary-500 px-2">
//                       <span>Change image</span>
//                       <input
//                         type="file"
//                         {...register('image')}
//                         onChange={handleImageChange}
//                         accept="image/*"
//                         className="sr-only"
//                       />
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-between pt-6">
//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
//               >
//                 <Trash2 className="h-5 w-5" />
//                 <span>Delete School</span>
//               </button>
              
//               <div className="flex space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => router.push('/showSchools')}
//                   className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   {loading ? (
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   ) : (
//                     <>
//                       <Save className="h-5 w-5" />
//                       <span>Update School</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }










import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { GraduationCap, Save, Trash2, ArrowLeft, Upload } from 'lucide-react';

export default function EditSchool() {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [school, setSchool] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    if (id) {
      fetchSchool();
    }
  }, [id]);

  const fetchSchool = async () => {
    try {
      const response = await fetch(`/api/schools/${id}`);
      const data = await response.json();
      setSchool(data);
      
      // Populate form with existing data
      Object.keys(data).forEach(key => {
        if (key !== 'image') {
          setValue(key, data[key]);
        }
      });
      
      if (data.image) {
        setImagePreview(`/schoolImages/${data.image}`);
      }
    } catch (error) {
      console.error('Error fetching school:', error);
      alert('Error loading school data');
    } finally {
      setFetchLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'image' && data[key][0]) {
          formData.append('image', data[key][0]);
        } else if (key !== 'image') {
          formData.append(key, data[key]);
        }
      });

      const response = await fetch(`/api/schools/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('School updated successfully!');
        router.push('/showSchools');
      } else {
        throw new Error('Failed to update school');
      }
    } catch (error) {
      alert('Error updating school: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this school? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/schools/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('School deleted successfully!');
          router.push('/showSchools');
        } else {
          throw new Error('Failed to delete school');
        }
      } catch (error) {
        alert('Error deleting school: ' + error.message);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading school data...</p>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">School not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-8 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
          
          <div className="animate-float mb-8">
            <div className="w-20 h-20 bg-slate-900 dark:bg-slate-100 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
              <GraduationCap className="h-10 w-10 text-white dark:text-slate-900" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Edit School
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Update the school information below
          </p>
        </div>

        {/* Form Card */}
        <div className="card-elevated p-8 md:p-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* School Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                School Name *
              </label>
              <input
                type="text"
                {...register('name', { required: 'School name is required' })}
                className="input-elegant"
                placeholder="Enter the school name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Complete Address *
              </label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                rows="4"
                className="input-elegant resize-none"
                placeholder="Enter the complete address"
              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  City *
                </label>
                <input
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  className="input-elegant"
                  placeholder="Enter city name"
                />
                {errors.city && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  State *
                </label>
                <input
                  type="text"
                  {...register('state', { required: 'State is required' })}
                  className="input-elegant"
                  placeholder="Enter state name"
                />
                {errors.state && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  {...register('contact', {
                    required: 'Contact number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number'
                    }
                  })}
                  className="input-elegant"
                  placeholder="Enter 10-digit contact number"
                />
                {errors.contact && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.contact.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email_id', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="input-elegant"
                  placeholder="Enter email address"
                />
                {errors.email_id && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.email_id.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                School Image
              </label>
              <div className="relative">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center hover:border-sky-400 transition-colors">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-48 w-auto object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  ) : (
                    <Upload className="mx-auto h-16 w-16 text-slate-400 mb-4" />
                  )}
                  <div className="space-y-2">
                    <label className="cursor-pointer">
                      <span className="text-sky-600 hover:text-sky-700 font-medium">
                        Change image
                      </span>
                      <input
                        type="file"
                        {...register('image')}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                type="button"
                onClick={handleDelete}
                className="sm:w-auto px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Trash2 className="h-5 w-5" />
                <span>Delete</span>
              </button>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:ml-auto">
                <button
                  type="button"
                  onClick={() => router.push('/showSchools')}
                  className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-6 w-6" />
                      <span>Update School</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
