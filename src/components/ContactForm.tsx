import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Minimize2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from "@/contexts/ContactFormContext";

export function ContactForm() {
  const { toast } = useToast();
  const {
    isOpen,
    formData,
    touchedFields,
    emailError,
    closeForm,
    updateFormData,
    updateTouchedFields,
    setEmailError,
    clearForm
  } = useContactForm();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let scrollContainer: HTMLElement | null = null;
    let timeoutId: NodeJS.Timeout;
  
    if (isOpen) {
      setIsMounted(true);
      // Reduced delay for faster animation start
      timeoutId = setTimeout(() => setIsVisible(true), 10);
      scrollContainer = document.querySelector('.snap-container') as HTMLElement;
      if (scrollContainer) {
        scrollContainer.style.overflowY = 'hidden';
      }
    } else {
      setIsVisible(false);
      // Reduced delay for faster unmounting
      timeoutId = setTimeout(() => setIsMounted(false), 200);
      scrollContainer = document.querySelector('.snap-container') as HTMLElement;
      if (scrollContainer) {
        scrollContainer.style.overflowY = 'scroll';
      }
    }
  
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      scrollContainer = document.querySelector('.snap-container') as HTMLElement;
      if (scrollContainer) {
        scrollContainer.style.overflowY = 'scroll';
      }
    };
  }, [isOpen]);

  const handleInputChange = useCallback((field: string, value: string) => {
    updateFormData(field, value);
  }, [updateFormData]);

  const handleFieldBlur = useCallback((field: string) => {
    updateTouchedFields(field, true);
    
    // Validate email when it loses focus
    if (field === 'email' && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
  }, [formData.email, updateTouchedFields, setEmailError]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      updateTouchedFields('email', true);
      return;
    }
    
    // Check if all required fields are filled
    const requiredFields = ['name', 'email', 'companySize', 'annualRevenue', 'projectBudget'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      // Mark missing fields as touched to show validation messages
      missingFields.forEach(field => {
        updateTouchedFields(field as keyof typeof touchedFields, true);
      });
      return; // Don't submit the form
    }
    
    console.log('Form submitted:', formData);
    
    // Show success notification
    toast({
      title: "Enquiry Sent Successfully!",
      description: "Thank you for your enquiry. We'll get back to you soon.",
      duration: 4000,
    });
    
    closeForm();
  }, [formData, setEmailError, updateTouchedFields, touchedFields, toast, closeForm]);

  const handleMinimize = useCallback(() => {
    console.log('Form minimized with data:', formData);
    closeForm();
  }, [formData, closeForm]);

  const handleClose = useCallback(() => {
    // Clear all form data
    clearForm();
    closeForm();
  }, [clearForm, closeForm]);

  if (!isMounted) return null;

  return (
    <>
      {/* Simplified overlay without backdrop blur */}
      <div 
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeForm}
      />

      {/* Optimized slide-in dialog */}
      <div className={`fixed top-8 right-8 bottom-8 w-full max-w-2xl bg-white z-50 shadow-xl flex flex-col transform transition-all duration-200 ease-out rounded-2xl ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-6">
          <h2 className="text-3xl font-normal text-gray-900">
            Tell us where you're at
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleMinimize}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-150 focus:outline-none"
              title="Minimize (save data)"
            >
              <Minimize2 className="h-5 w-5" />
              <span className="sr-only">Minimize</span>
            </button>
          <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-150 focus:outline-none"
              title="Close (clear all data)"
          >
              <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name and Email Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3" data-field="name">
                <div className="flex items-center gap-2">
                <Label htmlFor="name" className="text-base font-normal text-gray-900">
                  What is your name?
                </Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => handleFieldBlur('name')}
                  className="border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 py-3 text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none transition-colors duration-150 ease-out"
                />
                {touchedFields.name && !formData.name && (
                  <p className="text-sm text-red-500">Required</p>
                )}
              </div>

              <div className="space-y-3" data-field="email">
                <div className="flex items-center gap-2">
                <Label htmlFor="email" className="text-base font-normal text-gray-900">
                  What is your email?
                </Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                  className="border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 py-3 text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none transition-colors duration-150 ease-out"
                />
                {touchedFields.email && !formData.email && (
                  <p className="text-sm text-red-500">Required</p>
                )}
                {touchedFields.email && formData.email && emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>
            </div>

            {/* Role */}
            <div className="space-y-3">
              <Label htmlFor="role" className="text-base font-normal text-gray-900">
                What is your role in the company?
              </Label>
              <Input
                id="role"
                placeholder="Enter role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 py-3 text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none transition-colors duration-150 ease-out"
              />
            </div>

            {/* Company Name and Website Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="companyName" className="text-base font-normal text-gray-900">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 py-3 text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none transition-colors duration-150 ease-out"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="companyWebsite" className="text-base font-normal text-gray-900">
                  Company Website
                </Label>
                <Input
                  id="companyWebsite"
                  placeholder="Enter company website"
                  value={formData.companyWebsite}
                  onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                  className="border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 py-3 text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none transition-colors duration-150 ease-out"
                />
              </div>
            </div>

            {/* Company Size and Revenue Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3" data-field="companySize">
                <div className="flex items-center gap-2">
                  <Label htmlFor="companySize" className="text-base font-normal text-gray-900">
                    Company Size
                  </Label>
                  <span className="text-red-500">*</span>
                </div>
                <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)} onOpenChange={(open) => !open && handleFieldBlur('companySize')}>
                  <SelectTrigger className="border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 py-3 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-auto transition-colors duration-150 ease-out [&>span]:text-gray-400 [&>span:not([data-placeholder])]:text-gray-900">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-0 shadow-lg rounded-lg text-gray-900">
                    <SelectItem value="1-10" className="text-gray-900 hover:bg-gray-100">1-10 employees</SelectItem>
                    <SelectItem value="11-50" className="text-gray-900 hover:bg-gray-100">11-50 employees</SelectItem>
                    <SelectItem value="51-200" className="text-gray-900 hover:bg-gray-100">51-200 employees</SelectItem>
                    <SelectItem value="201-500" className="text-gray-900 hover:bg-gray-100">201-500 employees</SelectItem>
                    <SelectItem value="501-1000" className="text-gray-900 hover:bg-gray-100">501-1000 employees</SelectItem>
                    <SelectItem value="1000+" className="text-gray-900 hover:bg-gray-100">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
                {touchedFields.companySize && !formData.companySize && (
                <p className="text-sm text-red-500">Required</p>
                )}
              </div>

              <div className="space-y-3" data-field="annualRevenue">
                <div className="flex items-center gap-2">
                  <Label htmlFor="annualRevenue" className="text-base font-normal text-gray-900">
                    Company's Annual Revenue
                  </Label>
                  <span className="text-red-500">*</span>
                </div>
                <Select value={formData.annualRevenue} onValueChange={(value) => handleInputChange('annualRevenue', value)} onOpenChange={(open) => !open && handleFieldBlur('annualRevenue')}>
                  <SelectTrigger className="border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 py-3 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-auto transition-colors duration-150 ease-out [&>span]:text-gray-400 [&>span:not([data-placeholder])]:text-gray-900">
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-0 shadow-lg rounded-lg text-gray-900">
                    <SelectItem value="under-1m" className="text-gray-900 hover:bg-gray-100">Under $1M</SelectItem>
                    <SelectItem value="1m-5m" className="text-gray-900 hover:bg-gray-100">$1M - $5M</SelectItem>
                    <SelectItem value="5m-10m" className="text-gray-900 hover:bg-gray-100">$5M - $10M</SelectItem>
                    <SelectItem value="10m-50m" className="text-gray-900 hover:bg-gray-100">$10M - $50M</SelectItem>
                    <SelectItem value="50m-100m" className="text-gray-900 hover:bg-gray-100">$50M - $100M</SelectItem>
                    <SelectItem value="100m+" className="text-gray-900 hover:bg-gray-100">$100M+</SelectItem>
                  </SelectContent>
                </Select>
                {touchedFields.annualRevenue && !formData.annualRevenue && (
                <p className="text-sm text-red-500">Required</p>
                )}
              </div>
            </div>

            {/* Project Budget */}
            <div className="space-y-3" data-field="projectBudget">
              <div className="flex items-center gap-2">
                <Label htmlFor="projectBudget" className="text-base font-normal text-gray-900">
                  Project budget
                </Label>
                <span className="text-red-500">*</span>
              </div>
                                            <Select value={formData.projectBudget} onValueChange={(value) => handleInputChange('projectBudget', value)} onOpenChange={(open) => !open && handleFieldBlur('projectBudget')}>
                <SelectTrigger className="border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 py-3 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-auto transition-colors duration-150 ease-out [&>span]:text-gray-400 [&>span:not([data-placeholder])]:text-gray-900">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className="bg-white border-0 shadow-lg rounded-lg text-gray-900">
                  <SelectItem value="under-10k" className="text-gray-900 hover:bg-gray-100">Under $10K</SelectItem>
                  <SelectItem value="10k-25k" className="text-gray-900 hover:bg-gray-100">$10K - $25K</SelectItem>
                  <SelectItem value="25k-50k" className="text-gray-900 hover:bg-gray-100">$25K - $50K</SelectItem>
                  <SelectItem value="50k-100k" className="text-gray-900 hover:bg-gray-100">$50K - $100K</SelectItem>
                  <SelectItem value="100k-250k" className="text-gray-900 hover:bg-gray-100">$100K - $250K</SelectItem>
                  <SelectItem value="250k+" className="text-gray-900 hover:bg-gray-100">$250K+</SelectItem>
                </SelectContent>
              </Select>
              {touchedFields.projectBudget && !formData.projectBudget && (
                <p className="text-sm text-red-500">Required</p>
              )}
            </div>

            {/* Services */}
            <div className="space-y-3">
              <Label htmlFor="services" className="text-base font-normal text-gray-900">
                What services are you interested in?
              </Label>
              <Select value={formData.services} onValueChange={(value) => handleInputChange('services', value)}>
                <SelectTrigger className="border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 py-3 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-auto transition-colors duration-150 ease-out [&>span]:text-gray-400 [&>span:not([data-placeholder])]:text-gray-900">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent className="bg-white border-0 shadow-lg rounded-lg text-gray-900">
                  <SelectItem value="identifying-ai-opportunities" className="text-gray-900 hover:bg-gray-100">Identifying AI opportunities</SelectItem>
                  <SelectItem value="educating-team-ai" className="text-gray-900 hover:bg-gray-100">Educating your team on AI</SelectItem>
                  <SelectItem value="custom-ai-solutions" className="text-gray-900 hover:bg-gray-100">Developing custom AI solutions</SelectItem>
                  <SelectItem value="not-selecting" className="text-gray-900 hover:bg-gray-100">Not Sure Yet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-3">
              <Label htmlFor="message" className="text-base font-normal text-gray-900">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Enter a message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0 py-3 text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none transition-colors duration-150 ease-out resize-y min-h-[100px]"
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Send Enquiry Button */}
            <div className="pt-6">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-150 ease-out hover:scale-[1.01] hover:shadow-lg transform"
              >
                Send Enquiry
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
