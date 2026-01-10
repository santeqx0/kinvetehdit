import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useAppStore } from '../../store';

const Contact: React.FC = () => {
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('contact');
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [setActiveSection]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.'
    });
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };
  
  return (
    <section id="contact" ref={containerRef} className="py-20 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">Benle iletişime geç</h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-blue-600 rounded-full"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Bir sorununmu var? Ya da sadece bir merhaba demek mi istiyorsun? Benimle iletişime geçmekten çekinme! Her zaman buradayım.
          </p>
        </motion.div>
        
        <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto md:grid-cols-2">
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">İletişim Bilgileri</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">viskibedel@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Telefon</h4>
                    <p className="text-gray-600 dark:text-gray-400">+90 (542) 311 69 62</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Adres</h4>
                    <p className="text-gray-600 dark:text-gray-400">İstanbul</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Takip Et</h3>
              
              <div className="flex space-x-4">
                <motion.a 
                  href="https://github.com/santeqx0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 text-gray-700 transition-colors bg-gray-100 rounded-full dark:bg-slate-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  data-hover
                >
                  <Github size={20} />
                </motion.a>
                
                <motion.a 
                  href="https://x.com/kinvetehdit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 text-gray-700 transition-colors bg-gray-100 rounded-full dark:bg-slate-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  data-hover
                >
                  <Twitter size={20} />
                </motion.a>
                
                <motion.a 
                  href="https://instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 text-gray-700 transition-colors bg-gray-100 rounded-full dark:bg-slate-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  data-hover
                >
                  <Instagram size={20} />
                </motion.a>
              </div>
            </div>
            
            {/* Map or Illustration */}
            <div className="relative h-64 overflow-hidden rounded-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195884.30043145744!2d32.59795774239392!3d39.90352329781131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b0c0842b8d!2sAnkara!5e0!3m2!1str!2str!4v1745762360239!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                className="grayscale"
              ></iframe>
            </div>
          </motion.div>
          
 
        </div>
      </div>
    </section>
  );
};

export default Contact;