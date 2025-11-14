import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, CheckCircle, AlertTriangle, FileText, Shield, Clock, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useToast } from '../hooks/use-toast';
import { mockSubmitComplianceRequest, mockFAQData, mockPricingData } from '../mock';

const Landing = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    usdotMc: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await mockSubmitComplianceRequest(formData);
      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        // Reset form
        setFormData({
          companyName: '',
          contactPerson: '',
          phone: '',
          email: '',
          usdotMc: '',
          message: ''
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">GT IRP Service Inc</h1>
                <p className="text-xs text-gray-600">California Compliance Experts</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="tel:+17732347187" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">+1 773-234-7187</span>
              </a>
              <Button onClick={scrollToContact} className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Compliance Help
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1695222833131-54ee679ae8e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB0cnVja3xlbnwwfHx8fDE3NjMxNDY0NTB8MA&ixlib=rb-4.1.0&q=85"
            alt="Trucking"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <AlertTriangle className="inline h-4 w-4 mr-2" />
              2025 Enforcement is Active
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stay Compliant with California CARB & Clean Truck Check
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Avoid costly penalties and operational restrictions. We handle all your CARB registration and Clean Truck Check compliance so you can focus on running your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToContact} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                Get Started Today
              </Button>
              <a href="tel:+17732347187">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                Fast Processing
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                Expert Support
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                Annual Compliance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is CARB Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                CARB COMPLIANCE
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What is CARB and Why Does it Matter?
              </h3>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                The California Air Resources Board (CARB) is the state agency responsible for regulating air quality and vehicle emissions. All commercial trucks operating in California must register with CARB and comply with strict emission standards.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Mandatory Registration</h4>
                    <p className="text-gray-600">Required for all trucks operating in California, regardless of home state</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Emission Standards</h4>
                    <p className="text-gray-600">Trucks must meet California's strict emission requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Heavy Penalties</h4>
                    <p className="text-gray-600">Non-compliance results in fines up to $10,000 per violation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1543858671-c460805db8f7"
                alt="CARB Compliance"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clean Truck Check Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <img
                src="https://images.unsplash.com/photo-1759671934974-a4928e049dec"
                alt="Clean Truck Check"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                CLEAN TRUCK CHECK
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Clean Truck Check Program Enforcement
              </h3>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Clean Truck Check is California's mandatory annual inspection program for heavy-duty diesel trucks. Starting in 2025, enforcement is ramping up with roadside checks and strict penalties for non-compliance.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Annual Testing Required</h4>
                    <p className="text-gray-600">Smoke opacity testing must be completed and reported annually</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Active Enforcement</h4>
                    <p className="text-gray-600">Roadside inspections and compliance checks are increasing in 2025</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Complete Documentation</h4>
                    <p className="text-gray-600">Proper records and reporting are essential to avoid violations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Penalties Section */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              WARNING
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Penalties for Non-Compliance
            </h3>
            <p className="text-gray-700 text-lg">
              Don't risk your business. Non-compliance can result in severe financial and operational consequences.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-2 border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 p-3 rounded-lg w-fit mb-2">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Heavy Fines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">$1,000 to $10,000 per violation. Multiple violations can add up quickly.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 p-3 rounded-lg w-fit mb-2">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Registration Holds</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your vehicle registration can be suspended, preventing legal operation.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 p-3 rounded-lg w-fit mb-2">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Vehicle Impoundment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Non-compliant vehicles can be impounded during roadside inspections.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How We Help You Stay Compliant
            </h3>
            <p className="text-gray-700 text-lg">
              Our streamlined process makes compliance easy. We handle everything from start to finish.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h4>
              <p className="text-gray-600">Reach out via phone, email, or our contact form</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Provide Info</h4>
              <p className="text-gray-600">Share your USDOT/MC number and vehicle details</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">We Handle It</h4>
              <p className="text-gray-600">We prepare, submit, and track all documentation</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ✓
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Stay Compliant</h4>
              <p className="text-gray-600">Receive approval and ongoing support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transparent Pricing
            </h3>
            <p className="text-gray-700 text-lg">
              No hidden fees. Choose the service package that fits your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mockPricingData.map((plan) => (
              <Card 
                key={plan.id} 
                className={`hover:shadow-xl transition-shadow relative ${
                  plan.popular ? 'border-2 border-blue-600 shadow-lg' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{plan.title}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600">
                    ${plan.price}
                  </div>
                  <CardDescription>per service</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={scrollToContact}
                    className={`w-full mt-6 ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300'
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h3>
              <p className="text-gray-700 text-lg">
                Get answers to common questions about California compliance requirements.
              </p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {mockFAQData.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={`item-${faq.id}`}
                  className="border border-gray-200 rounded-lg px-6 bg-white hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact & Form Section */}
      <section id="contact-section" className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Request Compliance Help
              </h3>
              <p className="text-blue-100 text-lg">
                Fill out the form below or contact us directly. We'll respond within 24 hours.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <a href="tel:+17732347187" className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                        +1 773-234-7187
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a href="mailto:globaltransportservicesinc@gmail.com" className="text-lg font-semibold text-gray-900 hover:text-blue-600 break-all">
                        globaltransportservicesinc@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">WhatsApp</p>
                      <a href="https://wa.me/17732347187" className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                        +1 773-234-7187
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">Business Hours:</strong><br />
                    Monday - Friday: 8:00 AM - 6:00 PM PST<br />
                    Saturday: 9:00 AM - 2:00 PM PST
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <Input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Company Name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                    <Input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                      placeholder="Full Name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="email@example.com"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">USDOT/MC Number</label>
                    <Input
                      type="text"
                      name="usdotMc"
                      value={formData.usdotMc}
                      onChange={handleInputChange}
                      placeholder="USDOT123456 or MC123456"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your compliance needs..."
                      rows={4}
                      className="w-full"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">GT IRP Service Inc</h3>
                  <p className="text-sm text-gray-400">California Compliance Experts</p>
                </div>
              </div>
              <p className="text-gray-400">
                Your trusted partner for CARB and Clean Truck Check compliance. We help trucking companies stay compliant and avoid costly penalties.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">CARB Compliance</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Clean Truck Check</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#contact-section" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+17732347187" className="hover:text-blue-400">+1 773-234-7187</a>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:globaltransportservicesinc@gmail.com" className="hover:text-blue-400">Email Us</a>
                </p>
                <p className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <a href="https://wa.me/17732347187" className="hover:text-blue-400">WhatsApp</a>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 GT IRP Service Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
