import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Code2, 
  Music, 
  Monitor, 
  Music4, 
  ExternalLink,
  Github,
  Mail,
  ArrowRight,
  Globe,
  Sparkles
} from 'lucide-react';
import { useRef } from 'react';

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"
        />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between p-2 pl-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <span className="text-black font-black text-sm">S4</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">suahco4</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <a href="#about" className="px-6 py-2 text-sm font-medium hover:text-white transition-colors">About</a>
              <a href="#expertise" className="px-6 py-2 text-sm font-medium hover:text-white transition-colors">Work</a>
              <a href="#contact" className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-amber-400 transition-all duration-300">
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} /> Available for projects
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
              EMMANUEL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
                SUAH.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
              Based in <span className="text-white font-medium">Brewerville, Liberia</span>. 
              I am a digital architect at <span className="text-amber-400 font-bold italic underline decoration-amber-500/30">suahco4</span> and a passionate organist, blending technical logic with musical soul.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all">
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project <ArrowRight size={18} />
                </span>
                <div className="absolute inset-0 bg-amber-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              <div className="flex items-center gap-4 px-4">
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5">
                  <Github size={20} />
                </a>
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-slate-800 to-black border border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                   <div className="flex items-center justify-between mb-2">
                     <Music4 className="text-amber-400" />
                     <span className="text-xs font-mono text-slate-400">01 // MUSICIAN</span>
                   </div>
                   <h3 className="text-xl font-bold text-white uppercase italic">The Church Organist</h3>
                </div>
              </div>
            </div>
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-6 rounded-3xl bg-blue-600 shadow-2xl shadow-blue-600/20 max-w-[180px] hidden md:block"
            >
              <Monitor className="text-white mb-4" />
              <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">Suahco4 Dev</p>
              <h4 className="text-white font-black">MODERN WEBSITES</h4>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent" />
        </motion.div>
      </section>

      {/* About & Identity Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div {...fadeInUp} className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                CRAFTING BOLD <br /> 
                <span className="text-slate-500 underline decoration-amber-500/50 decoration-4 underline-offset-8 italic">EXPERIENCES</span> <br />
                IN LIBERIA.
              </h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  I operate at the intersection of performance and precision. As a developer, I build fast, meaningful web solutions under the name <span className="text-white font-bold">suahco4</span>.
                </p>
                <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-amber-500/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Location</h4>
                    <p className="text-sm">New Isreal, Brewerville City, Montserrado County, Liberia</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="relative">
               <div className="p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent">
                  <div className="bg-[#0a0a0a] rounded-[2.9rem] p-12 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl" />
                    <h3 className="text-xs font-black uppercase tracking-[0.5em] text-amber-500 mb-8">Official Brand</h3>
                    
                    <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 group hover:border-amber-500/20 transition-all duration-500">
                      {/* Logo Placeholder */}
                      <div className="text-center p-8">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center mb-6 shadow-2xl group-hover:rotate-12 transition-all">
                          <Globe className="text-slate-600" size={40} />
                        </div>
                        <p className="text-white font-black tracking-widest text-sm uppercase">Place your logo here</p>
                        <p className="text-slate-500 text-xs mt-2 font-medium italic">suahco4 digital identity</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between items-end">
                      <div>
                        <p className="text-xs font-mono text-slate-500 mb-1">COMPANY_NAME</p>
                        <p className="text-xl font-black text-white">suahco4.</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-slate-500 mb-1">ESTABLISHED</p>
                        <p className="text-xl font-black text-white">2024</p>
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" className="py-32 px-6 bg-white text-black rounded-[4rem] mx-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              DUAL <br /> MASTERIES.
            </h2>
            <p className="max-w-xs text-slate-600 font-medium border-l-2 border-black pl-6">
              I specialize in high-performance web development and professional organ performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="group p-12 rounded-[3rem] bg-slate-50 hover:bg-black hover:text-white transition-all duration-500">
              <Code2 size={48} className="mb-8" />
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Web Engineering</h3>
              <p className="text-lg opacity-70 mb-12 font-medium">
                Under <span className="font-bold">suahco4</span>, I deliver world-class digital solutions using React, Tailwind, and modern cloud architecture.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Frontend', 'E-commerce', 'UX Strategy', 'Performance'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-current text-xs font-bold uppercase">{tag}</span>
                ))}
              </div>
            </div>

            <div className="group p-12 rounded-[3rem] bg-slate-100 hover:bg-amber-500 transition-all duration-500">
              <Music size={48} className="mb-8" />
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Church Organist</h3>
              <p className="text-lg opacity-70 mb-12 font-medium">
                Professional performance for liturgy, weddings, and concerts. Bringing decades of musical tradition to the modern church.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Hymnody', 'Liturgical', 'Choral', 'Concert'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-current text-xs font-bold uppercase">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div {...fadeInUp}>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8">
              GET IN <br /> TOUCH.
            </h2>
            <p className="text-xl text-slate-400 font-medium">
              Let's create something extraordinary together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <a href="tel:+231778662590" className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left">
              <Phone className="text-amber-500 mb-6" />
              <p className="text-sm font-mono text-slate-500 mb-2 uppercase tracking-widest underline underline-offset-4">Primary Line</p>
              <h4 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">+231 778 662 590</h4>
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={20} />
              </div>
            </a>

            <a href="tel:+231887328159" className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left">
              <Phone className="text-blue-500 mb-6" />
              <p className="text-sm font-mono text-slate-500 mb-2 uppercase tracking-widest underline underline-offset-4">Secondary Line</p>
              <h4 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">+231 887 328 159</h4>
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={20} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-black text-[10px]">S4</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase">suahco4</span>
            </div>
            <p className="text-slate-500 text-sm font-medium tracking-wide">
              © {new Date().getFullYear()} EMMANUEL SUAH. <br className="md:hidden" /> ALL RIGHTS RESERVED.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Location</p>
              <p className="text-sm font-bold text-slate-300">Brewerville, Liberia</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Navigation</p>
              <ul className="text-sm font-bold text-slate-300 space-y-2">
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#expertise" className="hover:text-white">Expertise</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
