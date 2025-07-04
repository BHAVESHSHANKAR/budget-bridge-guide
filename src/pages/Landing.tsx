
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, PieChart, Wallet, TrendingUp, Shield, Smartphone, Clock, Target, Star, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: <Wallet className="h-8 w-8 text-blue-600" />,
      title: "Smart Transaction Tracking",
      description: "Effortlessly add, edit, and categorize your income and expenses with our intuitive interface.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Visual Analytics",
      description: "Understand your spending patterns with beautiful charts and comprehensive monthly overviews.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: <PieChart className="h-8 w-8 text-purple-600" />,
      title: "Category Insights",
      description: "Break down your expenses by categories to identify where your money goes and optimize spending.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "Financial Growth",
      description: "Track your financial progress over time and make data-driven decisions for your future.",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Secure & Private",
      description: "Your financial data is stored locally and never shared with third parties. Complete privacy guaranteed.",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-indigo-600" />,
      title: "Mobile Responsive",
      description: "Access your finances on any device with our fully responsive design and mobile-first approach.",
      gradient: "from-indigo-500 to-indigo-600"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: CheckCircle },
    { number: "4.9/5", label: "User Rating", icon: Star },
    { number: "24/7", label: "Support", icon: Clock }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "This app completely transformed how I manage my finances. The visual insights helped me identify spending patterns I never noticed before.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Freelance Designer",
      content: "The category breakdown feature is incredible. I can now track my business expenses and personal spending separately with ease.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Software Engineer",
      content: "Clean interface, powerful features, and completely private. Everything I wanted in a finance tracker.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Professional Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">FinanceTracker</span>
                <span className="block text-xs text-gray-500 font-medium">Professional Edition</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Reviews</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Pricing</a>
            </div>
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 hover:from-blue-200 hover:to-indigo-200 border-0 px-4 py-2">
              🚀 Trusted by 50,000+ users worldwide
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Master Your
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block mt-2">
                Financial Future
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your financial habits with our professional-grade expense tracker. 
              Get deep insights, visualize spending patterns, and make data-driven decisions 
              that accelerate your path to financial freedom.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                  Start Free Trial
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-10 py-6 text-lg border-2 hover:bg-gray-50 transition-all duration-300">
                Watch Demo
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex justify-center mb-3">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-16 flex items-center px-8">
                <div className="flex space-x-3">
                  <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                  <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                  <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                </div>
              </div>
              <div className="p-8">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop&crop=center"
                  alt="Professional Dashboard Preview"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for Financial Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade features designed to give you complete control over your finances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in bg-gradient-to-br from-white to-gray-50" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-6">
                  <div className={`mb-6 p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl w-fit shadow-lg`}>
                    {React.cloneElement(feature.icon, { className: "h-8 w-8 text-white" })}
                  </div>
                  <CardTitle className="text-2xl text-gray-900 mb-3">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Loved by Professionals Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users say about transforming their financial lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-8">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-5xl font-bold mb-8">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Join thousands of professionals who have taken control of their financial future. 
            Start your journey today with our powerful, privacy-focused platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                Start Free Trial
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="text-sm opacity-75 space-x-8">
            <span>✨ No credit card required</span>
            <span>🔒 100% Private & Secure</span>
            <span>📱 Works on all devices</span>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">FinanceTracker</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional financial management tools for individuals and businesses.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2024 FinanceTracker. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
