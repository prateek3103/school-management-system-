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
  
      <section className="relative hero-bg py-32 overflow-hidden">

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
        
            <div className="animate-float mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-slate-900 dark:bg-slate-100 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                  <GraduationCap className="h-12 w-12 text-white dark:text-slate-900" />
                </div>
                <div className="absolute -inset-4 bg-slate-900/20 dark:bg-slate-100/20 rounded-2xl blur-xl"></div>
              </div>
            </div>

       
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
