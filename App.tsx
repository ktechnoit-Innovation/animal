
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { NatureScene } from './components/QuantumScene';
import { ServiceCard, ImpactStat, AnimalCard } from './components/Diagrams';
import { PaymentModal } from './components/Payment';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Shield, Trees, BookOpen, Menu, X, ArrowRight, Mail, Phone, Instagram, Facebook, Twitter, MapPin } from 'lucide-react';

interface NavbarProps {
    onDonate: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onDonate }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className={`font-serif text-2xl font-bold tracking-tight ${scrolled ? 'text-ocean-900' : 'text-ocean-900'}`}>
                        Animal Rescue
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {['Mission', 'Services', 'Adopt', 'Stories'].map((item) => (
                        <a key={item} href="#" className={`text-sm font-medium hover:text-nature-600 transition-colors ${scrolled ? 'text-ocean-800' : 'text-ocean-800'}`}>
                            {item}
                        </a>
                    ))}
                    <button 
                        onClick={onDonate}
                        className="bg-nature-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-nature-700 transition-all shadow-lg shadow-nature-500/30 hover:shadow-nature-500/40 hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        Donate Now <Heart size={16} className="fill-current" />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-ocean-800" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-ocean-100 p-6 flex flex-col gap-4 shadow-xl md:hidden">
                    {['Mission', 'Services', 'Adopt', 'Stories'].map((item) => (
                        <a key={item} href="#" className="text-ocean-800 font-medium py-2 border-b border-ocean-50">
                            {item}
                        </a>
                    ))}
                    <button 
                        onClick={() => {
                            onDonate();
                            setMenuOpen(false);
                        }}
                        className="w-full bg-nature-600 text-white px-6 py-3 rounded-xl font-medium mt-2 shadow-lg shadow-nature-500/30"
                    >
                        Donate Now
                    </button>
                </div>
            )}
        </nav>
    );
};

