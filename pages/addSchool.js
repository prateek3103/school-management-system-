import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { GraduationCap, Upload, Save, ArrowLeft, CheckCircle } from 'lucide-react';

export default function AddSchool() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const formData = new FormData();
      
      // Manually append each field to ensure correctness
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
      
      // This is a more robust check to ensure the file is appended
      if (data.image instanceof FileList && data.image.length > 0) {
        formData.append('image', data.image[0]);
      }

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/showSchools');
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add school');
      }
    } catch (error) {
      alert('Error adding school: ' + error.message);
    } finally {
      setLoading(false);
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

  if (success) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center">
        <div className="text-center animate-slide-up">
          <CheckCircle className="h-20 w-20 mx-auto mb-6 text-emerald-500" />
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">Success!</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">School has been added successfully</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
            Add New School
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Fill in the details below to add a new school to your directory
          </p>
        </div>

        <div className="card-elevated p-8 md:p-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Form fields remain the same */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">School Name *</label>
              <input type="text" {...register('name', { required: 'School name is required' })} className="input-elegant" placeholder="Enter the school name" />
              {errors.name && <p className="mt-2 text-sm text-red-500 flex items-center"><span className="mr-1">⚠</span>{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Complete Address *</label>
              <textarea {...register('address', { required: 'Address is required' })} rows="4" className="input-elegant resize-none" placeholder="Enter the complete address" />
              {errors.address && <p className="mt-2 text-sm text-red-500 flex items-center"><span className="mr-1">⚠</span>{errors.address.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">City *</label>
                <input type="text" {...register('city', { required: 'City is required' })} className="input-elegant" placeholder="Enter city name" />
                {errors.city && <p className="mt-2 text-sm text-red-500 flex items-center"><span className="mr-1">⚠</span>{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">State *</label>
                <input type="text" {...register('state', { required: 'State is required' })} className="input-elegant" placeholder="Enter state name" />
                {errors.state && <p className="mt-2 text-sm text-red-500 flex items-center"><span className="mr-1">⚠</span>{errors.state.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Contact Number *</label>
                <input type="tel" {...register('contact', { required: 'Contact number is required', pattern: { value: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' }})} className="input-elegant" placeholder="Enter 10-digit contact number" />
                {errors.contact && <p className="mt-2 text-sm text-red-500 flex items-center"><span className="mr-1">⚠</span>{errors.contact.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Email Address *</label>
                <input type="email" {...register('email_id', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' }})} className="input-elegant" placeholder="Enter email address" />
                {errors.email_id && <p className="mt-2 text-sm text-red-500 flex items-center"><span className="mr-1">⚠</span>{errors.email_id.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">School Image</label>
              <div className="relative">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center hover:border-sky-400 transition-colors">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img src={imagePreview} alt="Preview" className="mx-auto h-48 w-auto object-cover rounded-xl shadow-lg" />
                      <button type="button" onClick={() => setImagePreview('')} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove Image</button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-16 w-16 text-slate-400 mb-4" />
                      <div className="space-y-2">
                        <label className="cursor-pointer">
                          <span className="text-sky-600 hover:text-sky-700 font-medium">Click to upload</span>
                          <span className="text-slate-600 dark:text-slate-400"> or drag and drop</span>
                          <input type="file" {...register('image')} onChange={handleImageChange} accept="image/*" className="sr-only" />
                        </label>
                        <p className="text-sm text-slate-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button type="button" onClick={() => router.push('/showSchools')} className="flex-1 px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-all duration-300">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3">
                {loading ? (
                  <><div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div><span>Saving...</span></>
                ) : (
                  <><Save className="h-6 w-6" /><span>Save School</span></>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}




// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
// import { GraduationCap, Upload, Save, ArrowLeft, CheckCircle } from 'lucide-react';

// export default function AddSchool() {
//   const [loading, setLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState('');
//   const [success, setSuccess] = useState(false);
//   const router = useRouter();
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();

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

//       const response = await fetch('/api/schools', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         setSuccess(true);
//         setTimeout(() => {
//           reset();
//           setImagePreview('');
//           router.push('/showSchools');
//         }, 2000);
//       } else {
//         throw new Error('Failed to add school');
//       }
//     } catch (error) {
//       alert('Error adding school: ' + error.message);
//     } finally {
//       setLoading(false);
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

//   if (success) {
//     return (
//       <div className="min-h-screen hero-bg flex items-center justify-center">
//         <div className="text-center animate-slide-up">
//           <CheckCircle className="h-20 w-20 mx-auto mb-6 text-emerald-500" />
//           <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">Success!</h1>
//           <p className="text-xl text-slate-600 dark:text-slate-400">School has been added successfully</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen hero-bg py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12 animate-slide-up">
//           <button
//             onClick={() => router.back()}
//             className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-8 transition-colors group"
//           >
//             <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
//             Go Back
//           </button>
          
//           <div className="animate-float mb-8">
//             <div className="w-20 h-20 bg-slate-900 dark:bg-slate-100 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
//               <GraduationCap className="h-10 w-10 text-white dark:text-slate-900" />
//             </div>
//           </div>
          
//           <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
//             Add New School
//           </h1>
//           <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
//             Fill in the details below to add a new school to your directory
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="card-elevated p-8 md:p-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             {/* School Name */}
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
//                 School Name *
//               </label>
//               <input
//                 type="text"
//                 {...register('name', { required: 'School name is required' })}
//                 className="input-elegant"
//                 placeholder="Enter the school name"
//               />
//               {errors.name && (
//                 <p className="mt-2 text-sm text-red-500 flex items-center">
//                   <span className="mr-1">⚠</span>
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
//                 Complete Address *
//               </label>
//               <textarea
//                 {...register('address', { required: 'Address is required' })}
//                 rows="4"
//                 className="input-elegant resize-none"
//                 placeholder="Enter the complete address"
//               />
//               {errors.address && (
//                 <p className="mt-2 text-sm text-red-500 flex items-center">
//                   <span className="mr-1">⚠</span>
//                   {errors.address.message}
//                 </p>
//               )}
//             </div>

//             {/* City and State */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
//                   City *
//                 </label>
//                 <input
//                   type="text"
//                   {...register('city', { required: 'City is required' })}
//                   className="input-elegant"
//                   placeholder="Enter city name"
//                 />
//                 {errors.city && (
//                   <p className="mt-2 text-sm text-red-500 flex items-center">
//                     <span className="mr-1">⚠</span>
//                     {errors.city.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
//                   State *
//                 </label>
//                 <input
//                   type="text"
//                   {...register('state', { required: 'State is required' })}
//                   className="input-elegant"
//                   placeholder="Enter state name"
//                 />
//                 {errors.state && (
//                   <p className="mt-2 text-sm text-red-500 flex items-center">
//                     <span className="mr-1">⚠</span>
//                     {errors.state.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Contact and Email */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
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
//                   className="input-elegant"
//                   placeholder="Enter 10-digit contact number"
//                 />
//                 {errors.contact && (
//                   <p className="mt-2 text-sm text-red-500 flex items-center">
//                     <span className="mr-1">⚠</span>
//                     {errors.contact.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
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
//                   className="input-elegant"
//                   placeholder="Enter email address"
//                 />
//                 {errors.email_id && (
//                   <p className="mt-2 text-sm text-red-500 flex items-center">
//                     <span className="mr-1">⚠</span>
//                     {errors.email_id.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
//                 School Image
//               </label>
//               <div className="relative">
//                 <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center hover:border-sky-400 transition-colors">
//                   {imagePreview ? (
//                     <div className="space-y-4">
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="mx-auto h-48 w-auto object-cover rounded-xl shadow-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setImagePreview('')}
//                         className="text-red-500 hover:text-red-700 text-sm font-medium"
//                       >
//                         Remove Image
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <Upload className="mx-auto h-16 w-16 text-slate-400 mb-4" />
//                       <div className="space-y-2">
//                         <label className="cursor-pointer">
//                           <span className="text-sky-600 hover:text-sky-700 font-medium">
//                             Click to upload
//                           </span>
//                           <span className="text-slate-600 dark:text-slate-400"> or drag and drop</span>
//                           <input
//                             type="file"
//                             {...register('image')}
//                             onChange={handleImageChange}
//                             accept="image/*"
//                             className="sr-only"
//                           />
//                         </label>
//                         <p className="text-sm text-slate-500">
//                           PNG, JPG, GIF up to 10MB
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Submit Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-8">
//               <button
//                 type="button"
//                 onClick={() => router.push('/showSchools')}
//                 className="flex-1 px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-all duration-300"
//               >
//                 Cancel
//               </button>
              
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-6 w-6" />
//                     <span>Save School</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
