/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronDown, 
  MessageCircle,
  ShoppingCart,
  BookOpen,
  Star, 
  Users, 
  Brain, 
  Heart, 
  Stethoscope, 
  ArrowRight, 
  ArrowLeft,
  Menu, 
  X,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  ArrowUpRight,
  ArrowUp,
  Puzzle,
  Baby,
  ToyBrick,
  Ghost,
  Rocket,
  Palette,
  Music,
  Cloud,
  GraduationCap
} from 'lucide-react';

// --- Components ---

const FloatingBackground = ({ className = "fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white hidden md:block" }: { className?: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const elements = [
    { Icon: Puzzle, color: 'text-rainbow-red', top: '10%', left: '5%', size: 60, speed: 20 },
    { Icon: Baby, color: 'text-rainbow-yellow', top: '20%', left: '85%', size: 70, speed: -15 },
    { Icon: ToyBrick, color: 'text-rainbow-blue', top: '70%', left: '10%', size: 65, speed: 25 },
    { Icon: Rocket, color: 'text-rainbow-indigo', top: '80%', left: '80%', size: 80, speed: -20 },
    { Icon: Ghost, color: 'text-rainbow-violet', top: '40%', left: '90%', size: 55, speed: 10 },
    { Icon: Palette, color: 'text-rainbow-orange', top: '15%', left: '45%', size: 50, speed: -10 },
    { Icon: Music, color: 'text-rainbow-green', top: '60%', left: '75%', size: 60, speed: 15 },
    { Icon: Cloud, color: 'text-slate-300', top: '5%', left: '70%', size: 120, speed: 5 },
    { Icon: Star, color: 'text-rainbow-yellow', top: '50%', left: '2%', size: 40, speed: 30 },
    { Icon: Heart, color: 'text-rainbow-red', top: '30%', left: '95%', size: 45, speed: -25 },
    { Icon: Brain, color: 'text-rainbow-blue', top: '90%', left: '40%', size: 50, speed: 15 },
    { Icon: Puzzle, color: 'text-rainbow-green', top: '5%', left: '20%', size: 35, speed: -10 },
    { Icon: ToyBrick, color: 'text-rainbow-orange', top: '95%', left: '15%', size: 40, speed: 20 },
    { Icon: Cloud, color: 'text-slate-200', top: '45%', left: '88%', size: 100, speed: 8 },
  ];

  const spheres = useMemo(() => [...Array(8)].map((_, i) => ({
    color: ['#FF5F5F', '#FFD93D', '#4D96FF', '#A084E8', '#6366F1', '#FFB347', '#6BCB77', '#FFB347'][i % 8],
    size: Math.random() * 400 + 200,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    speed: (i + 1) * 30
  })), []);

  return (
    <div className={className}>
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.color} opacity-60`}
          style={{
            top: el.top,
            left: el.left,
          }}
          animate={{
            x: mousePos.x * el.speed * 4,
            y: mousePos.y * el.speed * 4,
            rotate: [0, 15, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 40, damping: 25 },
            y: { type: 'spring', stiffness: 40, damping: 25 },
            rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <el.Icon size={el.size} strokeWidth={2.5} className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]" />
        </motion.div>
      ))}
      
      {/* 3D-like Spheres */}
      {spheres.map((sphere, i) => (
        <motion.div
          key={`sphere-${i}`}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: sphere.size,
            height: sphere.size,
            background: `radial-gradient(circle at 30% 30%, ${sphere.color}, transparent)`,
            top: sphere.top,
            left: sphere.left,
          }}
          animate={{
            x: mousePos.x * sphere.speed,
            y: mousePos.y * sphere.speed,
          }}
          transition={{ type: 'spring', stiffness: 20, damping: 20 }}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'SOBRE', href: '#specialist' },
    { name: 'PROPÓSITO', href: '#proposito' },
    { name: 'SERVIÇOS', href: '#especialidades' },
    { name: 'E-BOOKS', href: '#ebook' },
    { name: 'FAQ', href: '#faq' },
    { name: 'REDES SOCIAIS', href: '#footer' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-rainbow-violet/15 backdrop-blur-sm md:backdrop-blur-lg border-b border-white/20 ${scrolled ? 'py-3 shadow-lg' : 'py-6'}`}>
      {/* Top Rainbow Line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rainbow-red via-rainbow-yellow via-rainbow-green via-rainbow-blue to-rainbow-violet" />
      
      {/* Bottom Rainbow Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rainbow-red via-rainbow-yellow via-rainbow-green via-rainbow-blue to-rainbow-violet" />
      
      <div className="w-full px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/Captura_de_tela_2026-04-07_151419-removebg-preview.png" 
              alt="Logo Dra. Milena" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-bold tracking-tighter text-gradient-rainbow">DRA. MILENA FERREIRA</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold text-slate-900 tracking-widest hover:text-rainbow-violet transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center space-x-6">
              <motion.a 
                href="#quiz" 
                whileHover="hover"
                whileTap="tap"
                className="relative group px-8 py-3 rounded-full font-bold text-sm tracking-widest flex items-center overflow-hidden shadow-lg"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-rainbow-blue via-rainbow-violet via-rainbow-red via-rainbow-green to-rainbow-yellow transition-transform duration-500 group-hover:scale-105" />
                
                {/* Subtle Rainbow Glow on Hover */}
                <motion.div 
                  variants={{
                    hover: { opacity: 1, scale: 1.2 }
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-rainbow-blue/20 via-rainbow-yellow/20 to-rainbow-violet/20 blur-xl -z-0"
                />

                <span className="relative z-10 text-white mr-3">AGENDAR</span>
                <motion.div 
                  variants={{
                    hover: { x: 3, scale: 1.1 }
                  }}
                  className="relative z-10 w-6 h-6 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-sm"
                >
                  <ArrowUpRight size={14} />
                </motion.div>

                {/* Shine effect */}
                <motion.div 
                  variants={{
                    hover: { x: '200%' }
                  }}
                  initial={{ x: '-100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-20 pointer-events-none"
                />
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-bold text-slate-900 tracking-widest border-l-4 border-transparent hover:border-rainbow-indigo pl-4 transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div 
                className="pt-6 border-t border-slate-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a 
                  href="#quiz" 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-rainbow-blue via-rainbow-violet via-rainbow-red via-rainbow-green to-rainbow-yellow text-white px-8 py-4 rounded-full font-bold tracking-widest shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">AGENDAR</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-transparent">
      {/* Decorative Background Shapes */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-slate-50 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-rainbow-violet/5 shape-leaf-tl pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-60 h-60 bg-rainbow-blue/5 shape-petal pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex flex-col gap-8 mb-12 lg:-ml-20">
              <div className="relative w-full max-w-lg aspect-[4/3] shape-leaf-tr overflow-hidden shadow-2xl bg-white flex items-center justify-center">
                <img 
                  src="/Captura de tela 2026-04-06 144425.png" 
                  alt="Dra. Milena" 
                  className="w-full h-full object-cover scale-110 object-[center_5%]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative w-full max-w-lg aspect-[4/3] shape-leaf-tr overflow-hidden shadow-2xl -mt-32 ml-auto lg:ml-24 bg-white flex items-center justify-center">
                <img 
                  src="/Captura de tela 2026-04-06 150844.png" 
                  alt="Congresso Jornada do Autismo" 
                  className="w-full h-full object-cover object-[25%_15%]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                <span className="text-gradient-hero block">DRA. MILENA FERREIRA</span>
                <span className="text-gradient-hero uppercase">PSICÓLOGA</span>
              </h1>
              <motion.div 
                className="mb-12 max-w-2xl relative group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-white/90 backdrop-blur-sm border border-slate-100 rounded-[2.5rem] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden">
                  {/* Static Rainbow accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-rainbow-red via-rainbow-yellow to-rainbow-blue" />
                  
                  <p className="text-2xl text-slate-700 leading-relaxed font-medium">
                    Transformando o <span className="text-slate-900 font-bold">desenvolvimento infantil</span> através da <span className="text-slate-900 font-bold">Ciência ABA</span> com <span className="text-slate-900 font-bold underline decoration-rainbow-yellow/40 decoration-4 underline-offset-4">23 anos de experiência</span> e <span className="text-slate-900 font-bold">acolhimento</span>.
                  </p>
                </div>
              </motion.div>
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.a 
                  href="#quiz" 
                  className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold flex items-center justify-center shadow-xl group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">INICIAR AVALIAÇÃO GRATUITA</span>
                  <div className="ml-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-900 group-hover:translate-x-1 transition-transform relative z-10">
                    <ArrowUpRight size={18} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-rainbow-indigo to-rainbow-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
                
                <motion.a 
                  href="#specialist" 
                  className="relative group border-2 border-rainbow-blue/50 text-slate-800 px-10 py-4 rounded-full font-bold flex items-center justify-center transition-all bg-white/40 backdrop-blur-md shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Animated background glow */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-rainbow-blue/20 via-rainbow-violet/20 to-rainbow-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ 
                      x: ['-100%', '100%'],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <span className="relative z-10 flex items-center">
                    CONHECER MÉTODO ABA
                    <motion.div
                      animate={{ rotate: [0, 15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="ml-2"
                    >
                      <Star size={18} className="text-rainbow-yellow fill-rainbow-yellow" />
                    </motion.div>
                  </span>

                  {/* Pulsing border effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-rainbow-blue opacity-0 group-hover:opacity-100 animate-ping pointer-events-none" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WaveDivider = ({ flipped = false }: { flipped?: boolean }) => {
  return (
    <div className={`relative w-full h-24 overflow-hidden z-20 pointer-events-none ${flipped ? '-mb-12' : '-mt-12'}`}>
      <svg
        className={`absolute ${flipped ? 'top-0 rotate-180' : 'bottom-0'} w-[200%] h-full`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,0 C150,90 400,0 600,60 C800,120 1050,30 1200,90 L1200,120 L0,120 Z"
          fill="url(#rainbow-gradient)"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="opacity-20"
        />
        <motion.path
          d="M0,0 C150,90 400,0 600,60 C800,120 1050,30 1200,90 L1200,120 L0,120 Z"
          fill="url(#rainbow-gradient)"
          initial={{ x: "-50%" }}
          animate={{ x: 0 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="opacity-10"
        />
        <defs>
          <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5F5F" />
            <stop offset="20%" stopColor="#FFC145" />
            <stop offset="40%" stopColor="#4DFF91" />
            <stop offset="60%" stopColor="#4D96FF" />
            <stop offset="80%" stopColor="#7B61FF" />
            <stop offset="100%" stopColor="#A084E8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Expertise = () => {
  const [showTEAModal, setShowTEAModal] = useState(false);
  const [showDownModal, setShowDownModal] = useState(false);
  const [showAtrasosModal, setShowAtrasosModal] = useState(false);
  const areas = [
    {
      title: "Autismo (TEA)",
      desc: "Intervenção precoce e intensiva focada em comunicação e interação.",
      tagline: "Conexão e Voz",
      color: "from-rainbow-yellow to-rainbow-orange",
      glow: "shadow-rainbow-yellow/40",
      shape: "shape-leaf-tl",
      icon: <Brain size={40} className="text-white" />
    },
    {
      title: "Síndrome de Down",
      desc: "Estímulo cognitivo e motor para potencializar o desenvolvimento global.",
      tagline: "Potencial Infinito",
      color: "from-rainbow-red to-rainbow-orange",
      glow: "shadow-rainbow-red/40",
      shape: "shape-leaf-tr",
      icon: <Heart size={40} className="text-white" />
    },
    {
      title: "Atrasos no Desenvolvimento",
      desc: "Avaliação e intervenção para lacunas no desenvolvimento infantil.",
      tagline: "Marcos de Evolução",
      color: "from-rainbow-violet to-rainbow-indigo",
      glow: "shadow-rainbow-violet/40",
      shape: "shape-leaf-br",
      icon: <Stethoscope size={40} className="text-white" />
    }
  ];

  return (
    <section id="especialidades" className="py-32 bg-transparent overflow-hidden relative">
      {/* Decorative Blobs */}
      <div className="absolute -left-40 top-20 w-80 h-80 bg-rainbow-blue/5 rounded-full blur-3xl -z-10 hidden md:block" />
      <div className="absolute -right-40 bottom-20 w-80 h-80 bg-rainbow-indigo/5 rounded-full blur-3xl -z-10 hidden md:block" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Psicóloga e Terapeuta <span className="text-gradient-rainbow uppercase">Especialista em:</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-blue mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16">
          {areas.map((area, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -15 }}
              onClick={() => {
                if (area.title === "Autismo (TEA)") setShowTEAModal(true);
                if (area.title === "Síndrome de Down") setShowDownModal(true);
                if (area.title === "Atrasos no Desenvolvimento") setShowAtrasosModal(true);
              }}
              className="flex flex-col group cursor-pointer relative"
            >
              {/* Floating Badge */}
              <div className={`absolute -top-4 -right-4 z-20 bg-white shadow-xl rounded-2xl px-4 py-2 border border-slate-100 transform rotate-6 group-hover:rotate-0 transition-transform duration-500`}>
                <span className="text-xs font-black tracking-tighter text-slate-400 uppercase">Especialidade</span>
                <div className={`h-1 w-full bg-gradient-to-r ${area.color} mt-1 rounded-full`} />
              </div>

              <div className="relative mb-10">
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${area.color} blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-700`} />
                
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
                  className={`w-full aspect-square bg-gradient-to-br ${area.color} ${area.shape} flex items-center justify-center shadow-2xl relative z-10 overflow-hidden border-4 border-white/20`}
                >
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
                    <svg width="100%" height="100%">
                      <pattern id={`pattern-${i}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="white" />
                      </pattern>
                      <rect width="100%" height="100%" fill={`url(#pattern-${i})`} />
                    </svg>
                  </div>

                  {/* Animated Icon Container */}
                  <motion.div 
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 8, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                    className="bg-white/30 p-10 rounded-[2rem] backdrop-blur-xl border border-white/50 shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:scale-110 group-hover:bg-white/40 transition-all duration-500"
                  >
                    {area.icon}
                  </motion.div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                  {/* "SABER MAIS" Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <motion.div 
                      initial={{ scale: 0.8, y: 20 }}
                      whileHover={{ scale: 1.1 }}
                      className="bg-white text-slate-900 px-8 py-3 rounded-full font-black text-xs tracking-[0.2em] shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-2"
                    >
                      SABER MAIS
                      <ArrowUpRight size={16} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-1 bg-gradient-to-r ${area.color} rounded-full`} />
                  <span className={`text-xs font-bold tracking-widest uppercase opacity-60`}>{area.tagline}</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-gradient-rainbow transition-all duration-500">
                  {area.title}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium group-hover:text-slate-800 transition-colors duration-300">
                  {area.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TEA Modal */}
      <AnimatePresence>
        {showTEAModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTEAModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40, rotateX: 15 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Decorative Header */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-rainbow-yellow/10 to-transparent -z-10" />
              
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-start mb-8">
                  <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 bg-gradient-to-br from-rainbow-yellow to-rainbow-orange rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rainbow-yellow/30"
                  >
                    <Brain size={32} />
                  </motion.div>
                  <button 
                    onClick={() => setShowTEAModal(false)}
                    className="w-10 h-10 bg-slate-100 hover:bg-rainbow-red hover:text-white rounded-full flex items-center justify-center text-slate-400 transition-all duration-300 shadow-inner group"
                  >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
                
                <div className="space-y-2 mb-6">
                  <span className="text-rainbow-yellow font-black tracking-[0.3em] uppercase text-[10px]">Especialidade TEA</span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight">
                    Enxergando Além do <span className="text-gradient-rainbow">Diagnóstico</span>
                  </h3>
                </div>
                
                <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                  <p className="relative">
                    <span className="absolute -left-4 top-0 text-4xl text-rainbow-yellow/20 font-serif">"</span>
                    O diagnóstico é apenas o começo de uma nova jornada, não o ponto final. Com a Ciência ABA, transformamos barreiras de comunicação em pontes de conexão.
                  </p>
                  <p>
                    Nosso foco é dar voz ao potencial do seu filho, celebrando cada pequena grande vitória e construindo, dia após dia, o caminho para uma vida mais independente e feliz.
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={() => setShowTEAModal(false)}
                    className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-black tracking-widest hover:bg-rainbow-yellow hover:text-slate-900 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3"
                  >
                    ENTENDI
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Síndrome de Down Modal */}
      <AnimatePresence>
        {showDownModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDownModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40, rotateX: -15 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Decorative Header */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-rainbow-red/10 to-transparent -z-10" />
              
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-start mb-8">
                  <motion.div 
                    initial={{ scale: 0, rotate: 20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 bg-gradient-to-br from-rainbow-red to-rainbow-orange rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rainbow-red/30"
                  >
                    <Heart size={32} />
                  </motion.div>
                  <button 
                    onClick={() => setShowDownModal(false)}
                    className="w-10 h-10 bg-slate-100 hover:bg-rainbow-red hover:text-white rounded-full flex items-center justify-center text-slate-400 transition-all duration-300 shadow-inner group"
                  >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
                
                <div className="space-y-2 mb-6">
                  <span className="text-rainbow-red font-black tracking-[0.3em] uppercase text-[10px]">Especialidade Down</span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight">
                    Potencializando Cada <span className="text-gradient-rainbow">Descoberta</span>
                  </h3>
                </div>
                
                <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                  <p className="relative">
                    <span className="absolute -left-4 top-0 text-4xl text-rainbow-red/20 font-serif">"</span>
                    Cada criança tem seu próprio ritmo, e cada conquista merece ser celebrada como um marco histórico.
                  </p>
                  <p>
                    Através de estímulos cognitivos e motores personalizados, trabalhamos para que seu filho supere limites e desenvolva as habilidades necessárias para explorar o mundo com confiança. Acreditamos na força da evolução constante.
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={() => setShowDownModal(false)}
                    className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-black tracking-widest hover:bg-rainbow-red transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3"
                  >
                    ENTENDI
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Atrasos no Desenvolvimento Modal */}
      <AnimatePresence>
        {showAtrasosModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAtrasosModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40, rotateZ: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40, rotateZ: 5 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Decorative Header */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-rainbow-violet/10 to-transparent -z-10" />
              
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-start mb-8">
                  <motion.div 
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 bg-gradient-to-br from-rainbow-violet to-rainbow-indigo rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rainbow-violet/30"
                  >
                    <Stethoscope size={32} />
                  </motion.div>
                  <button 
                    onClick={() => setShowAtrasosModal(false)}
                    className="w-10 h-10 bg-slate-100 hover:bg-rainbow-red hover:text-white rounded-full flex items-center justify-center text-slate-400 transition-all duration-300 shadow-inner group"
                  >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
                
                <div className="space-y-2 mb-6">
                  <span className="text-rainbow-violet font-black tracking-[0.3em] uppercase text-[10px]">Atrasos no Desenvolvimento</span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight">
                    Recuperando o Tempo com <span className="text-gradient-rainbow">Precisão</span>
                  </h3>
                </div>
                
                <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                  <p className="relative">
                    <span className="absolute -left-4 top-0 text-4xl text-rainbow-violet/20 font-serif">"</span>
                    Se você sente que algo está "travado", saiba que a intervenção precoce é a chave para mudar trajetórias.
                  </p>
                  <p>
                    Identificamos as lacunas no desenvolvimento e aplicamos estratégias científicas para que seu filho alcance os marcos esperados. Não se trata apenas de "alcançar os outros", mas de garantir que ele tenha todas as ferramentas para ser a melhor versão de si mesmo.
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={() => setShowAtrasosModal(false)}
                    className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-black tracking-widest hover:bg-rainbow-violet transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3"
                  >
                    ENTENDI
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const About = () => {
  const [showABAModal, setShowABAModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  return (
    <section id="specialist" className="py-32 bg-slate-50/50 backdrop-blur-none md:backdrop-blur-sm overflow-hidden relative">
      {/* Decorative Blobs */}
      <div className="absolute -right-40 top-0 w-96 h-96 bg-rainbow-yellow/5 rounded-full blur-3xl -z-10 hidden md:block" />
      <div className="absolute -left-40 bottom-0 w-96 h-96 bg-rainbow-green/5 rounded-full blur-3xl -z-10 hidden md:block" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            {/* Main Image */}
            <div className="w-full aspect-square shape-organic-1 bg-white p-4 shadow-xl relative z-10">
              <img 
                src="/Captura de tela 2026-04-07 134125.png" 
                alt="Dra. Milena" 
                className="w-full h-full object-cover shape-organic-1"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Smaller Image 1 - Top Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -top-12 -right-12 w-48 h-48 bg-white p-3 shadow-2xl z-20 shape-organic-2 overflow-hidden hidden md:block"
            >
              <img 
                src="/Captura de tela 2026-04-07 134149.png" 
                alt="Dra. Milena e paciente" 
                className="w-full h-full object-cover shape-organic-2"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Smaller Image 2 - Bottom Left */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-12 -left-12 w-48 h-48 bg-white p-3 shadow-2xl z-20 shape-petal overflow-hidden hidden md:block"
            >
              <img 
                src="/Captura de tela 2026-04-07 183553.png" 
                alt="Dra. Milena e paciente" 
                className="w-full h-full object-cover shape-petal"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-rainbow-indigo shape-petal -z-10 opacity-20" />
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border-2 border-rainbow-indigo/30 text-rainbow-indigo font-black text-sm tracking-[0.2em] mb-6 shadow-xl shadow-rainbow-indigo/10 relative group"
              >
                <div className="absolute inset-0 bg-rainbow-indigo/5 rounded-full blur-md group-hover:blur-lg transition-all" />
                <div className="w-2.5 h-2.5 rounded-full bg-rainbow-indigo animate-pulse relative z-10" />
                <span className="relative z-10">CRP 06/123456</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-8">
                Quem é a <br />
                <span className="text-gradient-rainbow">Dra. Milena Ferreira?</span>
              </h2>
              
              <div className="space-y-8">
                <p className="text-xl md:text-2xl text-slate-700 font-semibold leading-relaxed border-l-4 border-rainbow-indigo pl-6 py-2 bg-gradient-to-r from-rainbow-indigo/5 to-transparent rounded-r-xl">
                  Psicóloga com <span className="text-rainbow-indigo">23 anos</span> de dedicação exclusiva à evolução infantil. 
                </p>

                <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rainbow-blue to-rainbow-indigo flex items-center justify-center text-white shadow-lg shadow-rainbow-blue/20 group-hover:scale-110 transition-transform">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase mb-1">Formação Acadêmica</p>
                    <p className="text-lg text-slate-800 font-bold leading-tight">
                      Centro Universitário <span className="text-rainbow-blue">Celso Lisboa - RJ</span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6 text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                  <p>
                    Especialista em <span className="text-slate-900 font-bold">Ciência ABA</span>, seu trabalho une o rigor científico de décadas de experiênca ao acolhimento humanizado que cada família precisa.
                  </p>
                  <p className="bg-white/50 p-6 rounded-2xl shadow-sm border border-slate-100 italic">
                    "Acreditamos que cada criança é única e merece um plano de desenvolvimento que respeite seu ritmo e potencialize suas habilidades naturais."
                  </p>
                </div>

                <div className="pt-8 flex flex-wrap gap-4">
                  <motion.button 
                    onClick={() => setShowABAModal(true)}
                    className="relative btn-rainbow group px-12 py-6 text-xl shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_50px_rgba(79,70,229,0.5)] transition-all overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    
                    <span className="relative z-10 flex items-center font-black tracking-wider">
                      MÉTODO ABA
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="ml-3"
                      >
                        <Star className="text-white fill-white" size={24} />
                      </motion.div>
                    </span>

                    {/* Outer pulse effect */}
                    <div className="absolute inset-0 rounded-full bg-rainbow-indigo/20 animate-pulse-slow -z-10" />
                  </motion.button>

                  <motion.button 
                    onClick={() => setShowServiceModal(true)}
                    className="relative group border-2 border-rainbow-blue/50 text-slate-800 px-10 py-6 rounded-full font-bold text-lg flex items-center justify-center transition-all bg-white/40 backdrop-blur-md shadow-lg overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center">
                      COMO FUNCIONAM OS ATENDIMENTOS
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="ml-2"
                      >
                        <HelpCircle size={22} className="text-rainbow-blue" />
                      </motion.div>
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ABA Modal */}
      <AnimatePresence>
        {showABAModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowABAModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 md:p-10 bg-gradient-to-r from-rainbow-indigo to-rainbow-violet text-white flex justify-between items-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold">O que é o Método ABA?</h3>
                  <p className="text-white/80 mt-2 font-medium">Ciência e Evolução no Autismo</p>
                </div>
                <button 
                  onClick={() => setShowABAModal(false)}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                  <p className="text-xl text-slate-800 font-semibold">
                    A análise do comportamento aplicada, muito conhecida pela sigla ABA, é uma área de conhecimento que desenvolve pesquisas e aplicações a partir dos princípios básicos da ciência da Análise do comportamento.
                  </p>
                  
                  <p>
                    Ao longo de mais de 50 anos de pesquisas científicas, controladas e confiáveis, foram descobertos diversos princípios básicos que influenciam o comportamento humano.
                  </p>

                  <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-rainbow-blue">
                    <p>
                      Por exemplo, foi descoberto que diferentes tipos de consequências aumentam ou diminuem a probabilidade de comportamentos ocorrerem no futuro. Também foi descoberto que diferentes tipos de condições antecedentes, motivadoras ou não, aumentam ou diminuem as chances de determinados comportamentos ocorrerem.
                    </p>
                  </div>

                  <p>
                    A partir desses e de outros princípios, que serão explicados posteriormente, uma série de tecnologias foram elaboradas para desenvolver repertórios comportamentais saudáveis e eficazes nas mais diversas populações.
                  </p>

                  <p className="font-bold text-rainbow-indigo">
                    Isso mesmo, Análise do Comportamento Aplicada, ou ABA, pode ocorrer com diversas populações e em diversos contextos! Onde houver comportamento humano, ali pode haver ABA.
                  </p>

                  <p>
                    A ABA não é um método ou pacote de intervenções fechado, ela é uma área de investigação e aplicação dinâmica que evolui na medida em que novos princípios comportamentais são descobertos por meio de pesquisas científicas da Análise do Comportamento.
                  </p>

                  <div className="py-4 border-y border-slate-100">
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">Tudo bem, mas onde entra o autismo?</h4>
                    <p>
                      Um dos principais processos comportamentais estudados pela Análise do Comportamento, como um todo, é a aprendizagem. E quando falamos de Autismo, estamos diante de um diagnóstico baseado em déficits e excessos comportamentais, por exemplo, ausência de comunicação.
                    </p>
                  </div>

                  <p>
                    E quando falamos de déficits e excessos comportamentais, nós pensamos em formas de desenvolver tais déficits e diminuir tais excessos.
                  </p>

                  <p className="text-xl text-slate-800 font-medium">
                    Acontece que anos de pesquisa sobre os princípios envolvidos na aprendizagem de novos comportamentos coloca a ABA em uma posição privilegiada para desenvolver estratégias de ensino eficazes até para os casos mais desafiadores.
                  </p>

                  <div className="bg-rainbow-green/10 p-8 rounded-3xl border-2 border-rainbow-green/20">
                    <p className="text-2xl font-bold text-slate-900 text-center">
                      Por isso é o mais indicado para tratar os atrasos de desenvolvimento, principalmente no Autismo.
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={() => setShowABAModal(false)}
                    className="btn-rainbow px-12 py-4"
                  >
                    ENTENDI, OBRIGADO!
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Service Modal */}
      <AnimatePresence>
        {showServiceModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowServiceModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 md:p-10 bg-gradient-to-r from-rainbow-blue to-rainbow-indigo text-white flex justify-between items-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold">Nossos Atendimentos</h3>
                  <p className="text-white/80 mt-2 font-medium">Cuidado individualizado e acolhedor</p>
                </div>
                <button 
                  onClick={() => setShowServiceModal(false)}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 text-rainbow-indigo">
                    <Star className="fill-rainbow-indigo" size={24} />
                    <h4 className="text-2xl font-bold">✨ Agenda aberta para atendimentos</h4>
                  </div>

                  <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed">
                    <p className="font-medium text-slate-800">
                      Cada criança tem sua forma de aprender, se comunicar e se desenvolver — e é a partir disso que o trabalho terapêutico precisa começar.
                    </p>
                    
                    <p>
                      Atuo com foco no desenvolvimento infantil, auxiliando crianças com autismo, Síndrome de Down e outras demandas do neurodesenvolvimento, promovendo autonomia, comunicação, habilidades sociais e regulação emocional.
                    </p>

                    <div className="bg-slate-50 p-8 rounded-3xl border-l-4 border-rainbow-yellow">
                      <p className="italic text-slate-700">
                        Os atendimentos são planejados de forma individualizada, respeitando o tempo, as necessidades e o potencial de cada criança. 🌱
                      </p>
                    </div>

                    <div className="bg-rainbow-blue/5 p-8 rounded-3xl border-t-4 border-rainbow-blue space-y-6">
                      <h5 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        💰 Custo-benefício do Atendimento Domiciliar em ABA
                      </h5>
                      <p className="text-slate-700">
                        O atendimento domiciliar em ABA oferece um ótimo custo-benefício, porque o investimento feito traz resultados diretos e duradouros para a criança e a família.
                      </p>
                      
                      <div className="space-y-4">
                        <h6 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                          🏠 Por que vale a pena?
                        </h6>
                        <ul className="space-y-3 list-none">
                          <li className="flex items-start gap-3">
                            <span className="text-rainbow-blue text-xl">•</span>
                            <span>O ambiente é real e funcional — o que acelera o aprendizado.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-rainbow-blue text-xl">•</span>
                            <span>A participação da família potencializa os resultados.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-rainbow-blue text-xl">•</span>
                            <span>Evita gastos extras com transporte e tempo de deslocamento.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-rainbow-blue text-xl">•</span>
                            <span>A terapia é personalizada e focada nas necessidades da criança.</span>
                          </li>
                        </ul>
                      </div>

                      <p className="font-bold text-slate-800">
                        Ou seja: cada sessão gera avanços significativos na rotina, comunicação e autonomia.
                      </p>
                      
                      <p className="text-xl font-bold text-rainbow-indigo text-center pt-4">
                        Mais que um custo, é um investimento na qualidade de vida da criança e de toda a família. 💙
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={() => setShowServiceModal(false)}
                    className="btn-rainbow px-12 py-4"
                  >
                    FECHAR
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Purpose = () => {
  const images = [
    "/Captura de tela 2026-04-07 183553.png",
    "/Captura de tela 2026-04-07 134149.png",
    "/Captura de tela 2026-04-07 134125.png",
    "/Captura de tela 2026-04-06 144425.png",
    "/Captura de tela 2026-04-06 150844.png",
    "/Captura de tela 2026-04-07 183428.png",
    "/Captura de tela 2026-04-10 182842.png",
    "/Captura de tela 2026-04-10 182855.png",
    "/Captura de tela 2026-04-10 182913.png",
    "/Captura de tela 2026-04-10 182924.png",
    "/Captura de tela 2026-04-10 182933.png",
    "/Captura de tela 2026-04-10 182941.png",
    "/Captura de tela 2026-04-10 182946.png",
    "/Captura de tela 2026-04-10 183002.png",
    "/Captura de tela 2026-04-10 183017.png",
    "/Captura de tela 2026-04-10 183024.png",
    "/Captura de tela 2026-04-10 183029.png",
    "/Captura de tela 2026-04-10 183126.png",
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="proposito" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-white to-pink-50/30">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-pink-200/40 animate-pulse">
        <Heart size={120} fill="currentColor" />
      </div>
      <div className="absolute bottom-20 right-10 text-pink-200/40 animate-pulse" style={{ animationDelay: '1s' }}>
        <Heart size={80} fill="currentColor" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-pink-100 text-pink-600 font-black text-sm tracking-[0.2em] mb-6 uppercase"
          >
            <Heart size={16} className="fill-pink-600" />
            Amor e Dedicação
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight"
          >
            Meu <span className="text-pink-500">Propósito</span> de Vida
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Cada sorriso, cada pequena conquista e cada passo no desenvolvimento de uma criança é o que me motiva todos os dias. Meu trabalho é guiado pelo amor e pela ciência.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative group max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full flex items-center justify-center overflow-hidden"
              >
                {/* Blurred Background to fill space */}
                <img
                  src={images[currentIndex]}
                  alt="background blur"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Main Image - Contain to show full image */}
                <motion.img
                  src={images[currentIndex]}
                  alt={`Atendimento Dra. Milena ${currentIndex + 1}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative z-10 w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none z-20" />
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 -left-4 md:-left-12 flex items-center">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white shadow-2xl flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all border-4 border-pink-50 z-30"
            >
              <ArrowLeft size={32} />
            </motion.button>
          </div>
          <div className="absolute inset-y-0 -right-4 md:-right-12 flex items-center">
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white shadow-2xl flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all border-4 border-pink-50 z-30"
            >
              <ArrowRight size={32} />
            </motion.button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-12 bg-pink-500' : 'w-3 bg-pink-200 hover:bg-pink-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 bg-white rounded-[2rem] shadow-xl border border-pink-100 relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <Star size={24} fill="currentColor" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-800 italic leading-relaxed">
              "Transformar vidas através do desenvolvimento infantil é a minha maior missão."
            </p>
            <p className="mt-4 text-pink-500 font-black tracking-widest uppercase text-sm">Dra. Milena Ferreira</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Quiz = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
    {
      q: "Qual a idade da criança?",
      options: ["0-2 anos", "3-5 anos", "6-10 anos", "Acima de 10 anos"]
    },
    {
      q: "Qual o sexo da criança?",
      options: ["Masculino", "Feminino"]
    },
    {
      q: "A criança já possui diagnóstico?",
      options: ["Sim, Autismo (TEA)", "Sim, Síndrome de Down", "Em investigação", "Não possui diagnóstico"]
    },
    {
      q: "Qual a principal demanda ou dificuldade?",
      options: ["Atraso na fala/comunicação", "Comportamento desafiador", "Interação social", "Dificuldade escolar/aprendizagem"]
    },
    {
      q: "Já recebeu indicação para Terapia Comportamental (ABA)?",
      options: ["Sim, por médico/especialista", "Não, estou buscando por conta própria", "Ainda não sei o que é ABA"]
    },
    {
      q: "Qual o melhor período para realizar a consulta?",
      options: ["Manhã", "Tarde", "Noite", "Sábado (sob consulta)"]
    }
  ];

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = option;
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsFinished(true);
      }, 2500);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "5521982694085";
    const message = `Olá Dra. Milena! Gostaria de agendar uma consulta. Aqui estão as informações da triagem digital:

📌 *Idade:* ${answers[0]}
📌 *Sexo:* ${answers[1]}
📌 *Diagnóstico:* ${answers[2]}
📌 *Demanda:* ${answers[3]}
📌 *Indicação ABA:* ${answers[4]}
📌 *Período Preferencial:* ${answers[5]}

Aguardo seu retorno para prosseguirmos com o atendimento.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="quiz" className="py-20 md:py-32 bg-transparent relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 100, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 top-1/2 w-96 h-96 bg-rainbow-red/10 rounded-full blur-[100px] -z-10 hidden md:block" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          x: [0, -100, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -left-20 top-1/4 w-80 h-80 bg-rainbow-indigo/10 rounded-full blur-[100px] -z-10 hidden md:block" 
      />
      
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Rainbow Border Glow - Enhanced */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-rainbow-red via-rainbow-yellow via-rainbow-green via-rainbow-blue to-rainbow-violet rounded-[3.2rem] blur-xl opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse" />
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-20 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.6)] border border-slate-600/50 min-h-[550px] flex flex-col justify-center">
            {/* Decorative Corner Shapes */}
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-80 h-80 bg-rainbow-yellow/10 shape-leaf-tr -mr-32 -mt-32 blur-3xl" 
            />
            <motion.div 
              animate={{ rotate: -360, scale: [1, 1.1, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-80 h-80 bg-rainbow-blue/10 shape-leaf-bl -ml-32 -mb-32 blur-3xl" 
            />
            
            {!hasStarted ? (
              <div className="text-center relative z-10 py-10 md:py-20">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-24 h-24 bg-gradient-to-br from-rainbow-indigo to-rainbow-purple text-white rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-rainbow-indigo/30"
                >
                  <Stethoscope size={48} />
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight md:tracking-tighter">
                  Triagem <span className="text-gradient-rainbow">Digital</span>
                </h2>
                <p className="text-xl md:text-2xl text-slate-300 mb-14 font-medium leading-relaxed max-w-2xl mx-auto">
                  Inicie seu atendimento respondendo a algumas perguntas rápidas para que possamos entender melhor as necessidades da sua criança.
                </p>
                <motion.button
                  onClick={() => setHasStarted(true)}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(77, 150, 255, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 hover:from-violet-500 hover:via-fuchsia-400 hover:to-pink-400 text-white mx-auto flex items-center gap-4 px-12 py-8 text-2xl shadow-[0_20px_60px_-10px_rgba(168,85,247,0.6)] hover:shadow-[0_25px_70px_-10px_rgba(168,85,247,0.8)] rounded-full font-black transition-all group"
                >
                  <span className="font-black tracking-wider">INICIAR AVALIAÇÃO GRATUITA</span>
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </div>
            ) : isLoading ? (
              <div className="text-center relative z-10 py-20">
                <div className="relative w-24 h-24 mx-auto mb-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-rainbow-indigo/20 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-4 border-rainbow-indigo rounded-full"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center text-rainbow-indigo"
                  >
                    <Brain size={32} />
                  </motion.div>
                </div>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl font-black text-white tracking-tight"
                >
                  Processando <span className="text-gradient-rainbow">Informações</span>
                </motion.h2>
                <p className="text-slate-300 mt-4 font-medium text-lg">Estamos preparando sua triagem personalizada para a Dra. Milena.</p>
              </div>
            ) : !isFinished ? (
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                      <div className="flex items-center gap-4">
                        {step > 0 && (
                          <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={handleBack}
                            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-rainbow-indigo hover:border-rainbow-indigo transition-all shadow-sm"
                            title="Voltar"
                          >
                            <ArrowLeft size={20} />
                          </motion.button>
                        )}
                        <div>
                          <span className="text-xs font-black tracking-[0.3em] text-rainbow-indigo uppercase mb-2 block">TRIAGEM DIGITAL</span>
                          <div className="h-1.5 w-20 bg-gradient-to-r from-rainbow-indigo to-transparent rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-400">PROGRESSO</span>
                        <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                            className="h-full bg-gradient-to-r from-rainbow-blue to-rainbow-indigo"
                          />
                        </div>
                        <span className="text-xs font-black text-rainbow-indigo">{step + 1}/{questions.length}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-white mb-8 md:mb-12 leading-[1.2] md:leading-[1.1] tracking-tight md:tracking-tighter">{questions[step].q}</h2>
                  </motion.div>
                </AnimatePresence>
                <div className="grid gap-4">
                  {questions[step].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      whileHover={{ 
                        scale: 1.02, 
                        x: 10,
                        backgroundColor: "#ffffff",
                        borderColor: "#4D96FF",
                        boxShadow: "0 20px 40px -15px rgba(77, 150, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="w-full text-left p-5 md:p-8 rounded-2xl md:rounded-3xl bg-white border-2 border-slate-50 transition-all font-bold text-slate-700 shadow-sm flex items-center justify-between group overflow-hidden relative"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-2 bg-rainbow-blue transition-all duration-300" />
                      <span className="text-base md:text-xl relative z-10 pr-4">{opt}</span>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-rainbow-blue relative z-10 shrink-0"
                      >
                        <ArrowRight size={20} className="md:w-6 md:h-6" />
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center relative z-10">
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12, delay: 0.2 }}
                  className="w-32 h-32 bg-gradient-to-br from-rainbow-green to-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-200 relative"
                >
                  <CheckCircle2 size={60} />
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-[2.5rem] border-4 border-emerald-400"
                  />
                </motion.div>
                <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 tracking-tight md:tracking-tighter leading-tight">
                  Tudo <span className="text-gradient-rainbow">Pronto!</span>
                </h2>
                
                <div className="mb-10 p-8 bg-rainbow-blue/20 rounded-3xl border-2 border-rainbow-blue/40 inline-block">
                  <p className="text-slate-300 font-bold uppercase tracking-widest text-sm mb-2">Valor da Consulta Presencial</p>
                  <div className="text-4xl md:text-6xl font-black text-rainbow-blue">R$ 150,00</div>
                </div>

                <p className="text-lg md:text-2xl text-slate-300 mb-10 md:mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
                  Sua triagem foi processada. Agora, clique no botão para enviar os dados e agendar sua consulta.
                </p>
                <motion.button
                  onClick={handleWhatsAppRedirect}
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    boxShadow: ["0 20px 40px -10px rgba(79, 70, 229, 0.2)", "0 20px 40px -10px rgba(79, 70, 229, 0.5)", "0 20px 40px -10px rgba(79, 70, 229, 0.2)"] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:via-teal-300 hover:to-cyan-300 text-white w-full md:w-auto mx-auto flex items-center justify-center gap-3 md:gap-4 px-8 md:px-16 py-6 md:py-8 text-lg md:text-2xl shadow-[0_20px_60px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_25px_70px_-10px_rgba(16,185,129,0.7)] rounded-full font-black transition-all relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 font-black tracking-wider">FINALIZAR AGENDAMENTO</span>
                  <MessageCircle size={24} className="md:w-8 md:h-8 relative z-10 animate-bounce" />
                </motion.button>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-10 text-sm text-slate-400 font-black tracking-[0.4em] uppercase"
                >
                  Conexão direta com a Dra. Milena
                </motion.p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) - 0.5,
          y: ((e.clientY - rect.top) / rect.height) - 0.5
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const faqs = [
    {
      question: "Como funciona o atendimento domiciliar?",
      answer: "A Dra. Milena realiza intervenções diretamente na casa da criança. O atendimento no ambiente natural é fundamental na Ciência ABA, pois permite que a criança aprenda e generalize habilidades no local onde ela passa a maior parte do tempo, facilitando a rotina da família e garantindo resultados mais práticos e duradouros."
    },
    {
      question: "O que é a Ciência ABA?",
      answer: "A Análise do Comportamento Aplicada (ABA) é uma abordagem científica focada em entender e melhorar comportamentos socialmente significativos. É amplamente reconhecida como o padrão ouro para o tratamento do Autismo, focando em ensinar novas habilidades e reduzir comportamentos desafiadores através de reforço positivo."
    },
    {
      question: "Com qual idade devo iniciar a intervenção?",
      answer: "Quanto mais cedo, melhor! A intervenção precoce (idealmente antes dos 3 anos) aproveita a neuroplasticidade da criança, permitindo ganhos significativos no desenvolvimento da linguagem, interação social e autonomia."
    },
    {
      question: "Como funciona o acolhimento familiar?",
      answer: "Acreditamos que a família é a base do sucesso. No atendimento domiciliar, o treinamento parental é ainda mais efetivo, pois orientamos os pais em tempo real dentro da dinâmica da casa, capacitando-os para lidar com os desafios do dia a dia."
    }
  ];

  const floatingIcons = [
    { Icon: HelpCircle, color: 'text-rainbow-blue/20', top: '10%', left: '5%', size: 40, speed: 15 },
    { Icon: Brain, color: 'text-rainbow-yellow/20', top: '20%', left: '85%', size: 50, speed: -10 },
    { Icon: Puzzle, color: 'text-rainbow-red/20', top: '70%', left: '10%', size: 45, speed: 20 },
    { Icon: Heart, color: 'text-rainbow-violet/20', top: '80%', left: '80%', size: 55, speed: -15 },
    { Icon: Star, color: 'text-rainbow-orange/20', top: '40%', left: '90%', size: 35, speed: 10 },
  ];

  return (
    <section id="faq" ref={sectionRef} className="py-32 relative overflow-hidden bg-white/80 backdrop-blur-md">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-rainbow-red/5 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-rainbow-blue/5 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rainbow-yellow/5 rounded-full blur-[80px]"
        />

        {/* Floating Icons reacting to mouse */}
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.color}`}
            style={{ top: item.top, left: item.left }}
            animate={{
              x: mousePos.x * item.speed * 2,
              y: mousePos.y * item.speed * 2,
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              x: { type: 'spring', stiffness: 50, damping: 30 },
              y: { type: 'spring', stiffness: 50, damping: 30 },
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <item.Icon size={item.size} />
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4 block">DÚVIDAS FREQUENTES</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Perguntas <span className="text-gradient-rainbow">Frequentes</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-blue mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className={`border-2 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-xl ${activeIndex === i ? 'border-rainbow-blue/30 shadow-rainbow-blue/5' : 'border-slate-50'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full px-10 py-8 flex items-center justify-between text-left group relative"
              >
                {/* Subtle background glow on active */}
                {activeIndex === i && (
                  <motion.div 
                    layoutId="active-bg"
                    className="absolute inset-0 bg-gradient-to-r from-rainbow-blue/5 to-transparent -z-10"
                  />
                )}
                
                <span className={`text-xl font-bold transition-colors duration-300 ${activeIndex === i ? 'text-rainbow-blue' : 'text-slate-800 group-hover:text-rainbow-blue'}`}>
                  {faq.question}
                </span>
                
                <motion.div 
                  animate={{ 
                    rotate: activeIndex === i ? 180 : 0,
                    backgroundColor: activeIndex === i ? 'rgba(77, 150, 255, 0.1)' : 'rgba(248, 250, 252, 1)',
                    color: activeIndex === i ? '#4D96FF' : '#94a3b8'
                  }}
                  className="p-3 rounded-full transition-colors"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-10 pb-10 text-lg text-slate-600 leading-relaxed font-medium">
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ebooksData = [
  {
    title: "Recuperando o Tempo com",
    titleHighlight: "Precisão",
    tag: "ATRASOS NO DESENVOLVIMENTO",
    desc: "O Guia Estratégico para Identificar Lacunas no Desenvolvimento e Mudar a Trajetória do seu Filho.",
    features: [
      "Estratégias práticas baseadas na Ciência ABA",
      "Como identificar os primeiros sinais de atraso",
      "Passo a passo para estimular a comunicação",
      "Atividades para o dia a dia em casa"
    ],
    link: "https://wa.me/5521982694085?text=Ol%C3%A1%20Dra.%20Milena%2C%20gostaria%20de%20comprar%20o%20e-book%20%22Recuperando%20o%20Tempo%20com%20Precis%C3%A3o%22.",
    image: "/Gemini_Generated_Image_8nbqmk8nbqmk8nbq.png",
    price: "37,90",
    color: "from-rainbow-blue via-rainbow-violet to-rainbow-red",
    badgeColor: "bg-rainbow-yellow text-slate-900"
  },
  {
    title: "Decifrando o Código",
    titleHighlight: "Invisível",
    tag: "TEA",
    desc: "Tudo o que você precisa saber para compreender o universo do TEA e ajudar seu filho(a) a se desenvolver de forma saudável.",
    features: [
      "O que é o TEA e como identificar na prática",
      "Estratégias para comunicação efetiva",
      "Manejo de comportamentos desafiadores",
      "Como promover autonomia e independência"
    ],
    link: "https://wa.me/5521982694085?text=Ol%C3%A1%20Dra.%20Milena%2C%20gostaria%20de%20comprar%20o%20e-book%20%22Decifrando%20o%20C%C3%B3digo%20Invis%C3%ADvel%22.",
    image: "/CAPA%20EBOOK%20TEA.png",
    price: "37,90",
    color: "from-rainbow-green via-rainbow-blue to-rainbow-violet",
    badgeColor: "bg-rainbow-green text-slate-900"
  },
  {
    title: "Construindo o",
    titleHighlight: "Amanhã",
    tag: "SÍNDROME DE DOWN",
    desc: "Um material completo dedicado ao planejamento estruturado e afeto para moldar um futuro promissor e autônomo no desenvolvimento infantil.",
    features: [
      "Planejamento de rotinas saudáveis e eficazes",
      "Ferramentas práticas para o dia a dia",
      "Fortalecimento de vínculos e inteligência emocional",
      "Acolhimento e direcionamento pautado na ciência"
    ],
    link: "https://wa.me/5521982694085?text=Ol%C3%A1%20Dra.%20Milena%2C%20gostaria%20de%20comprar%20o%20e-book%20%22Construindo%20o%20Amanh%C3%A3%22.",
    image: "/down%201.png",
    price: "37,90",
    color: "from-rainbow-red via-rainbow-yellow to-rainbow-orange",
    badgeColor: "bg-rainbow-red text-white"
  }
];

const EbookSales = () => {
  return (
    <section id="ebook" className="py-32 relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 text-white">
      <FloatingBackground className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60" />
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rainbow-blue/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rainbow-violet/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rainbow-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 space-y-32">
        {ebooksData.map((ebook, index) => (
          <div key={index} className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col space-y-8 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}
            >
              <div>
                <span className="text-rainbow-yellow font-black tracking-[0.3em] uppercase text-sm mb-4 flex items-center gap-2">
                  <BookOpen size={18} /> LANÇAMENTO
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-6 flex flex-wrap items-center gap-4">
                  <span>{ebook.title} <span className="text-gradient-rainbow">{ebook.titleHighlight}</span></span>
                  <span className="text-xs md:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-sm self-start mt-2">
                    {ebook.tag}
                  </span>
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-blue rounded-full mb-8" />
                
                <p className="text-xl text-slate-300 leading-relaxed font-medium mb-6">
                  {ebook.desc}
                </p>
                
                <ul className="space-y-4 mb-8">
                  {ebook.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="text-rainbow-green shrink-0 mt-1.5" size={20} />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <motion.a 
                  href={ebook.link} 
                  target="_blank"
                  className={`bg-gradient-to-r ${ebook.color} text-white px-10 py-5 rounded-full font-black text-lg flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_50px_rgba(77,150,255,0.5)] group relative overflow-hidden transition-all hover:scale-105 active:scale-95`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    COMPRAR E-BOOK AGORA
                    <ShoppingCart size={20} />
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 1.5 }}
              className={`relative perspective-1000 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}
            >
              <div className="relative w-full max-w-md mx-auto aspect-[2/3] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden transform-gpu group border-4 border-slate-700/50">
                <img 
                  src={ebook.image} 
                  alt={`Capa do Ebook ${ebook.title} ${ebook.titleHighlight}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none" />
                
                {/* Shine effect over the book cover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
              </div>
              
              {/* Price Badge */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className={`absolute -top-6 -right-2 md:-right-8 ${ebook.badgeColor} w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-slate-900 z-20 ${index % 2 === 0 ? 'rotate-12' : '-rotate-12'}`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Por apenas</span>
                <span className="text-3xl font-black">R$ {ebook.price}</span>
                <span className="text-[10px] font-bold opacity-80 mt-1 text-center leading-tight">oferta de<br/>lançamento</span>
              </motion.div>
            </motion.div>

          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="footer" className="bg-white py-20 border-t border-slate-100 relative z-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 lg:px-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center space-x-3">
            <img 
              src="/Captura_de_tela_2026-04-07_151419-removebg-preview.png" 
              alt="Logo Dra. Milena" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-bold tracking-tighter text-gradient-rainbow">DRA. MILENA FERREIRA</span>
          </div>
          
          <div className="flex space-x-6">
            <motion.a 
              href="https://www.instagram.com/milena_psi_ferreira/" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 hover:text-white hover:bg-gradient-to-tr hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden"
              aria-label="Instagram"
            >
              <Instagram size={28} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
            
            <motion.a 
              href="https://www.facebook.com/milenapsiferreira/" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 hover:text-white hover:bg-[#1877F2] transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden"
              aria-label="Facebook"
            >
              <Facebook size={28} className="relative z-10" />
              <div className="absolute inset-0 bg-[#1877F2] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a 
              href="mailto:milenapsiferreira@gmail.com" 
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 hover:text-white hover:bg-rainbow-blue transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden"
              aria-label="Email"
            >
              <Mail size={28} className="relative z-10" />
              <div className="absolute inset-0 bg-rainbow-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </div>
          
          <div className="text-sm font-bold tracking-widest text-slate-400">
            CRP: 06/123456
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-slate-50 text-center text-xs font-bold tracking-widest text-slate-300">
          © 2026 DRA. MILENA PSICOLOGIA. TODOS OS DIREITOS RESERVADOS.
        </div>
      </motion.div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-28 right-8 z-50 p-4 rounded-full shadow-2xl bg-white border-2 border-slate-100 group overflow-hidden"
          aria-label="Voltar ao topo"
        >
          {/* Rainbow background on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rainbow-red via-rainbow-yellow via-rainbow-green via-rainbow-blue to-rainbow-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <ArrowUp size={24} className="relative z-10 text-slate-900 group-hover:text-white transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {

  return (
    <div className="min-h-screen selection:bg-rainbow-indigo selection:text-white relative bg-white overflow-x-hidden bg-pattern">
      <FloatingBackground />
      
      {/* Floating Decorative Blobs on Edges */}
      <div className="fixed -left-20 top-1/4 w-40 h-40 bg-rainbow-blue/5 rounded-full blur-3xl z-0 hidden md:block" />
      <div className="fixed -right-20 top-2/3 w-60 h-60 bg-rainbow-indigo/5 rounded-full blur-3xl z-0 hidden md:block" />
      <div className="fixed -left-10 bottom-10 w-32 h-32 bg-rainbow-yellow/5 rounded-full blur-3xl z-0 hidden md:block" />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <WaveDivider />
        <Expertise />
        <About />
        <Purpose />
        <EbookSales />
        <FAQ />
        <Quiz />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
