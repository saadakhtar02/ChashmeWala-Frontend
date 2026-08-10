import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiSend, FiLoader, FiCheckCircle, FiMapPin, FiExternalLink } from 'react-icons/fi';

function Newsletter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('Sending....');

    const data = new FormData(e.target);
    data.append('access_key', '95269dfc-e314-4d85-9801-ab343f28790f');
    data.append('subject', formData.subject || 'New Contact Us Inquiry - CashmeWala');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const responseData = await res.json();
      if (responseData.success) {
        setSubmitted(true);
        setResult('Success!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
          setResult('');
        }, 6000);
      } else {
        setResult(responseData.message || 'Error submitting form');
      }
    } catch (err) {
      setResult('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50/60 dark:bg-gray-950/20 text-gray-900 dark:text-white w-full transition-colors duration-300 font-sans pt-16">
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        <div className="lg:col-span-5 text-left pt-4">
          <span className="font-outfit font-bold text-xs uppercase tracking-[0.25em] text-gold mb-2 block">
            Stay Connected
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gradient-premium tracking-tight mb-4 font-outfit">
            Get In Touch
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-10 max-w-md font-sans">
            Have questions about our premium eyewear, custom prescription lenses. Reach out to our expert optical consultants.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/25 p-0.5 shrink-0 shadow-sm flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gold/15 flex items-center justify-center text-gold">
                  <FiHome className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1 font-outfit">
                  The ChashmeWala
                </h3>
                <p className="text-xs text-muted leading-relaxed font-sans flex flex-col">
                 <span>
                  Haidry Chowk, Main Rd, Near Roy Hospital, Shiv Panchayat Nagar.
                </span>
                <span>
                  Kamptee 441001.
                </span>
                <span>
                  Nagpur, Maharashtra, India.
                </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 w-full lg:-mb-28 relative z-20">
          <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 tracking-wide font-outfit">
              Your Detail
            </h3>

            {submitted ? (
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-600 dark:text-green-400 text-sm font-semibold flex items-center justify-center gap-3">
                <FiCheckCircle className="w-6 h-6 text-green-500" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block font-sans">
                      Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-gold dark:focus:border-gold text-gray-900 dark:text-white placeholder-gray-400 text-sm py-2 px-0 focus:outline-none transition-colors font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block font-sans">
                      Email Address <span className="text-gold">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-gold dark:focus:border-gold text-gray-900 dark:text-white placeholder-gray-400 text-sm py-2 px-0 focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block font-sans">
                      Phone Number <span className="text-gray-400 text-[10px] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-gold dark:focus:border-gold text-gray-900 dark:text-white placeholder-gray-400 text-sm py-2 px-0 focus:outline-none transition-colors font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block font-sans">
                      Subject <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="Message Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-gold dark:focus:border-gold text-gray-900 dark:text-white placeholder-gray-400 text-sm py-2 px-0 focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block font-sans">
                    Comments / Questions <span className="text-gold">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-gold dark:focus:border-gold text-gray-900 dark:text-white placeholder-gray-400 text-sm py-2 px-0 focus:outline-none transition-colors resize-none font-sans"
                  />
                </div>

                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-hover disabled:opacity-60 text-white text-xs font-outfit font-extrabold uppercase tracking-wider shadow-lg shadow-gold/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span>SENDING...</span>
                        <FiLoader className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <span>SUBMIT DETAILS</span>
                    )}
                  </button>
                </div>

                {result && result !== 'Success!' && result !== 'Sending....' && (
                  <p className="text-xs text-red-500 font-medium mt-1 font-sans">{result}</p>
                )}
              </form>
            )}
          </div>
        </div>

      </div>

      <div className="w-full h-[420px] sm:h-[480px] relative bg-gray-200 dark:bg-gray-800 overflow-hidden border-t border-b border-gray-200 dark:border-gray-800 mt-12 lg:mt-0 pt-20 lg:pt-36">
        <iframe
          title="Google Map Location - The Chasmewala"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d967.2423278276567!2d79.1977914597124!3d21.214392256162984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c6025997009d%3A0xa83bdbf7a9a0d549!2sThe%20Chasmewala!5e0!3m2!1sen!2sin!4v1784726312816!5m2!1sen!2sin"
          className="w-full h-full border-0 opacity-95 hover:opacity-100 transition-all duration-500"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>

        <div className="absolute bottom-6 left-6 z-10">
          <a
            href="https://maps.app.goo.gl/GpW9ZduU5CJMg46d9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gold/30 text-xs font-bold text-gray-800 dark:text-white hover:text-gold shadow-xl transition-all hover:scale-105 font-sans"
          >
            <FiMapPin className="w-4 h-4 text-gold" />
            <span>Open in Google Maps</span>
            <FiExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-0 -mb-20 sm:-mb-24 relative z-30">
        <div className="w-full rounded-3xl bg-gradient-to-r from-amber-600 via-gold to-amber-700 p-8 sm:p-12 shadow-2xl shadow-gold/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden text-left">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl text-white">
            <span className="font-outfit font-bold text-xs uppercase tracking-[0.25em] text-white/80 mb-2 block">
              Luxury Eyewear & Optics
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug font-outfit mb-2">
              Keep Updated About Our Eyewear & Specs Collections
            </h2>
            <p className="text-white/90 text-sm leading-relaxed font-sans">
              Explore custom-crafted Italian acetate frames, anti-glare prescription specs, and luxury seasonal drops.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#products"
              className="px-8 py-4 bg-white text-gold hover:bg-gray-50 font-outfit font-bold text-xs uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all inline-block text-center cursor-pointer hover:scale-105"
            >
              Explore Specs Catalog
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Newsletter;
