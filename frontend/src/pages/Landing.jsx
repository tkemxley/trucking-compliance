import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, CheckCircle, AlertTriangle, FileText, Shield, Clock, TrendingUp, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useToast } from '../hooks/use-toast';
import { mockFAQData, pricingCategories, serviceOptions } from '../mock';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({ ...prev, serviceNeeded: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/compliance-request`, formData);
      const result = response.data;
      
      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        setFormData({
          companyName: '',
          contactPerson: '',
          phone: '',
          email: '',
          usdotMc: '',
          serviceNeeded: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Something went wrong. Please try again.',
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
    <div className="min-h-screen bg-white">
      {/* Solid Header - American Trucking Aesthetic */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white sticky top-0 z-50 shadow-lg border-b-4 border-amber-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Shield className="h-10 w-10 text-amber-400" />
              <div>
                <h1 className="text-2xl font-bold">GT IRP Service Inc</h1>
                <p className="text-xs text-blue-200">California & Oregon Compliance Experts</p>
              </div>
            </div>
            
            {/* Center Info - Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 animate-pulse" />
                <span className="font-semibold text-sm">2025 Enforcement Active</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="px-3 py-1 bg-blue-700 rounded">CARB</span>
                <span className="px-3 py-1 bg-blue-700 rounded">CTC</span>
                <span className="px-3 py-1 bg-green-700 rounded">Oregon</span>
              </div>
            </div>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:+17732347187" className="flex items-center space-x-2 hover:text-amber-400 transition-colors">
                <Phone className="h-5 w-5" />
                <span className="font-bold text-lg">+1 773-234-7187</span>
              </a>
              <div className="flex space-x-2">
                <Button onClick={scrollToContact} className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                  Get Compliance Help
                </Button>
                <a href="tel:+17732347187">
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-bold">
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
          
          {/* Mobile Info */}
          <div className="lg:hidden mt-3 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded text-xs">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-semibold">2025 Enforcement Active</span>
              </div>
              <a href="tel:+17732347187" className="text-sm font-bold">+1 773-234-7187</a>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="px-2 py-1 bg-blue-700 rounded">CARB</span>
              <span className="px-2 py-1 bg-blue-700 rounded">CTC</span>
              <span className="px-2 py-1 bg-green-700 rounded">Oregon</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - American Truck Background */}
      <section 
        className="relative py-24 md:py-32 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 58, 138, 0.75)), url(https://images.pexels.com/photos/27099095/pexels-photo-27099095.jpeg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block bg-red-600 px-6 py-3 rounded-full mb-6 animate-pulse">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-bold text-lg">2025 California & Oregon Enforcement Active</span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Stay Compliant.<br />Avoid Penalties.<br />Keep Rolling.
            </h2>
            
            <p className="text-2xl md:text-3xl mb-8 text-blue-100 font-semibold">
              Expert CARB, Clean Truck Check & Oregon Compliance Services
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button onClick={scrollToContact} size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-xl px-10 py-8 shadow-2xl">
                Get Started Today
              </Button>
              <a href="tel:+17732347187">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-10 py-8 shadow-2xl">
                  <Phone className="mr-3 h-6 w-6" />
                  Call Now: (773) 234-7187
                </Button>
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-blue-900/50 backdrop-blur p-4 rounded-lg border border-blue-500">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="font-bold">Fast Processing</p>
              </div>
              <div className="bg-blue-900/50 backdrop-blur p-4 rounded-lg border border-blue-500">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="font-bold">Expert Support</p>
              </div>
              <div className="bg-blue-900/50 backdrop-blur p-4 rounded-lg border border-blue-500">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="font-bold">Avoid Fines</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - CARB, CTC, Oregon clearly visible */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Complete West Coast Compliance Solutions
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We handle everything for California CARB, Clean Truck Check, and Oregon compliance so you can focus on your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* California CARB */}
            <Card className="border-4 border-blue-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="h-12 w-12" />
                  <span className="bg-white text-blue-800 px-3 py-1 rounded-full text-xs font-bold">CALIFORNIA</span>
                </div>
                <CardTitle className="text-3xl">CARB</CardTitle>
                <CardDescription className="text-blue-100 text-base">Air Resources Board Registration</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Registration & TRUCRS Updates</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Compliance Checks</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Corrective Action Services</span>
                  </li>
                </ul>
                <p className="text-2xl font-bold text-blue-600 mb-3">From $75</p>
                <Button onClick={scrollToContact} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">Learn More</Button>
              </CardContent>
            </Card>

            {/* California CTC */}
            <Card className="border-4 border-blue-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-500 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </span>
              </div>
              <CardHeader className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="h-12 w-12" />
                  <span className="bg-white text-blue-800 px-3 py-1 rounded-full text-xs font-bold">CALIFORNIA</span>
                </div>
                <CardTitle className="text-3xl">Clean Truck Check</CardTitle>
                <CardDescription className="text-blue-100 text-base">Annual Smoke Test Compliance</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Account Setup & VIN Enrollment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Annual Reporting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Fleet Management</span>
                  </li>
                </ul>
                <p className="text-2xl font-bold text-blue-600 mb-3">From $150</p>
                <Button onClick={scrollToContact} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">Get Started</Button>
              </CardContent>
            </Card>

            {/* Oregon */}
            <Card className="border-4 border-green-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="bg-gradient-to-br from-green-700 to-green-900 text-white">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-12 w-12" />
                  <span className="bg-white text-green-800 px-3 py-1 rounded-full text-xs font-bold">OREGON</span>
                </div>
                <CardTitle className="text-3xl">Oregon Services</CardTitle>
                <CardDescription className="text-green-100 text-base">Permits & Mileage Reporting</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Weight-Mile Account Setup</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>20-Min Permit Issuing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Mileage Reporting</span>
                  </li>
                </ul>
                <p className="text-2xl font-bold text-green-700 mb-3">From $85</p>
                <Button onClick={scrollToContact} className="w-full bg-green-700 hover:bg-green-800 text-white font-bold">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* To be continued... */}
    </div>
  );
};

export default Landing;
