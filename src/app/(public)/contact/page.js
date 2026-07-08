"use client";
import React, { useState, useEffect } from 'react';
import { mockDb } from '@/services/mockDb';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [profile, setProfile] = useState(mockDb.getDefaultProfile());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setProfile(mockDb.getProfile());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) tempErrors.message = 'Message content is required.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    mockDb.addMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    });

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-955 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Have a project in mind, want to hire me, or just want to connect? Send a message below.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Info Details Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold">Contact Information</h2>
            
            <div className="space-y-4">
              
              <div className="flex gap-4 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Email</h3>
                  <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-slate-700 dark:text-slate-350 hover:text-purple-500 transition-colors">
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Call / WhatsApp</h3>
                  <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-700 dark:text-slate-350 hover:text-indigo-500 transition-colors">
                    {profile.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Location</h3>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {profile.location}
                  </p>
                </div>
              </div>

            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-550/5 to-indigo-500/5 border border-purple-500/10 space-y-2">
              <h3 className="font-bold text-sm text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <MessageSquare size={16} /> Fast Response
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Messages sent via this contact form go directly to my dashboard inbox. I typically reply within 24 hours.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-6">
              <h2 className="text-xl font-bold">Send a Message</h2>
              
              {submitted && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 animate-slide-up">
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                    <p className="text-xs text-emerald-600/90 dark:text-emerald-400/90 mt-1">
                      Thank you for contacting me. I have received your message and will review it in my dashboard.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-500 dark:text-slate-400">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 text-xs rounded-xl bg-slate-550/5 dark:bg-slate-950 border focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && <p className="text-[10px] text-red-550 dark:text-red-400 font-medium">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 text-xs rounded-xl bg-slate-550/5 dark:bg-slate-950 border focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="e.g. john@example.com"
                    />
                    {errors.email && <p className="text-[10px] text-red-550 dark:text-red-400 font-medium">{errors.email}</p>}
                  </div>

                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold text-slate-500 dark:text-slate-400">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 text-xs rounded-xl bg-slate-550/5 dark:bg-slate-950 border focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                    placeholder="How can I help you?"
                  />
                  {errors.subject && <p className="text-[10px] text-red-550 dark:text-red-400 font-medium">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-500 dark:text-slate-400">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 text-xs rounded-xl bg-slate-550/5 dark:bg-slate-950 border focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 transition-colors resize-none ${
                      errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                    placeholder="Type details of your project, duration, budget, etc."
                  />
                  {errors.message && <p className="text-[10px] text-red-550 dark:text-red-400 font-medium">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-550 hover:to-indigo-550 shadow-md shadow-purple-500/10 cursor-pointer hover:shadow-purple-500/20 active:scale-99 transition-all"
                >
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
