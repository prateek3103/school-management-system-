






// import Link from 'next/link';
// import { School, Plus, List, Users, Award, BookOpen, ArrowRight, Star, Shield, Zap } from 'lucide-react';

// export default function Home() {
//   const features = [
//     {
//       icon: Users,
//       title: 'Easy Management',
//       description: 'Intuitive interface for managing school information with just a few clicks.',
//       color: 'from-blue-500 to-cyan-500'
//     },
//     {
//       icon: Award,
//       title: 'Professional Design',
//       description: 'Modern, responsive design that works perfectly on all devices.',
//       color: 'from-purple-500 to-pink-500'
//     },
//     {
//       icon: BookOpen,
//       title: 'Smart Features',
//       description: 'Advanced features including dark mode, image upload, and data validation.',
//       color: 'from-green-500 to-emerald-500'
//     },
//     {
//       icon: Shield,
//       title: 'Secure & Reliable',
//       description: 'Built with modern security practices and reliable data handling.',
//       color: 'from-orange-500 to-red-500'
//     },
//     {
//       icon: Zap,
//       title: 'Lightning Fast',
//       description: 'Optimized for speed with instant loading and smooth animations.',
//       color: 'from-indigo-500 to-purple-500'
//     },
//     {
//       icon: Star,
//       title: 'User Experience',
//       description: 'Designed with user experience in mind for maximum productivity.',
//       color: 'from-pink-500 to-rose-500'
//     }
//   ];

//   const stats = [
//     { number: '100+', label: 'Schools Managed' },
//     { number: '50K+', label: 'Students Tracked' },
//     { number: '99.9%', label: 'Uptime' },
//     { number: '24/7', label: 'Support' }
//   ];

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative gradient-bg hero-pattern text-white py-32 overflow-hidden">
//         {/* Background Elements */}
//         <div className="absolute inset-0">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             {/* Floating Icon */}
//             <div className="animate-float mb-8">
//               <div className="relative inline-block">
//                 <School className="h-24 w-24 mx-auto mb-6 text-white" />
//                 <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl"></div>
//               </div>
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-6xl md:text-8xl font-extrabold mb-6 animate-slide-up">
//               <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
//                 EduManage
//               </span>
//             </h1>
            
//             <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//               <p className="text-2xl md:text-3xl mb-4 text-blue-100 font-light">
//                 Modern School Management System
//               </p>
//               <p className="text-lg mb-12 max-w-4xl mx-auto text-white/80 leading-relaxed">
//                 Streamline your educational institution management with our comprehensive 
//                 platform designed for efficiency, transparency, and growth. Experience the future 
//                 of school administration today.
//               </p>
//             </div>
            
//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
//               <Link
//                 href="/addSchool"
//                 className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
//               >
//                 <Plus className="h-6 w-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
//                 <span>Add New School</span>
//                 <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
//               </Link>
              
//               <Link
//                 href="/showSchools"
//                 className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
//               >
//                 <List className="h-6 w-6 mr-3" />
//                 <span>View All Schools</span>
//                 <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
//               </Link>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
//               {stats.map((stat, index) => (
//                 <div key={index} className="text-center">
//                   <div className="text-3xl md:text-4xl font-bold text-white mb-2">
//                     {stat.number}
//                   </div>
//                   <div className="text-white/70 text-sm md:text-base">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//             backgroundSize: '60px 60px'
//           }}></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
//               Why Choose 
//               <span className="text-gradient"> EduManage</span>?
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
//               Built with modern technology stack for educational excellence and administrative efficiency
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <div
//                   key={index}
//                   className="group card-modern p-8 text-center hover:scale-105 transition-all duration-500"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <div className="relative mb-6">
//                     <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} p-5 group-hover:scale-110 transition-transform duration-300`}>
//                       <Icon className="h-10 w-10 text-white" />
//                     </div>
//                     <div className={`absolute -inset-2 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
//                   </div>
                  
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
//                     {feature.title}
//                   </h3>
                  
//                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative py-24 gradient-bg hero-pattern text-white overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
//           <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Ready to Transform Your School Management?
//           </h2>
//           <p className="text-xl mb-12 text-white/80 max-w-3xl mx-auto">
//             Join thousands of educational institutions that have already revolutionized their administrative processes with EduManage.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <Link
//               href="/addSchool"
//               className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
//             >
//               <Plus className="h-6 w-6 mr-3" />
//               <span>Get Started Today</span>
//               <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }







import Link from 'next/link';
import { GraduationCap, Plus, Grid3X3, Users, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Users,
      title: 'Intuitive Management',
      description: 'Simple and elegant interface designed for educational administrators.',
      color: 'from-sky-400 to-sky-600'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with modern security practices and reliable data handling.',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with instant loading and smooth interactions.',
      color: 'from-violet-400 to-violet-600'
    }
  ];

  const benefits = [
    'Modern responsive design',
    'Dark and light theme support',
    'Comprehensive school data management',
    'Image upload and management',
    'Real-time search and filtering'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-bg py-32 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo Icon */}
            <div className="animate-float mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-slate-900 dark:bg-slate-100 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                  <GraduationCap className="h-12 w-12 text-white dark:text-slate-900" />
                </div>
                <div className="absolute -inset-4 bg-slate-900/20 dark:bg-slate-100/20 rounded-2xl blur-xl"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="animate-slide-up">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-slate-100">
                EduManage
              </h1>
              
              <p className="text-2xl md:text-3xl mb-4 text-slate-700 dark:text-slate-300 font-light">
                School Management System
              </p>
              
              <p className="text-lg mb-12 max-w-3xl mx-auto text-slate-600 dark:text-slate-400 leading-relaxed">
                Streamline your educational institution management with our modern, 
                efficient platform designed for administrative excellence.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/addSchool"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-6 w-6 mr-3" />
                <span>Add School</span>
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                href="/showSchools"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-700 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-600 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 hover:scale-105"
              >
                <Grid3X3 className="h-6 w-6 mr-3" />
                <span>View Schools</span>
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Benefits List */}
            <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                    <CheckCircle className="h-5 w-5 text-sky-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Why Choose EduManage?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Built with modern technology for educational institutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card-elevated p-8 text-center transition-all duration-500 hover:scale-105"
                >
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} p-5 shadow-xl`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white dark:text-slate-900" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                EduManage
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              Modern School Management System
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Developed by Prateek Gupta © 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