const App: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const openPayment = () => setIsPaymentOpen(true);
  const closePayment = () => setIsPaymentOpen(false);

  return (
    <div className="min-h-screen bg-white font-sans text-ocean-900 selection:bg-nature-200">
      <Navbar onDonate={openPayment} />
      
      <PaymentModal isOpen={isPaymentOpen} onClose={closePayment} />

      {/* HERO SECTION with 3D Background */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* 3D Scene Background */}
        <div className="absolute inset-0 z-0">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            >
                <source src="video2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
        
        {/* Gradient Overlay for Text Readability - Aesthetic Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white z-0 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center mt-20">
            <motion.div 
                style={{ y: y1, opacity }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-5xl mx-auto"
            >
                <span className="inline-block py-1.5 px-4 rounded-full bg-white/70 backdrop-blur-md border border-nature-200 text-nature-700 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
                    The Voice of Nature
                </span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ocean-900 mb-8 leading-[1.1] tracking-tight">
                    Protecting the <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-600 to-ocean-600 italic pr-2">Pure Heart</span> of Earth
                </h1>
                <p className="text-lg md:text-xl text-ocean-700/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    Restoring balance to our planet through dedicated rescue, habitat renewal, and global harmony initiatives.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                    <button 
                        onClick={openPayment}
                        className="px-8 py-4 bg-nature-600 text-white rounded-full font-semibold text-lg hover:bg-nature-700 transition-all shadow-xl shadow-nature-500/20 hover:shadow-nature-500/40 hover:-translate-y-1"
                    >
                        Start Your Journey
                    </button>
                    <button className="px-8 py-4 bg-white/80 backdrop-blur-lg text-ocean-800 rounded-full font-medium text-lg hover:bg-white transition-all border border-ocean-200 shadow-sm hover:shadow-md">
                        View Our Impact
                    </button>
                </div>
            </motion.div>
        </div>
      </header>

      {/* IMPACT STATS BANNER */}
      <section className="relative z-20 -mt-24 mx-4 md:mx-12">
          <div className="container mx-auto">
              <div className="bg-gradient-to-r from-nature-800 to-ocean-800 rounded-3xl shadow-2xl shadow-ocean-900/20 p-8 md:p-12">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
                      <ImpactStat number="1.2k+" label="Animals Rescued" />
                      <ImpactStat number="850" label="Acres Protected" />
                      <ImpactStat number="45" label="Species Saved" />
                      <ImpactStat number="15k" label="Global Volunteers" />
                  </div>
              </div>
          </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                  <div className="max-w-xl">
                      <h2 className="font-serif text-4xl md:text-5xl text-ocean-900 mb-6 leading-tight">Comprehensive Care <br/>for Animals</h2>
                      <p className="text-ocean-600 leading-relaxed text-lg font-light">
                          Combining modern science with compassionate action to secure a future for all living beings.
                      </p>
                  </div>
                  <button className="hidden md:flex items-center gap-2 text-nature-600 font-semibold border-b-2 border-nature-200 pb-1 hover:text-nature-800 hover:border-nature-800 transition-all">
                      View all programs <ArrowRight size={18} />
                  </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <ServiceCard 
                      title="Emergency Rescue"
                      desc="Saving injured, abused, or stranded animals with rapid response teams."
                      icon={<Heart size={20} />}
                      imageUrl="https://sawct.org/wp-content/uploads/2024/09/rehab.webp"
                      delay={0.1}
                  />
                  <ServiceCard 
                      title="Medical Care"
                      desc="Providing veterinary care and rehabilitation for rescued animals."
                      icon={<Trees size={20} />}
                      imageUrl="data:image/jpeg;base64,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"
                      delay={0.2}
                  />
                  <ServiceCard 
                      title="Shelter & Rehabilitation"
                      desc="Providing safe havens for rescued animals and facilitating their recovery
                      ."
                      icon={<Shield size={20} />}
                      imageUrl="data:image/jpeg;base64,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"
                      delay={0.3}
                  />
                  <ServiceCard 
                      title="Adoption Services"
                      desc="Connecting people with rescued animals in need of loving homes."
                      icon={<BookOpen size={20} />}
                      imageUrl="https://lifelineanimal.org/wp-content/uploads/2022/01/state-of-the-shelters-blog-post-header.jpg"
                      delay={0.4}
                  />
              </div>
          </div>
      </section>

      {/* FEATURED ADOPTION */}
      <section className="py-32 bg-nature-50/30 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
               <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-nature-200 rounded-full blur-[100px]"></div>
               <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-ocean-100 rounded-full blur-[80px]"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                  <h2 className="font-serif text-4xl md:text-5xl text-ocean-900 mb-6">Adopt a Wild Soul</h2>
                  <p className="text-ocean-600 max-w-2xl mx-auto text-lg font-light">
                      Directly fund the food, medical care, and shelter for rescued animals with a monthly sponsorship.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <AnimalCard 
                    onSponsor={openPayment} 
                    name="xyz" 
                    species="Snow Leopard" 
                    imageUrl="https://wwfint.awsassets.panda.org/img/original/news_6_1.jpg"
                  />
                  <AnimalCard 
                    onSponsor={openPayment} 
                    name="xyz" 
                    species="Red Panda" 
                    imageUrl="https://lh5.googleusercontent.com/proxy/UKs2xWTHxrzFZvK4ZkleiuGRnBe7_BhA0Hdqs_9sckADjl8BJfWw8aOgEiF8hRb5NUZfsw1ldDCJazrZrfjT9euTDA"
                  />
                  <AnimalCard 
                    onSponsor={openPayment} 
                    name="xyz" 
                    species="Bengal Tiger" 
                    imageUrl="https://www.shutterstock.com/editorial/image-editorial/N7zecbxdM3T0c65bMjU0Nw==/injured-bengal-tiger-rests-cage-royal-chitwan-550nw-7660516c.jpg"
                  />
              </div>
          </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-32 bg-ocean-900 text-white relative overflow-hidden group">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1564956108502-d96205738874?auto=format&fit=crop&q=80&w=2000" 
                alt="Wolf in nature" 
                className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-ocean-900/80 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-nature-900 via-transparent to-ocean-900/50"></div>
          </div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight drop-shadow-lg">Ready to make a difference?</h2>
              <p className="text-ocean-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-md">
                  Join a community of guardians dedicated to preserving our planet's wild heart. 
                  <br className="hidden md:block" />
                  Your monthly support creates sustainable change.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                  <button 
                    onClick={openPayment}
                    className="group relative px-10 py-4 bg-white text-ocean-900 rounded-full font-bold text-lg hover:bg-nature-50 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)] hover:-translate-y-1 overflow-hidden"
                  >
                      <span className="relative z-10 flex items-center gap-2">
                        Donate Monthly <Heart size={18} className="text-nature-600 fill-nature-600 group-hover:scale-110 transition-transform" />
                      </span>
                  </button>
                  <button className="px-10 py-4 bg-transparent border border-ocean-200/50 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all hover:-translate-y-1 backdrop-blur-sm">
                      Become a Volunteer
                  </button>
              </div>
              
              <p className="mt-8 text-sm text-ocean-300 font-light tracking-wide">
                Cancel anytime. 100% secure payment.
              </p>
          </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-ocean-900 py-20 border-t border-ocean-100">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                  <div className="col-span-1 md:col-span-1">
                       <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-nature-600 rounded-xl flex items-center justify-center text-white">
                                <Trees size={20} />
                            </div>
                            <span className="font-serif text-2xl font-bold text-ocean-900">Animal Rescue</span>
                        </div>
                        <p className="text-ocean-500 text-sm leading-relaxed mb-6">
                            Dedicated to the conservation of biodiversity and protection of endangered species worldwide.
                        </p>
                        <div className="flex gap-4">
                            <div className="p-2 bg-ocean-50 rounded-full text-ocean-600 hover:bg-nature-600 hover:text-white transition-all cursor-pointer">
                                <Instagram size={18} />
                            </div>
                            <div className="p-2 bg-ocean-50 rounded-full text-ocean-600 hover:bg-nature-600 hover:text-white transition-all cursor-pointer">
                                <Facebook size={18} />
                            </div>
                            <div className="p-2 bg-ocean-50 rounded-full text-ocean-600 hover:bg-nature-600 hover:text-white transition-all cursor-pointer">
                                <Twitter size={18} />
                            </div>
                        </div>
                  </div>
                  
                  <div>
                      <h4 className="text-ocean-900 font-serif text-lg mb-6 font-semibold">Programs</h4>
                      <ul className="space-y-4 text-sm text-ocean-600">
                          <li><a href="#" className="hover:text-nature-700 transition-colors">Wildlife Rescue</a></li>
                          <li><a href="#" className="hover:text-nature-700 transition-colors">Habitat Restoration</a></li>
                          <li><a href="#" className="hover:text-nature-700 transition-colors">Community Outreach</a></li>
                          <li><a href="#" className="hover:text-nature-700 transition-colors">Global Advocacy</a></li>
                      </ul>
                  </div>

                  <div>
                      <h4 className="text-ocean-900 font-serif text-lg mb-6 font-semibold">Get Involved</h4>
                      <ul className="space-y-4 text-sm text-ocean-600">
                          <li><button onClick={openPayment} className="hover:text-nature-700 transition-colors text-left">Donate</button></li>
                          <li><a href="#" className="hover:text-nature-700 transition-colors">Adopt an Animal</a></li>
                          <li><a href="#" className="hover:text-nature-700 transition-colors">Volunteer</a></li>
                          <li><a href="#" className="hover:text-nature-700 transition-colors">Careers</a></li>
                      </ul>
                  </div>
              </div>
              <div className="border-t border-ocean-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ocean-400">
                  <p>© 2025 Animal Rescue. All rights reserved.</p>
                  <div className="flex gap-6">
                      <a href="#" className="hover:text-nature-600">Privacy Policy</a>
                      <a href="#" className="hover:text-nature-600">Terms of Service</a>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default App;
