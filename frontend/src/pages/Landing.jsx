import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, CheckCircle, AlertTriangle, FileText, Shield, Clock, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useToast } from '../hooks/use-toast';
import { mockFAQData, pricingData, serviceOptions } from '../mock';
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
        toast({
          title: 'Success!',
          description: response.data.message,
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
        setSelectedFile(null);
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
    <div className="min-h-screen bg-gray-50">
      {/* Premium Government Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white sticky top-0 z-50 shadow-md border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Shield className="h-10 w-10 text-slate-400" />
              <div>
                <h1 className="text-2xl font-bold">GT IRP Service Inc</h1>
                <p className="text-xs text-slate-300">Professional Compliance Services</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <span className="ca-badge">California</span>
                <span className="or-badge">Oregon</span>
              </div>
              <a href="tel:+17732347187" className="flex items-center space-x-2 hover:text-slate-300 transition-colors">
                <Phone className="h-5 w-5" />
                <span className="font-bold">+1 773-234-7187</span>
              </a>
              <Button onClick={scrollToContact} className="bg-slate-700 hover:bg-slate-600 text-white font-bold">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              California & Oregon<br/>Trucking Compliance Services
            </h2>
            <p className="text-2xl mb-10 text-slate-300">
              Expert CARB, Clean Truck Check & Oregon Compliance Solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToContact} size="lg" className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-xl px-10 py-7 shadow-sm">
                Request Service
              </Button>
              <a href="tel:+17732347187">
                <Button size="lg" className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xl px-10 py-7 shadow-sm">
                  <Phone className="mr-2 h-6 w-6" />
                  Call: (773) 234-7187
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Need CA & OR Compliance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Why California & Oregon Compliance is Required
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding compliance requirements helps you avoid penalties and keep your business running smoothly
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* California Requirements */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-16 bg-blue-900 rounded"></div>
                  <div>
                    <span className="ca-badge mb-2 inline-block">CALIFORNIA</span>
                    <h4 className="text-3xl font-bold text-gray-900">California Compliance</h4>
                  </div>
                </div>

                <Card className="mb-6 border-l-4 border-blue-900">
                  <CardHeader className="bg-blue-50">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-8 w-8 text-blue-900" />
                      <CardTitle className="text-2xl">CARB Registration</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4 font-semibold">Who needs it:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>All commercial trucks 14,000+ lbs operating in California</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Required regardless of home state</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Mandatory for emission compliance verification</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 font-semibold mb-2">What it includes:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Vehicle identification number (VIN) registration</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Emission standard verification</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span>TRUCRS database enrollment</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Compliance certificate issuance</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-900">
                  <CardHeader className="bg-blue-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-900" />
                      <CardTitle className="text-2xl">Clean Truck Check (CTC)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4 font-semibold">Who needs it:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>All diesel trucks 14,000+ lbs operating in California</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Annual compliance required</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Separate from CARB (both required)</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 font-semibold mb-2">What it includes:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Annual smoke opacity testing</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Test results submission to state</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span>CTC certificate issuance</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Annual renewal tracking</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Oregon Requirements */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-16 bg-green-800 rounded"></div>
                  <div>
                    <span className="or-badge mb-2 inline-block">OREGON</span>
                    <h4 className="text-3xl font-bold text-gray-900">Oregon Compliance</h4>
                  </div>
                </div>

                <Card className="mb-6 border-l-4 border-green-800">
                  <CardHeader className="bg-green-50">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-8 w-8 text-green-800" />
                      <CardTitle className="text-2xl">Oregon Permits</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4 font-semibold">Who needs it:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>All commercial trucks operating through Oregon</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Interstate carriers crossing Oregon</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Required before entering the state</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 font-semibold mb-2">What it includes:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Oregon account setup and activation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Trip permit issuance (issued in 20 minutes)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Single or multiple trip authorization</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Standard weight vehicles (no overweight/oversize)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-800">
                  <CardHeader className="bg-green-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-green-800" />
                      <CardTitle className="text-2xl">Oregon Mileage Reporting</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4 font-semibold">Who needs it:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Carriers with active Oregon accounts</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Required quarterly or monthly</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Weight-mile tax calculation</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 font-semibold mb-2">What it includes:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Mileage tracking and calculations</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Report preparation and filing</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Deadline management</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-800 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Account compliance maintenance</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consequences and Penalties - California */}
      {/* Penalties - California */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="ca-badge mb-4 inline-block">CALIFORNIA PENALTIES</span>
              <h3 className="text-4xl font-black text-gray-900 mb-4">California Non-Compliance Consequences</h3>
              <p className="text-xl text-gray-700">CARB & Clean Truck Check violations carry severe penalties</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-red-600">
                <CardHeader>
                  <AlertTriangle className="h-12 w-12 text-red-600 mb-2" />
                  <CardTitle>Heavy Fines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-600 mb-2">$1,000 - $10,000</p>
                  <p className="text-gray-600">Per vehicle violation for CARB non-compliance</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-red-600">
                <CardHeader>
                  <Shield className="h-12 w-12 text-red-600 mb-2" />
                  <CardTitle>Registration Holds</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">DMV registration suspension preventing legal operation and renewals</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-red-600">
                <CardHeader>
                  <FileText className="h-12 w-12 text-red-600 mb-2" />
                  <CardTitle>Vehicle Impoundment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Roadside citations and vehicle impoundment for non-compliant trucks</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Penalties - Oregon */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="or-badge mb-4 inline-block">OREGON PENALTIES</span>
              <h3 className="text-4xl font-black text-gray-900 mb-4">Oregon Non-Compliance Consequences</h3>
              <p className="text-xl text-gray-700">Operating without proper permits or reports</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-orange-600">
                <CardHeader>
                  <AlertTriangle className="h-12 w-12 text-orange-600 mb-2" />
                  <CardTitle>Fixed Penalty</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-orange-600 mb-2">$440</p>
                  <p className="text-gray-600">Per violation for operating without valid Oregon permit</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-orange-600">
                <CardHeader>
                  <Clock className="h-12 w-12 text-orange-600 mb-2" />
                  <CardTitle>Account Suspension</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Late or missing mileage reports result in account suspension and penalties</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-orange-600">
                <CardHeader>
                  <Shield className="h-12 w-12 text-orange-600 mb-2" />
                  <CardTitle>Roadside Enforcement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Vehicles stopped during inspections, operational delays and citations</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-gray-900 mb-4">Our Services & Pricing</h3>
            <p className="text-xl text-gray-600">Transparent pricing for all compliance needs</p>
          </div>

          {/* California CTC */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-12 bg-blue-900 rounded"></div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900">{pricingData.california_ctc.title}</h4>
                <span className="ca-badge">{pricingData.california_ctc.badge}</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingData.california_ctc.services.map((service) => (
                <Card key={service.id} className="premium-card premium-card-blue bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{service.name}</CardTitle>
                    <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="price-badge mb-4">${service.price}</div>
                    {service.badge && (
                      <span className="inline-block bg-slate-100 text-slate-900 px-3 py-1 rounded text-sm font-semibold">
                        {service.badge}
                      </span>
                    )}
                    <Button onClick={scrollToContact} className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-medium">
                      Select Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* California CARB */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-12 bg-blue-900 rounded"></div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900">{pricingData.california_carb.title}</h4>
                <span className="ca-badge">{pricingData.california_carb.badge}</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingData.california_carb.services.map((service) => (
                <Card key={service.id} className="premium-card premium-card-blue bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{service.name}</CardTitle>
                    <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="price-badge mb-4">${service.price}</div>
                    {service.badge && (
                      <span className="inline-block bg-emerald-100 text-emerald-900 px-3 py-1 rounded text-sm font-semibold">
                        {service.badge}
                      </span>
                    )}
                    <Button onClick={scrollToContact} className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-medium">
                      Select Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bonus Package */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-12 bg-orange-600 rounded"></div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900">{pricingData.california_bonus.title}</h4>
                <span className="ca-badge">{pricingData.california_bonus.badge}</span>
              </div>
            </div>
            <div className="max-w-md mx-auto">
              {pricingData.california_bonus.services.map((service) => (
                <Card key={service.id} className="premium-card bg-white border-2 border-slate-300">
                  <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl">{service.name}</CardTitle>
                      <span className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm">
                        {service.badge}
                      </span>
                    </div>
                    <CardDescription className="text-slate-200 text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-5xl font-black text-slate-900 mb-2">${service.price}</div>
                      <p className="text-emerald-700 font-bold mb-4">You Save: ${service.savings}</p>
                      <Button onClick={scrollToContact} size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-6">
                        Get This Package
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Oregon Services */}
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-12 bg-green-800 rounded"></div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900">{pricingData.oregon.title}</h4>
                <span className="or-badge">{pricingData.oregon.badge}</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingData.oregon.services.map((service) => (
                <Card key={service.id} className="premium-card premium-card-green bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{service.name}</CardTitle>
                    <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="price-badge mb-4" style={{background: '#064e3b'}}>${service.price}</div>
                    {service.badge && (
                      <span className="inline-block bg-emerald-100 text-emerald-900 px-3 py-1 rounded text-sm font-semibold">
                        {service.badge}
                      </span>
                    )}
                    <Button onClick={scrollToContact} className="w-full mt-4 bg-emerald-900 hover:bg-emerald-800 text-white font-medium">
                      Select Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-section" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-black mb-4">Request Compliance Service</h3>
              <p className="text-xl text-slate-300">Fill out the form below and we'll contact you within 24 hours</p>
            </div>

            <Card className="bg-white text-gray-900">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Company Name *</label>
                      <Input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Contact Person *</label>
                      <Input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Service Needed *</label>
                    <Select value={formData.serviceNeeded} onValueChange={handleServiceChange} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select service..." />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">USDOT/MC Number</label>
                    <Input
                      type="text"
                      name="usdotMc"
                      value={formData.usdotMc}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Upload Documents (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-semibold">Click to upload</span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX, JPG, PNG (MAX 10MB)</p>
                      {selectedFile && (
                        <p className="mt-3 text-sm text-green-600 font-semibold">
                          Selected: {selectedFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Additional Information</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 text-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-blue-100 mb-4">Or contact us directly:</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:+17732347187" className="flex items-center justify-center space-x-2 bg-green-700 hover:bg-green-600 px-6 py-3 rounded-lg transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="font-bold">+1 773-234-7187</span>
                </a>
                <a href="mailto:globaltransportservicesinc@gmail.com" className="flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-600 px-6 py-3 rounded-lg transition-colors">
                  <Mail className="h-5 w-5" />
                  <span className="font-bold">Email Us</span>
                </a>
                <a href="https://wa.me/17732347187" className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-bold">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {mockFAQData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="border-2 border-gray-200 rounded-lg px-6 bg-white hover:shadow-lg transition-shadow"
                >
                  <AccordionTrigger className="text-left font-bold text-gray-900 hover:text-blue-700 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="h-10 w-10 text-orange-500" />
              <div>
                <h3 className="text-2xl font-bold">GT IRP Service Inc</h3>
                <p className="text-sm text-gray-400">California & Oregon Compliance Experts</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mb-6">
              <span className="ca-badge">CALIFORNIA</span>
              <span className="or-badge">OREGON</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional compliance services for CARB, Clean Truck Check, and Oregon requirements
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="tel:+17732347187" className="hover:text-orange-400">Phone: +1 773-234-7187</a>
              <a href="mailto:globaltransportservicesinc@gmail.com" className="hover:text-orange-400">Email Us</a>
            </div>
            <p className="text-gray-500 text-sm mt-6">&copy; 2025 GT IRP Service Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
