
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
                        WildGuard
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
                <source src="video.mp4" type="video/mp4" />
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
                      <h2 className="font-serif text-4xl md:text-5xl text-ocean-900 mb-6 leading-tight">Comprehensive Care <br/>for Our Planet</h2>
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
                      title="Rescue & Rehab"
                      desc="Emergency response teams available 24/7 to treat injured wildlife and provide rehabilitation."
                      icon={<Heart size={20} />}
                      imageUrl="https://sawct.org/wp-content/uploads/2024/09/rehab.webp"
                      delay={0.1}
                  />
                  <ServiceCard 
                      title="Habitat Restoration"
                      desc="Protecting critical land corridors to ensure safe migration routes for herds."
                      icon={<Trees size={20} />}
                      imageUrl="https://www.rainforestrescue.org.au/wp-content/uploads/2025/03/habitat-restoration-tubestock-nursery-rainforest-rescue-min.jpg"
                      delay={0.2}
                  />
                  <ServiceCard 
                      title="Eco-Guardians"
                      desc="Deploying advanced technology to monitor protected areas and prevent illegal activity."
                      icon={<Shield size={20} />}
                      imageUrl="https://www.fbcnews.com.fj/wp-content/uploads/2024/06/Clean-up-campaign.jpg"
                      delay={0.3}
                  />
                  <ServiceCard 
                      title="Marine Life"
                      desc="Empowering communities with sustainable practices to protect our oceans."
                      icon={<BookOpen size={20} />}
                      imageUrl="https://www.noaa.gov/sites/default/files/styles/landscape_width_650/public/legacy/image/2019/Jun/coral%20ecosystems%20reeffish.jpg?itok=YEV0WvB2"
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
                    name="Amara" 
                    species="Snow Leopard" 
                    imageUrl="https://wwfint.awsassets.panda.org/img/original/news_6_1.jpg"
                  />
                  <AnimalCard 
                    onSponsor={openPayment} 
                    name="Kian" 
                    species="Red Panda" 
                    imageUrl="https://lh5.googleusercontent.com/proxy/UKs2xWTHxrzFZvK4ZkleiuGRnBe7_BhA0Hdqs_9sckADjl8BJfWw8aOgEiF8hRb5NUZfsw1ldDCJazrZrfjT9euTDA"
                  />
                  <AnimalCard 
                    onSponsor={openPayment} 
                    name="Ravi" 
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
                            <span className="font-serif text-2xl font-bold text-ocean-900">WildGuard</span>
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

                  <div>
                      <h4 className="text-ocean-900 font-serif text-lg mb-6 font-semibold">Contact</h4>
                      <ul className="space-y-4 text-sm text-ocean-600">
                          <li className="flex items-center gap-3"><Mail size={16} className="text-nature-500" /> hello@wildguard.org</li>
                          <li className="flex items-center gap-3"><Phone size={16} className="text-nature-500" /> +1 (555) 123-4567</li>
                          <li className="flex items-center gap-3"><MapPin size={16} className="text-nature-500" /> 123 Blue Planet Blvd</li>
                      </ul>
                  </div>
              </div>
              <div className="border-t border-ocean-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ocean-400">
                  <p>© 2024 WildGuard International. All rights reserved.</p>
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
