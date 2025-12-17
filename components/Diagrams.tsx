
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Trees, BookOpen, ArrowRight, MapPin, HandHeart } from 'lucide-react';

interface ServiceProps {
    title: string;
    desc: string;
    icon: React.ReactNode;
    imageUrl?: string;
    delay: number;
}

export const ServiceCard: React.FC<ServiceProps> = ({ title, desc, icon, imageUrl, delay }) => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(34,197,94,0.15)] hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 border border-nature-50 flex flex-col group h-full"
    >
        {/* Image Header */}
        {imageUrl && (
            <div className="h-48 relative overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-nature-600 shadow-sm">
                    {icon}
                </div>
            </div>
        )}

        <div className={`p-8 flex flex-col items-start gap-4 flex-grow ${!imageUrl ? 'pt-8' : 'pt-6'}`}>
            {!imageUrl && (
                <div className="p-3 bg-nature-50 rounded-xl text-nature-600 group-hover:bg-nature-600 group-hover:text-white transition-colors duration-300">
                    {icon}
                </div>
            )}
            
            <h3 className="font-serif text-xl text-ocean-900 font-semibold">{title}</h3>
            <p className="text-ocean-700/80 leading-relaxed text-sm flex-grow">
                {desc}
            </p>
            <button className="mt-2 text-nature-600 font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={14} />
            </button>
        </div>
    </motion.div>
  );
};

export const ImpactStat: React.FC<{ number: string; label: string }> = ({ number, label }) => {
    return (
        <div className="text-center p-6 border-r last:border-r-0 border-white/20">
            <div className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">{number}</div>
            <div className="text-nature-100 text-sm uppercase tracking-wider font-medium">{label}</div>
        </div>
    )
}

export const AnimalCard: React.FC<{ name: string; species: string; imageUrl: string; onSponsor?: () => void }> = ({ name, species, imageUrl, onSponsor }) => {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_-5px_rgba(34,197,94,0.1)] border border-nature-50 group"
        >
            <div className="h-72 relative overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={`${name} the ${species}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-nature-700 text-xs font-bold shadow-sm z-10">
                    Needs Sponsor
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-xl text-ocean-900 font-bold">{name}</h4>
                    <span className="text-nature-600 text-xs font-bold bg-nature-50 px-2 py-1 rounded-md">{species}</span>
                </div>
                <div className="flex items-center gap-2 text-ocean-600/70 text-sm mb-6">
                    <MapPin size={14} />
                    <span>Rescued Sanctuary</span>
                </div>
                <button 
                    onClick={onSponsor}
                    className="w-full py-3 bg-nature-50 text-nature-700 font-semibold rounded-xl hover:bg-nature-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <HandHeart size={18} /> Sponsor {name}
                </button>
            </div>
        </motion.div>
    )
}
