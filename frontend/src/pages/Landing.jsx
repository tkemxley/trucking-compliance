import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Shield, CheckCircle, FileCheck, AlertTriangle, Upload, Truck, TrendingUp } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Modern Clean Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="h-10 w-10 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GT IRP Service Inc</h1>
                <p className="text-xs text-gray-600">California & Oregon Compliance</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <span className="state-badge-modern">California</span>
                <span className="state-badge-modern" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }}>Oregon</span>
              </div>
              <a href="tel:+17732347187" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">773-234-7187</span>
              </a>
              <button onClick={scrollToContact} className="modern-button">Get Started</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url(https://images.pexels.com/photos/27099095/pexels-photo-27099095.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Professional Compliance Services</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              California & Oregon<br/>Trucking Compliance
            </h2>
            
            <p className="text-xl mb-10 text-blue-100">
              Expert CARB, Clean Truck Check & Oregon compliance solutions for your fleet
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button onClick={scrollToContact} className="modern-button text-lg px-10 py-4">
                Request Service
              </button>
              <a href="tel:+17732347187">
                <button className="bg-white text-blue-600 hover:bg-gray-50 border-none font-semibold px-10 py-4 rounded-lg transition-all shadow-lg">
                  <Phone className="inline h-5 w-5 mr-2" />
                  Call Now
                </button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <Truck className="h-10 w-10 mx-auto mb-2" />
                <p className="text-sm font-medium">Fast Processing</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <FileCheck className="h-10 w-10 mx-auto mb-2" />
                <p className="text-sm font-medium">Expert Support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <Shield className="h-10 w-10 mx-auto mb-2" />
                <p className="text-sm font-medium">Full Compliance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* California Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">California Services</span>
            <h3 className="section-title mb-4">California Compliance Solutions</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Complete CARB and Clean Truck Check services for California operations</p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* CTC */}
            <div className="clean-card p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileCheck className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">Clean Truck Check</h4>
                  <p className="text-sm text-blue-600 font-medium">CTC Services</p>
                </div>
              </div>
              <div className="space-y-4">
                {pricingData.california_ctc.services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                    <span className="price-modern">${service.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARB */}
            <div className="clean-card p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-7 w-7 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">CARB Registration</h4>
                  <p className="text-sm text-indigo-600 font-medium">Air Resources Board</p>
                </div>
              </div>
              <div className="space-y-4">
                {pricingData.california_carb.services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                    <span className="price-modern" style={{ color: '#4f46e5' }}>${service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bonus Package */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="clean-card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold mb-4">Most Popular</span>
              </div>
              {pricingData.california_bonus.services.map((service) => (
                <div key={service.id} className="text-center">
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h4>
                  <p className="text-lg text-gray-600 mb-4">{service.description}</p>
                  <div className="text-6xl font-black text-blue-600 mb-4">${service.price}</div>
                  <p className="text-xl text-green-600 font-bold mb-6">Save ${service.savings}</p>
                  <button onClick={scrollToContact} className="modern-button text-lg px-12 py-4">
                    Get This Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Oregon Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">Oregon Services</span>
            <h3 className="section-title mb-4">Oregon Compliance Solutions</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Complete permit and mileage reporting services for Oregon operations</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="clean-card p-8">
              <div className="space-y-4">
                {pricingData.oregon.services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all">
                    <div>
                      <p className="text-xl font-bold text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    </div>
                    <span className="price-modern" style={{ color: '#059669' }}>${service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Penalties Warning */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="clean-card p-12 text-center border-2 border-red-200">
              <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-red-600" />
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Non-Compliance Penalties</h3>
              <p className="text-xl text-gray-700 mb-8">
                <strong className="text-red-600">California:</strong> $1,000 - $10,000 per violation | 
                <strong className="text-red-600"> Oregon:</strong> $440 fixed penalty
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <p className="font-bold text-red-600">Registration Hold</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <p className="font-bold text-red-600">Vehicle Impound</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <p className="font-bold text-red-600">Operations Suspended</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="section-title mb-4">Request Service</h3>
              <p className="text-lg text-gray-600">Fill out the form and we'll contact you within 24 hours</p>
            </div>

            <div className="clean-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                    <Input name="companyName" value={formData.companyName} onChange={handleInputChange} required className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person *</label>
                    <Input name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required className="w-full" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <Input name="email" value={formData.email} onChange={handleInputChange} required className="w-full" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Needed *</label>
                  <Select value={formData.serviceNeeded} onValueChange={handleServiceChange} required>
                    <SelectTrigger className="w-full">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">USDOT/MC Number</label>
                  <Input name="usdotMc" value={formData.usdotMc} onChange={handleInputChange} className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Documents</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-gray-50">
                    <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                    <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-blue-600 font-semibold hover:text-blue-700">Click to upload</span>
                      <span className="text-gray-600"> or drag and drop</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX, JPG, PNG</p>
                    {selectedFile && <p className="mt-3 text-sm text-blue-600 font-semibold">Selected: {selectedFile.name}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information</label>
                  <Textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full" />
                </div>

                <button type="submit" disabled={isSubmitting} className="modern-button w-full text-lg py-4">
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4 font-medium">Or contact us directly</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:+17732347187" className="modern-button inline-flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  773-234-7187
                </a>
                <a href="mailto:globaltransportservicesinc@gmail.com" className="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all shadow-md">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Us
                </a>
                <a href="https://wa.me/17732347187" className="modern-button inline-flex items-center justify-center" style={{ background: '#ea580c' }}>
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-10 w-10 text-blue-400" />
            <div>
              <h3 className="text-2xl font-bold">GT IRP Service Inc</h3>
              <p className="text-sm text-gray-400">California & Oregon Compliance Experts</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <span className="state-badge-modern">California</span>
            <span className="state-badge-modern" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }}>Oregon</span>
          </div>
          <p className="text-gray-400">&copy; 2025 GT IRP Service Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
