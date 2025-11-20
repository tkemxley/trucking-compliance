import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Shield, Zap, Activity, Truck, FileCheck, AlertCircle, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { pricingData, serviceOptions } from '../mock';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Landing = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    usdotMc: '',
    serviceNeeded: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({ ...prev, serviceNeeded: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('companyName', formData.companyName);
      formDataToSend.append('contactPerson', formData.contactPerson);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('serviceNeeded', formData.serviceNeeded);
      if (formData.usdotMc) formDataToSend.append('usdotMc', formData.usdotMc);
      if (formData.message) formDataToSend.append('message', formData.message);
      if (selectedFile) formDataToSend.append('file', selectedFile);

      const response = await axios.post(`${API}/compliance-request`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        toast({ title: 'Success!', description: response.data.message });
        setFormData({
          companyName: '',
          contactPerson: '',
          phone: '',
          email: '',
          usdotMc: '',
          serviceNeeded: '',
          message: ''
        });
        setSelectedFile(null);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Something went wrong.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0e27' }}>
      {/* Cyberpunk Header */}
      <header className="sticky top-0 z-50" style={{ background: 'rgba(10, 14, 39, 0.95)', borderBottom: '2px solid #00f0ff', boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Shield className="h-10 w-10" style={{ color: '#00f0ff', filter: 'drop-shadow(0 0 10px #00f0ff)' }} />
              <div>
                <h1 className="text-2xl font-black" style={{ fontFamily: 'Orbitron', color: '#ffffff', textShadow: '0 0 10px #00f0ff' }}>GT IRP SERVICE</h1>
                <p className="text-xs" style={{ color: '#00f0ff', letterSpacing: '2px' }}>COMPLIANCE SYSTEMS</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <span className="state-badge">CALIFORNIA</span>
                <span className="state-badge" style={{ borderColor: '#8338ec', color: '#8338ec', boxShadow: '0 0 10px rgba(131, 56, 236, 0.3)' }}>OREGON</span>
              </div>
              <a href="tel:+17732347187" className="flex items-center space-x-2" style={{ color: '#00f0ff' }}>
                <Phone className="h-5 w-5" />
                <span className="font-bold">773-234-7187</span>
              </a>
              <button onClick={scrollToContact} className="cyber-button">Connect</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Video Background Simulation */}
      <section className="relative video-overlay grid-background" style={{ minHeight: '600px', background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)' }}>
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 70%)',
          animation: 'pulse-glow 3s ease-in-out infinite'
        }}></div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-3 px-6 py-3 cyber-border rounded-lg mb-6">
                <Activity className="h-6 w-6" style={{ color: '#00f0ff' }} />
                <span style={{ fontFamily: 'Orbitron', color: '#00f0ff', letterSpacing: '2px', fontSize: '14px' }}>COMPLIANCE SYSTEMS ONLINE</span>
              </div>
            </div>
            
            <h2 className="text-6xl md:text-7xl font-black mb-6" style={{ 
              fontFamily: 'Orbitron',
              background: 'linear-gradient(135deg, #00f0ff, #8338ec, #ff006e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(0, 240, 255, 0.5)'
            }}>
              CALIFORNIA<br/>& OREGON<br/>COMPLIANCE
            </h2>
            
            <p className="text-2xl mb-12" style={{ color: '#00f0ff', fontWeight: '500' }}>
              CARB / CTC / OREGON SYSTEMS INTEGRATION
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button onClick={scrollToContact} className="cyber-button" style={{ fontSize: '18px', padding: '16px 48px' }}>
                <Zap className="inline h-6 w-6 mr-2" />
                INITIALIZE REQUEST
              </button>
              <a href="tel:+17732347187">
                <button className="cyber-button" style={{ 
                  background: 'linear-gradient(135deg, #8338ec, #ff006e)',
                  boxShadow: '0 0 20px rgba(131, 56, 236, 0.6)',
                  fontSize: '18px',
                  padding: '16px 48px'
                }}>
                  <Phone className="inline h-6 w-6 mr-2" />
                  DIRECT LINE
                </button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="cyber-card p-6 rounded-lg">
                <Truck className="h-12 w-12 mx-auto mb-3" style={{ color: '#00f0ff' }} />
                <p className="text-sm" style={{ color: '#00f0ff', fontFamily: 'Orbitron' }}>FAST PROCESSING</p>
              </div>
              <div className="cyber-card p-6 rounded-lg">
                <FileCheck className="h-12 w-12 mx-auto mb-3" style={{ color: '#00f0ff' }} />
                <p className="text-sm" style={{ color: '#00f0ff', fontFamily: 'Orbitron' }}>24/7 MONITORING</p>
              </div>
              <div className="cyber-card p-6 rounded-lg">
                <Shield className="h-12 w-12 mx-auto mb-3" style={{ color: '#00f0ff' }} />
                <p className="text-sm" style={{ color: '#00f0ff', fontFamily: 'Orbitron' }}>SECURE SYSTEMS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated scan line */}
        <div className="neon-line absolute bottom-0 left-0 right-0"></div>
      </section>

      {/* California Services Section */}
      <section className="py-20 grid-background" style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="state-badge" style={{ fontSize: '14px', padding: '8px 24px' }}>CALIFORNIA SYSTEMS</span>
            </div>
            <h3 className="text-5xl font-black mb-4" style={{ fontFamily: 'Orbitron', color: '#00f0ff', textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
              CA COMPLIANCE PROTOCOLS
            </h3>
            <div className="neon-line max-w-md mx-auto my-6"></div>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* CTC */}
            <div className="cyber-card p-8 rounded-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 240, 255, 0.1)', border: '2px solid #00f0ff' }}>
                  <FileCheck className="h-8 w-8" style={{ color: '#00f0ff' }} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold" style={{ fontFamily: 'Orbitron', color: '#ffffff' }}>CLEAN TRUCK CHECK</h4>
                  <p className="text-sm" style={{ color: '#00f0ff' }}>CTC PROTOCOL</p>
                </div>
              </div>
              <div className="space-y-4">
                {pricingData.california_ctc.services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-4 rounded" style={{ background: 'rgba(0, 240, 255, 0.05)' }}>
                    <div>
                      <p className="font-semibold" style={{ color: '#ffffff' }}>{service.name}</p>
                      <p className="text-sm" style={{ color: '#00f0ff', opacity: 0.7 }}>{service.description}</p>
                    </div>
                    <span className="price-tag">${service.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARB */}
            <div className="cyber-card p-8 rounded-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ background: 'rgba(131, 56, 236, 0.1)', border: '2px solid #8338ec' }}>
                  <Shield className="h-8 w-8" style={{ color: '#8338ec' }} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold" style={{ fontFamily: 'Orbitron', color: '#ffffff' }}>CARB REGISTRATION</h4>
                  <p className="text-sm" style={{ color: '#8338ec' }}>AIR RESOURCES BOARD</p>
                </div>
              </div>
              <div className="space-y-4">
                {pricingData.california_carb.services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-4 rounded" style={{ background: 'rgba(131, 56, 236, 0.05)' }}>
                    <div>
                      <p className="font-semibold" style={{ color: '#ffffff' }}>{service.name}</p>
                      <p className="text-sm" style={{ color: '#8338ec', opacity: 0.7 }}>{service.description}</p>
                    </div>
                    <span className="price-tag" style={{ color: '#8338ec', textShadow: '0 0 20px #8338ec' }}>${service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bonus Package */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="cyber-card p-8 rounded-lg pulse-glow" style={{ borderColor: '#ff006e', boxShadow: '0 0 30px rgba(255, 0, 110, 0.4)' }}>
              <div className="text-center mb-6">
                <span className="state-badge" style={{ borderColor: '#ff006e', color: '#ff006e', boxShadow: '0 0 10px rgba(255, 0, 110, 0.5)' }}>PREMIUM PACKAGE</span>
              </div>
              {pricingData.california_bonus.services.map((service) => (
                <div key={service.id} className="text-center">
                  <h4 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Orbitron', color: '#ffffff' }}>{service.name}</h4>
                  <p className="text-lg mb-4" style={{ color: '#ff006e' }}>{service.description}</p>
                  <div className="text-6xl font-black mb-4" style={{ fontFamily: 'Orbitron', color: '#ff006e', textShadow: '0 0 30px #ff006e' }}>${service.price}</div>
                  <p className="text-xl mb-6" style={{ color: '#00f0ff' }}>SAVE ${service.savings}</p>
                  <button onClick={scrollToContact} className="cyber-button" style={{ 
                    background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                    boxShadow: '0 0 30px rgba(255, 0, 110, 0.6)',
                    fontSize: '18px',
                    padding: '16px 64px'
                  }}>
                    ACTIVATE PACKAGE
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Oregon Services Section */}
      <section className="py-20 grid-background" style={{ background: 'linear-gradient(180deg, #1a1f3a 0%, #0a0e27 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="state-badge" style={{ borderColor: '#8338ec', color: '#8338ec', fontSize: '14px', padding: '8px 24px' }}>OREGON SYSTEMS</span>
            </div>
            <h3 className="text-5xl font-black mb-4" style={{ fontFamily: 'Orbitron', color: '#8338ec', textShadow: '0 0 20px rgba(131, 56, 236, 0.5)' }}>
              OR COMPLIANCE PROTOCOLS
            </h3>
            <div className="neon-line max-w-md mx-auto my-6" style={{ background: 'linear-gradient(90deg, transparent, #8338ec, transparent)', boxShadow: '0 0 10px #8338ec' }}></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="cyber-card p-8 rounded-lg">
              <div className="space-y-4">
                {pricingData.oregon.services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-6 rounded" style={{ background: 'rgba(131, 56, 236, 0.05)', border: '1px solid rgba(131, 56, 236, 0.2)' }}>
                    <div>
                      <p className="text-xl font-bold" style={{ color: '#ffffff', fontFamily: 'Orbitron' }}>{service.name}</p>
                      <p className="text-sm mt-1" style={{ color: '#8338ec', opacity: 0.8 }}>{service.description}</p>
                    </div>
                    <span className="price-tag" style={{ color: '#8338ec', textShadow: '0 0 20px #8338ec' }}>${service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Penalties Warning */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #1a0a1f 0%, #0a0e27 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="cyber-card p-12 rounded-lg text-center" style={{ borderColor: '#ff006e', boxShadow: '0 0 40px rgba(255, 0, 110, 0.3)' }}>
              <AlertCircle className="h-20 w-20 mx-auto mb-6" style={{ color: '#ff006e', filter: 'drop-shadow(0 0 20px #ff006e)' }} />
              <h3 className="text-4xl font-black mb-4" style={{ fontFamily: 'Orbitron', color: '#ff006e', textShadow: '0 0 20px rgba(255, 0, 110, 0.5)' }}>
                NON-COMPLIANCE DETECTED
              </h3>
              <p className="text-xl mb-6" style={{ color: '#ffffff' }}>CALIFORNIA: $1,000 - $10,000 PENALTIES | OREGON: $440 FIXED VIOLATIONS</p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded" style={{ background: 'rgba(255, 0, 110, 0.1)', border: '1px solid #ff006e' }}>
                  <p className="font-bold" style={{ color: '#ff006e', fontFamily: 'Orbitron' }}>REGISTRATION HOLD</p>
                </div>
                <div className="p-4 rounded" style={{ background: 'rgba(255, 0, 110, 0.1)', border: '1px solid #ff006e' }}>
                  <p className="font-bold" style={{ color: '#ff006e', fontFamily: 'Orbitron' }}>VEHICLE IMPOUND</p>
                </div>
                <div className="p-4 rounded" style={{ background: 'rgba(255, 0, 110, 0.1)', border: '1px solid #ff006e' }}>
                  <p className="font-bold" style={{ color: '#ff006e', fontFamily: 'Orbitron' }}>OPERATIONS HALT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-section" className="py-20 grid-background" style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #050818 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-5xl font-black mb-4" style={{ fontFamily: 'Orbitron', color: '#00f0ff', textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
                INITIALIZE REQUEST
              </h3>
              <p className="text-lg" style={{ color: '#00f0ff', opacity: 0.7 }}>CONNECT TO COMPLIANCE SYSTEMS</p>
            </div>

            <div className="cyber-card p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#00f0ff', fontFamily: 'Orbitron', letterSpacing: '1px' }}>COMPANY</label>
                    <Input name="companyName" value={formData.companyName} onChange={handleInputChange} required className="bg-gray-900 border-cyan-500 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#00f0ff', fontFamily: 'Orbitron', letterSpacing: '1px' }}>CONTACT</label>
                    <Input name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required className="bg-gray-900 border-cyan-500 text-white" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#00f0ff', fontFamily: 'Orbitron', letterSpacing: '1px' }}>PHONE</label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} required className="bg-gray-900 border-cyan-500 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#00f0ff', fontFamily: 'Orbitron', letterSpacing: '1px' }}>EMAIL</label>
                    <Input name="email" value={formData.email} onChange={handleInputChange} required className="bg-gray-900 border-cyan-500 text-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#00f0ff', fontFamily: 'Orbitron', letterSpacing: '1px' }}>SERVICE PROTOCOL</label>
                  <Select value={formData.serviceNeeded} onValueChange={handleServiceChange} required>
                    <SelectTrigger className="bg-gray-900 border-cyan-500 text-white">
                      <SelectValue placeholder="Select service..." />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#00f0ff', fontFamily: 'Orbitron', letterSpacing: '1px' }}>USDOT/MC</label>
                  <Input name="usdotMc" value={formData.usdotMc} onChange={handleInputChange} className="bg-gray-900 border-cyan-500 text-white" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#00f0ff', fontFamily: 'Orbitron', letterSpacing: '1px' }}>UPLOAD FILES</label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: '#00f0ff', background: 'rgba(0, 240, 255, 0.05)' }}>
                    <Upload className="h-12 w-12 mx-auto mb-3" style={{ color: '#00f0ff' }} />
                    <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer" style={{ color: '#00f0ff' }}>
                      CLICK TO UPLOAD DOCUMENTS
                    </label>
                    {selectedFile && <p className="mt-3 text-sm" style={{ color: '#00f0ff' }}>FILE: {selectedFile.name}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#00f0ff', fontFamily: 'Orbitron', letterSpacing: '1px' }}>MESSAGE</label>
                  <Textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className="bg-gray-900 border-cyan-500 text-white" />
                </div>

                <button type="submit" disabled={isSubmitting} className="cyber-button w-full" style={{ fontSize: '18px', padding: '16px' }}>
                  {isSubmitting ? 'TRANSMITTING...' : 'SUBMIT REQUEST'}
                </button>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="mb-4" style={{ color: '#00f0ff', fontFamily: 'Orbitron' }}>DIRECT COMMUNICATION CHANNELS</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:+17732347187" className="cyber-button">
                  <Phone className="inline h-5 w-5 mr-2" />
                  773-234-7187
                </a>
                <a href="mailto:globaltransportservicesinc@gmail.com" className="cyber-button">
                  <Mail className="inline h-5 w-5 mr-2" />
                  EMAIL
                </a>
                <a href="https://wa.me/17732347187" className="cyber-button" style={{ background: 'linear-gradient(135deg, #8338ec, #ff006e)' }}>
                  <MessageCircle className="inline h-5 w-5 mr-2" />
                  WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ background: '#050818', borderTop: '2px solid #00f0ff', boxShadow: '0 -10px 30px rgba(0, 240, 255, 0.2)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-10 w-10" style={{ color: '#00f0ff', filter: 'drop-shadow(0 0 10px #00f0ff)' }} />
            <div>
              <h3 className="text-2xl font-bold" style={{ fontFamily: 'Orbitron', color: '#ffffff' }}>GT IRP SERVICE INC</h3>
              <p className="text-xs" style={{ color: '#00f0ff', letterSpacing: '2px' }}>COMPLIANCE SYSTEMS DIVISION</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <span className="state-badge">CALIFORNIA</span>
            <span className="state-badge" style={{ borderColor: '#8338ec', color: '#8338ec' }}>OREGON</span>
          </div>
          <p style={{ color: '#00f0ff', opacity: 0.6 }}>© 2025 GT IRP SERVICE INC - ALL SYSTEMS OPERATIONAL</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
