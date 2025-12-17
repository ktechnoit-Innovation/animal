
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, Calendar, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number | string>(50);
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => setStep('success'), 1500);
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(() => setStep('details'), 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAndReset}
            className="fixed inset-0 bg-ocean-900/40 backdrop-blur-md z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-[90%] max-w-md h-fit bg-white rounded-3xl shadow-2xl z-[70] overflow-hidden border border-nature-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-nature-50 to-white p-6 flex justify-between items-center border-b border-nature-100">
              <h3 className="text-xl font-serif font-bold text-ocean-900 flex items-center gap-2">
                <Lock size={18} className="text-nature-500" />
                Secure Donation
              </h3>
              <button onClick={closeAndReset} className="text-ocean-400 hover:text-nature-600 transition-colors bg-white p-2 rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {step === 'details' && (
                <form onSubmit={handleDonate} className="space-y-6">
                  {/* Amount Selector */}
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-3">Select Amount</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[10, 25, 50, 100].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAmount(val)}
                          className={`py-3 rounded-xl text-sm font-bold transition-all ${
                            amount === val 
                            ? 'bg-nature-600 text-white shadow-lg shadow-nature-500/30 scale-105' 
                            : 'bg-nature-50 text-nature-700 hover:bg-nature-100'
                          }`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-ocean-700 mb-1">Card Number</label>
                      <div className="relative group">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-400 group-focus-within:text-nature-600 transition-colors" size={18} />
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000"
                          className="w-full pl-10 pr-4 py-3 bg-ocean-50/50 border border-ocean-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500/20 focus:border-nature-500 text-ocean-900 placeholder:text-ocean-300 transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                        <label className="block text-sm font-medium text-ocean-700 mb-1">Expiry Date</label>
                        <div className="relative group">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-400 group-focus-within:text-nature-600 transition-colors" size={18} />
                          <input 
                            type="text" 
                            placeholder="MM/YY"
                            className="w-full pl-10 pr-4 py-3 bg-ocean-50/50 border border-ocean-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500/20 focus:border-nature-500 text-ocean-900 placeholder:text-ocean-300 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ocean-700 mb-1">CVC</label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-400 group-focus-within:text-nature-600 transition-colors" size={18} />
                          <input 
                            type="text" 
                            placeholder="123"
                            className="w-full pl-10 pr-4 py-3 bg-ocean-50/50 border border-ocean-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500/20 focus:border-nature-500 text-ocean-900 placeholder:text-ocean-300 transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-nature-600 text-white rounded-xl font-bold text-lg hover:bg-nature-700 transition-all shadow-xl shadow-nature-500/20 hover:shadow-nature-500/40 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Donate ${amount}
                  </button>
                </form>
              )}

              {step === 'processing' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                  <div className="relative">
                      <div className="w-16 h-16 border-4 border-nature-100 rounded-full"></div>
                      <div className="w-16 h-16 border-4 border-nature-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                  </div>
                  <p className="text-nature-600 font-medium animate-pulse">Processing secure payment...</p>
                </div>
              )}

              {step === 'success' && (
                <div className="flex flex-col items-center justify-center py-6 space-y-4 text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2"
                  >
                    <CheckCircle className="text-green-500" size={40} />
                  </motion.div>
                  <h4 className="text-2xl font-serif font-bold text-ocean-900">Thank You!</h4>
                  <p className="text-ocean-600">Your donation has been received. <br/>A receipt has been sent to your email.</p>
                  <button 
                    onClick={closeAndReset}
                    className="mt-6 px-8 py-3 bg-nature-50 text-nature-700 font-semibold rounded-xl hover:bg-nature-100 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
            
            {/* Footer trust badges */}
            {step === 'details' && (
                <div className="bg-ocean-50/30 p-4 border-t border-ocean-50 flex justify-center gap-4 text-ocean-300">
                    <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                        <Lock size={10} /> 256-bit SSL Encrypted
                    </span>
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
