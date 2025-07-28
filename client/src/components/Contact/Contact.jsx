import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiMapPin, FiMail, FiPhone, FiGlobe, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import { contactFormFields } from '../../assets/drive-download-20250620T152333Z-1-001/dummydata';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    dish: '',
    query: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `
      Name: ${formData.name}
      Phone: ${formData.phone}
      Email: ${formData.email}
      Address: ${formData.address}
      Dish: ${formData.dish}
      Query: ${formData.query}
    `;

    const encodedMessage = encodeURIComponent(message);
    // WHATSAPP NO.
    const whatsappNumber = '+918617689127'

    // WHATSAPP API
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // console.log('Form submitted:', formData);
    toast.success('OPENING WHATSAPP... ', {
      style: {
        border: '2px solid #f59e0b',
        padding: '16px',
        color: '#fff',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)'
      },
      iconTheme: { primary: '#f59e0b', secondary: '#fff' }
    });

    window.open(whatsappUrl, '_blank')

    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      dish: '',
      query: ''
    });

  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-900 via-amber-500 to-gray-900 animate-gradient-x py-16 md:py-20 px-4 sm:px-6 lg:px-8 font-[Poppins] relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 4000 }} />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-orange-500/20 rounded-full animate-float" />
      <div className="absolute bottom-40 right-20 w-16 h-16 bg-green-500/20 rounded-full animate-float-delayed" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 animate-fade-in-down">
          <span className="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
            Connect With Us
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info Section */}
          <div className="space-y-6">
            {/* Location Card */}
            <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:scale-[1.02] transition duration-300 animate-card-float border border-amber-500 hover:border-amber-400">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-amber-500/30 to-amber-700/30 rounded-xl">
                  <FiMapPin className="text-amber-400 text-2xl" />
                </div>
                <div>
                  <h4 className="text-xl text-amber-100 font-semibold">Our Location</h4>
                  <p className="text-sm text-amber-100/80">Shakarpura, Begusarai, Bihar, India</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:scale-[1.02] transition duration-300 animate-card-float border border-green-500 hover:border-green-400">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-500/30 to-green-700/30 rounded-xl">
                  <FiPhone className="text-green-400 text-2xl" />
                </div>
                <div>
                  <h4 className="text-xl text-amber-100 font-semibold">Contact Number</h4>
                  <div className="flex items-center gap-2">
                    <FiGlobe className="text-green-400 text-base" />
                    <p className="text-sm text-amber-100/80">+91 9304636869</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:scale-[1.02] transition duration-300 animate-card-float border border-blue-500 hover:border-blue-400">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/30 to-blue-700/30 rounded-xl">
                  <FiMail className="text-blue-400 text-2xl" />
                </div>
                <div>
                  <h4 className="text-xl text-blue-100 font-semibold">Email Address</h4>
                  <p className="text-sm text-blue-100/80">premkumar777666@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl animate-slide-in-right border-2 border-amber-500/30 hover:border-amber-500/50 transition duration-300">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-500/30 rounded-full animate-ping-slow" />
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {contactFormFields.map(({ label, name, type, placeholder, pattern, Icon }) => (
                <div key={name}>
                  <label className="block text-amber-100 text-sm font-medium mb-2">{label}</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Icon className="text-amber-500 text-lg animate-pulse" />
                    </div>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      pattern={pattern}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-amber-500/30 text-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-amber-200/50 rounded"
                    />
                  </div>
                </div>
              ))}

              {/* Query Textarea */}
              <div>
                <label className="block text-amber-100 text-sm font-medium mb-2">Your Query</label>
                <div className="relative">
                  <div className="absolute left-3 top-4">
                    <FiMessageSquare className="text-amber-500 text-lg animate-pulse" />
                  </div>
                  <textarea
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    required
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-amber-500/30 text-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-amber-200/50 rounded resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-amber-950 justify-center space-x-2 group"
              >
                <span>Submit Query</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;