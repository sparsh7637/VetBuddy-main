import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Initialize Firebase - replace with your config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function CallToAction() {
  const [formData, setFormData] = useState({
    email: '',
    clinicName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    message: '',
    isError: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ message: '', isError: false });

    try {
      // Add document to Firestore
      await addDoc(collection(db, "leads"), {
        email: formData.email,
        clinicName: formData.clinicName,
        timestamp: new Date()
      });

      // Clear form and show success message
      setFormData({ email: '', clinicName: '' });
      setSubmitStatus({
        message: 'Thank you for your interest! We\'ll be in touch soon.',
        isError: false
      });
    } catch (error) {
      setSubmitStatus({
        message: 'Something went wrong. Please try again.',
        isError: true
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 md:p-12 bg-white/90 backdrop-blur-sm shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl text-gray-600">
                Join the future of veterinary care with VetBuddy
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full p-4 text-lg"
                  required
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleInputChange}
                  placeholder="Clinic name"
                  className="w-full p-4 text-lg"
                  required
                />
              </div>

              {submitStatus.message && (
                <div className={`text-center ${submitStatus.isError ? 'text-red-600' : 'text-green-600'}`}>
                  {submitStatus.message}
                </div>
              )}

              <div>
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg p-6 rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Try VetBuddy Now'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}