import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  role: string;
  companyName: string;
  companyWebsite: string;
  companySize: string;
  annualRevenue: string;
  projectBudget: string;
  services: string;
  message: string;
}

interface ContactFormContextType {
  isOpen: boolean;
  formData: ContactFormData;
  touchedFields: {
    name: boolean;
    email: boolean;
    companySize: boolean;
    annualRevenue: boolean;
    projectBudget: boolean;
  };
  emailError: string;
  openForm: () => void;
  closeForm: () => void;
  updateFormData: (field: string, value: string) => void;
  updateTouchedFields: (field: string, value: boolean) => void;
  setEmailError: (error: string) => void;
  clearForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  role: '',
  companyName: '',
  companyWebsite: '',
  companySize: '',
  annualRevenue: '',
  projectBudget: '',
  services: '',
  message: ''
};

const initialTouchedFields = {
  name: false,
  email: false,
  companySize: false,
  annualRevenue: false,
  projectBudget: false
};

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [touchedFields, setTouchedFields] = useState(initialTouchedFields);
  const [emailError, setEmailError] = useState('');

  const openForm = () => setIsOpen(true);
  
  const closeForm = () => setIsOpen(false);
  
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const updateTouchedFields = (field: string, value: boolean) => {
    setTouchedFields(prev => ({ ...prev, [field]: value }));
  };
  
  const clearForm = () => {
    setFormData(initialFormData);
    setTouchedFields(initialTouchedFields);
    setEmailError('');
  };

  const value: ContactFormContextType = {
    isOpen,
    formData,
    touchedFields,
    emailError,
    openForm,
    closeForm,
    updateFormData,
    updateTouchedFields,
    setEmailError,
    clearForm
  };

  return (
    <ContactFormContext.Provider value={value}>
      {children}
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const context = useContext(ContactFormContext);
  if (context === undefined) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
} 