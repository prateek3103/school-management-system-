



// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useTheme } from './ThemeProvider';
// import { Sun, Moon, School, Plus, List, Menu, X } from 'lucide-react';
// import { useState } from 'react';

// export default function Navbar() {
//   const { theme, toggleTheme } = useTheme();
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navigation = [
//     { name: 'Home', href: '/', icon: School },
//     { name: 'Add School', href: '/addSchool', icon: Plus },
//     { name: 'All Schools', href: '/showSchools', icon: List },
//   ];

//   return (
//     <nav className="fixed top-0 w-full z-50 glass-effect animate-slide-up">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center space-x-3 group">
//               <div className="relative">
//                 <School className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
//                 <div className="absolute -inset-2 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </div>
//               <div>
//                 <span className="text-2xl font-bold text-white">
//                   EduManage
//                 </span>
//                 <p className="text-xs text-white/70 -mt-1">School Management</p>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-2">
//             {navigation.map((item) => {
//               const Icon = item.icon;
//               const isActive = router.pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
//                     isActive
//                       ? 'bg-white/20 text-white shadow-lg'
//                       : 'text-white/80 hover:bg-white/10 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="h-5 w-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
            
//             <button
//               onClick={toggleTheme}
//               className="p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
//             >
//               {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center space-x-2">
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
//             >
//               {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
//             </button>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-4 pt-2 pb-6 space-y-2 glass-effect border-t border-white/10">
//             {navigation.map((item) => {
//               const Icon = item.icon;
//               const isActive = router.pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
//                     isActive
//                       ? 'bg-white/20 text-white'
//                       : 'text-white/80 hover:bg-white/10 hover:text-white'
//                   }`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <Icon className="h-5 w-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }








import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, GraduationCap, Plus, Grid3X3, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: GraduationCap },
    { name: 'Add School', href: '/addSchool', icon: Plus },
    { name: 'All Schools', href: '/showSchools', icon: Grid3X3 },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-morphism animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-slate-900 dark:bg-slate-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-7 w-7 text-white dark:text-slate-900" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  EduManage
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 -mt-1">
                  School Management
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
  
