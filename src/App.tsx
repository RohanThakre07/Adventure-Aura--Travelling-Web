import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Menu, 
  Search, 
  Compass, 
  CheckCircle2, 
  Check, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram 
} from 'lucide-react';

// Package types
interface TravelPackage {
  id: string;
  name: string;
  image: string;
  description: string;
  priceString: string;
  priceVal: number; // Base pricing in Rs.
  features: string[];
}

const PACKAGES: TravelPackage[] = [
  {
    id: "manali",
    name: "Manali Package",
    image: "/images/manali.jpeg",
    description: "Kullu, Manali, and Shimla are popular destinations for travelers and newly married couples looking for scenic mountains, calm weather, sightseeing, and affordable tour packages.",
    priceString: "Rs 5,999 - Rs 8,999",
    priceVal: 5999,
    features: ["Sightseeing", "Luxury Stay", "Adventure Sports"]
  },
  {
    id: "goa",
    name: "Goa Package",
    image: "/images/goa.jpeg",
    description: "The most popular beach of Goa, Baga is located close to Calangute beach, around 30 Km North of Panaji. Baga is popular for its nightlife with some very famous clubs such as Brittos, Titos and Mambos. There is also a range of water sports that you can try your hands at.",
    priceString: "Rs 7,999 - Rs 12,999",
    priceVal: 7999,
    features: ["Scuba Diving", "Beach Party", "Heritage Tour"]
  },
  {
    id: "delhi",
    name: "Delhi Package",
    image: "/images/delhi.jpeg",
    description: "Boasting cultural diversity and rich heritage, Delhi is home to several temples, tombs, gardens, forts, museums, markets and more. We take you to some of the best spots in the city. Pick the best packages from here and enjoy the tour of Delhi with guide.",
    priceString: "Rs 2,999 - Rs 8,999",
    priceVal: 2999,
    features: ["Metro Passes", "Local Culinary Taste", "Historic Walks"]
  },
  {
    id: "jaipur",
    name: "Jaipur Package",
    image: "/images/jaipur.jpeg",
    description: "We organise Jaipur & Rajasthan tours that offer incredible attractions like Forts and Palaces, Deserts, Traditional Villages, colorful cattle fairs, sacred places, camel safaris, beautiful lakes, hill stations and the people.",
    priceString: "Rs 11,999 - Rs 15,999",
    priceVal: 11999,
    features: ["Fort Exploration", "Royal Palace Resort", "Cattle Fair Visits"]
  },
  {
    id: "kerala",
    name: "Kerala Package",
    image: "/images/kerala.jpeg",
    description: "A trip to Kerala is always an experience through greenery to the hills and its climate. Browse through our hand-picked Kerala tour packages prepared for you. Our experts are also available to prepare customised tourism packages",
    priceString: "Rs 4,999 - Rs 9,999",
    priceVal: 4999,
    features: ["Houseboat Stay", "Tea Garden Walks", "Ayurvedic Spa"]
  },
  {
    id: "darjeeling",
    name: "Darjeeling Package",
    image: "/images/darjeeling.jpeg",
    description: "A trip to Darjeeling can include a ride on the famous Himalayan Railway, a visit to Tiger Hill, landscaped gardens, hiking, boating, and time around the popular Mall Road.",
    priceString: "Rs 20,000 - Rs 25,000",
    priceVal: 20000,
    features: ["Toy Train Ride", "Tiger Hill Sunrise", "Tea Leaf Plucking"]
  }
];

export default function App() {
  // Navigation & UI States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isHeaderVisible = isScrolled || isHeaderHovered;

  // Booking Modal States
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [travelers, setTravelers] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [needGuide, setNeedGuide] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [descExpanded, setDescExpanded] = useState(false);

  // Contact us states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Scroll and window initialization
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial trigger
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter package based on search
  const filteredPackages = PACKAGES.filter(pkg => 
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Scroll to Element securely
  const scrollToSection = (id: string) => {
    setIsNavbarActive(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Booking costs calculator helper
  const calculateTotalCost = (pkg: TravelPackage) => {
    let base = pkg.priceVal * travelers;
    if (needGuide) {
      base += 1500 * travelers; // Guide cost per traveler
    }
    if (couponApplied) {
      base = base * 0.85; // 15% discount
    }
    return Math.round(base);
  };

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase().trim() === "aura15") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code! Try 'AURA15' to get 15% off.");
    }
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelDate) {
      alert("Please select a convenient travel date.");
      return;
    }
    const ticket = "AA-" + Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(ticket);
    setBookingSuccess(true);
  };

  const submitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert("Please fill in your Name, Email and Message correctly.");
      return;
    }
    setContactSubmitted(true);
    // Reset values
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setContactSubject("");
    setContactMessage("");
  };

  const resetBookingForm = () => {
    setSelectedPackage(null);
    setTravelers(1);
    setTravelDate("");
    setNeedGuide(false);
    setCouponCode("");
    setCouponApplied(false);
    setBookingSuccess(false);
    setTicketNumber("");
    setDescExpanded(false);
  };

  return (
    <>
      {/* INVISIBLE SENSOR DETECTOR FOR HOVERING TO REVEAL HEADER */}
      {!isScrolled && (
        <div 
          onMouseEnter={() => setIsHeaderHovered(true)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '24px',
            zIndex: 9999,
            background: 'transparent',
            pointerEvents: 'auto'
          }}
          id="header-hover-trigger"
        />
      )}

      {/* HEADER SECTION */}
      <motion.header 
        initial={{ y: -120, opacity: 0 }}
        animate={{ 
          y: isHeaderVisible ? 0 : -120,
          opacity: isHeaderVisible ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        className={`header ${isScrolled ? 'active' : ''}`}
        style={{
          pointerEvents: isHeaderVisible ? 'auto' : 'none'
        }}
        id="main-header"
      >
        <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', textDecoration: 'none' }}>
          <div className="logo-box" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.8rem',
            height: '3.8rem',
            border: '0.25rem solid #ffffff',
            borderRadius: '0.4rem',
            backgroundColor: 'transparent',
            userSelect: 'none'
          }}>
            <span style={{
              color: '#ffffff',
              fontSize: '2.4rem',
              fontWeight: 900,
              fontFamily: 'Arial, Helvetica, sans-serif',
              lineHeight: 1,
              display: 'block'
            }}>A</span>
          </div>
          <span className="logo-text" style={{
            color: '#ffffff',
            fontSize: '2.1rem',
            fontWeight: 800,
            textTransform: 'none',
            letterSpacing: '0.12rem',
            fontFamily: 'Arial, Helvetica, sans-serif'
          }}>AdventureAura.com</span>
        </a>
        
        <nav className={`navbar ${isNavbarActive ? 'active' : ''}`} id="app-navbar">
          <div id="nav-close" className="flex items-center justify-center cursor-pointer" onClick={() => setIsNavbarActive(false)}><X style={{ width: '1em', height: '1em' }} /></div>
          <a href="#home" onClick={(e) => { e.preventDefault(); setIsNavbarActive(false); scrollToSection('home'); }}>HOME</a>
          <a href="#category" onClick={(e) => { e.preventDefault(); setIsNavbarActive(false); scrollToSection('category'); }}>ADVENTURES</a>
          <a href="#packages" onClick={(e) => { e.preventDefault(); setIsNavbarActive(false); scrollToSection('packages'); }}>PACKAGES</a>
          <a href="#packages" onClick={(e) => { e.preventDefault(); setIsNavbarActive(false); scrollToSection('packages'); }}>BOOKING</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); setIsNavbarActive(false); scrollToSection('contact'); }}>CONTACT US</a>
        </nav>

        <div className="icons" id="header-icons">
          <div id="menu-btn" className="flex items-center justify-center cursor-pointer" onClick={() => setIsNavbarActive(true)}><Menu style={{ width: '1em', height: '1em' }} /></div> 
          <div id="search-btn" className="flex items-center justify-center cursor-pointer" onClick={() => setIsSearchActive(true)}><Search style={{ width: '1em', height: '1em' }} /></div>
        </div>
      </motion.header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchActive && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="search-form active" 
            style={{ transform: 'none' }}
            id="search-overlay"
          >
            <div id="close-search" className="flex items-center justify-center cursor-pointer" onClick={() => { setIsSearchActive(false); setSearchQuery(""); }}><X style={{ width: '1em', height: '1em' }} /></div>
            <form onSubmit={(e) => { e.preventDefault(); setIsSearchActive(false); scrollToSection('packages'); }} id="pkg-search-form">
              <input 
                type="search" 
                placeholder="Search destination package (e.g. Manali, Goa)..." 
                id="search-box"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <label htmlFor="search-box" className="flex items-center justify-center cursor-pointer text-white hover:text-green-600 transition" style={{ fontSize: '3rem' }} onClick={() => { setIsSearchActive(false); scrollToSection('packages'); }}><Search style={{ width: '1em', height: '1em' }} /></label>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO / HOME SECTION */}
      <section className="home" id="home">
        <div className="wrapper">
          <div className="box">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2
                  }
                }
              }}
              className="content"
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                }}
              >
                never stop
              </motion.span>
              <motion.h3 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } }
                }}
              >
                exploring
              </motion.h3>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                We offer the best deals on premium India tour packages.
              </motion.p>
              <motion.a 
                href="#category" 
                onClick={(e) => { e.preventDefault(); scrollToSection('category'); }} 
                className="btn" 
                id="hero-get-started-btn"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150 } }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                get started
              </motion.a>
            </motion.div>
          </div>  
        </div>
      </section>

      {/* ADVENTURE CATEGORIES SECTION */}
      <section className="category" id="category">
        <motion.h1 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="heading" 
          id="adventure-title"
        >
          Adventure Ideas!
        </motion.h1>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="box-container" 
          id="category-container"
        >
          {[
            { id: 1, img: "/images/bungee.jpeg", alt: "Bungee Jumping", title: "bungee jump", desc: "Bungee jumping is an activity that involves a person jumping from a great height while connected to a large elastic cord." },
            { id: 2, img: "/images/zipline.jpeg", alt: "Zip Lines", title: "zip lines", desc: "A zip-line, zip line, zip-wire, or flying fox is a pulley suspended on a cable, usually made of stainless steel, mounted on a slope." },
            { id: 3, img: "/images/canoeing.jpeg", alt: "Canoeing", title: "Canoeing", desc: "Canoeing is an activity which involves paddling a canoe with a single-bladed paddle." }
          ].map((cat) => (
            <motion.div 
              key={cat.id} 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              className="box" 
              id={`cat-card-${cat.id}`}
            >
              <img src={cat.img} alt={cat.alt} referrerPolicy="no-referrer" />
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
              <a href="#packages" onClick={(e) => { e.preventDefault(); scrollToSection('packages'); }} className="btn" id={`cat-btn-${cat.id}`}>read more</a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="packages" id="packages">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="heading" 
          id="packages-title"
        >
          {searchQuery ? `Search Results for "${searchQuery}"` : "popular packages"}
        </motion.h1>

        {searchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 -mt-4 text-xl" 
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.6rem' }} 
            id="search-feedback"
          >
            Found {filteredPackages.length} packages matching your query.{' '}
            <button className="text-green-600 underline font-semibold ml-2 cursor-pointer" onClick={() => setSearchQuery("")}>Clear Search</button>
          </motion.div>
        )}
        
        <motion.div 
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="box-container" 
          id="packages-container"
        >
          {filteredPackages.map((pkg) => (
            <motion.div 
              layout
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18 } }
              }}
              className="box" 
              key={pkg.id} 
              id={`pkg-card-${pkg.id}`}
            >
              <div className="image">
                <img src={pkg.image} alt={pkg.name} referrerPolicy="no-referrer" />
              </div>
              <div className="content">
                <h3 className="font-semibold text-2xl mb-2">{pkg.name}</h3>
                <p className="text-gray-600 line-clamp-3 hover:line-clamp-none transition-all duration-300 pointer-events-auto cursor-pointer mb-4">
                  {pkg.description}
                </p>
                <div className="price mb-4 font-bold">{pkg.priceString}</div>
                
                {/* Micro-amenities tag overlay for premium visual quality */}
                <div className="flex flex-wrap justify-center gap-2 mb-6" id={`pkg-tags-${pkg.id}`}>
                  {pkg.features.map((feature, idx) => (
                    <span 
                      key={idx} 
                      className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium"
                      style={{ fontSize: '1.1rem', border: '1px solid #d1fae5' }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedPackage(pkg)} 
                  className="btn w-full text-center hover:scale-105 transform transition duration-300"
                  id={`pkg-btn-${pkg.id}`}
                >
                  Book / Explore
                </button>
              </div>
            </motion.div>
          ))}

          {filteredPackages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full text-center p-12 bg-white rounded-xl shadow-md my-6 flex flex-col items-center justify-center" 
              id="no-packages-alert"
            >
              <Search className="text-green-600 w-16 h-16 mb-4" />
              <h4 style={{ fontSize: '2.2rem' }} className="font-bold text-gray-800 mb-2">No matching packages found</h4>
              <p style={{ fontSize: '1.5rem' }} className="text-gray-500 mb-6">We couldn't find any packages for "{searchQuery}". Try searching for something else like "Manali" or "Kerala".</p>
              <button onClick={() => setSearchQuery("")} className="btn" id="reset-search-btn">view all packages</button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* DETAILED TRIP BOOKING CALCULATOR MODAL */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-6 z-[90000] overflow-hidden" 
            id="booking-modal-overlay"
          >
            <motion.div 
              initial={{ scale: 0.93, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full relative overflow-hidden"
              style={{ 
                fontFamily: 'Arial, Helvetica, sans-serif',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
              }}
              id="booking-modal-content"
            >
              {/* Close Button */}
              <button 
                onClick={resetBookingForm} 
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 hover:scale-110 active:scale-95 transition bg-white/95 p-2 rounded-full shadow-md cursor-pointer z-50 flex items-center justify-center"
                style={{ border: 'none', outline: 'none', width: '36px', height: '36px' }}
                id="close-booking-modal"
              >
                <X className="text-2xl" style={{ color: '#4b5563', width: '24px', height: '24px' }} />
              </button>

              <div 
                className="overflow-y-auto" 
                style={{ 
                  padding: window.innerWidth > 640 ? '32px' : '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
              >
                {!bookingSuccess ? (
                  <>
                    <div className="flex gap-4 items-center border-b border-gray-100 pb-4" id="modal-header" style={{ padding: '0px', margin: '0px' }}>
                      <div className="bg-green-50 p-2.5 rounded-2xl flex items-center justify-center" id="modal-icon" style={{ width: '48px', height: '48px' }}>
                        <Compass className="text-green-700 w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-green-700 uppercase font-black block text-[1.1rem] tracking-widest">Customize &amp; Book</span>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-800 leading-tight" id="booking-title" style={{ margin: '0px' }}>{selectedPackage.name}</h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8" id="booking-grid">
                      {/* Left Column (Info / Details / Images) */}
                      <div className="md:col-span-5 space-y-4" id="booking-form-panel" style={{ padding: '0px' }}>
                        <div className="relative">
                          <img 
                            src={selectedPackage.image} 
                            alt={selectedPackage.name} 
                            referrerPolicy="no-referrer"
                            className="rounded-2xl w-full h-32 md:h-40 object-cover shadow-md"
                            id="booking-preview-image"
                          />
                          <div className="absolute top-3 left-3 bg-green-600 text-white px-2.5 py-0.5 rounded-full font-bold text-[1rem] tracking-wider uppercase shadow-sm">
                            Premium Tour
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <p className={`text-gray-600 text-sm leading-relaxed ${descExpanded ? '' : 'line-clamp-3'}`} style={{ fontSize: '1.25rem', textTransform: 'none', margin: '0px' }} id="booking-desc-text">
                            {selectedPackage.description}
                          </p>
                          {selectedPackage.description.length > 120 && (
                            <button 
                              type="button"
                              onClick={() => setDescExpanded(!descExpanded)} 
                              className="text-green-700 hover:text-green-800 font-extrabold cursor-pointer text-left self-start mt-0.5"
                              style={{ fontSize: '1.15rem', background: 'none', border: 'none', padding: '0px' }}
                            >
                              {descExpanded ? 'Read Less ▲' : 'Read More ▼'}
                            </button>
                          )}
                        </div>

                        <div className="space-y-2" id="booking-highlights-card" style={{ padding: '0px' }}>
                          <h4 className="font-extrabold text-gray-700" style={{ fontSize: '1.25rem', margin: '0px' }}>Package Inclusions:</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPackage.features.map((feat, idx) => (
                              <span 
                                key={idx} 
                                className="bg-green-50 text-green-800 border border-green-100/60 px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1 shadow-sm text-[1.1rem]"
                                style={{ textTransform: 'none' }}
                              >
                                <CheckCircle2 className="text-green-600 w-4 h-4" />
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column (Form Panel with Date, Travelers, Custom Guide, Coupon Engine) */}
                      <form onSubmit={submitBooking} className="md:col-span-7 space-y-4 flex flex-col pointer-events-auto" style={{ border: '0px', padding: '0px', margin: '0px' }} id="booking-form">
                        
                        {/* Flex layout grid for inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Date selection */}
                          <div className="flex flex-col gap-1">
                            <label className="block text-gray-700 font-bold" style={{ fontSize: '1.25rem' }}>Travel Date</label>
                            <input 
                              type="date" 
                              required 
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium text-gray-800 focus:ring-2 focus:ring-green-500"
                              style={{ fontSize: '1.25rem', textTransform: 'none' }}
                              value={travelDate}
                              onChange={(e) => setTravelDate(e.target.value)}
                              id="booking-date"
                            />
                          </div>

                          {/* Travelers selector */}
                          <div className="flex flex-col gap-1">
                            <label className="block text-gray-700 font-bold" style={{ fontSize: '1.25rem' }}>Travelers Count</label>
                            <div className="flex items-center gap-3 h-[38px]">
                              <button 
                                type="button" 
                                className="w-9 h-9 rounded-xl border border-gray-300 bg-gray-100 flex items-center justify-center font-bold text-gray-800 text-xl hover:bg-gray-200 transition cursor-pointer"
                                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                                id="decrease-travelers"
                                style={{ border: '1px solid #d1d5db' }}
                              >
                                -
                              </button>
                              <span style={{ fontSize: '1.8rem' }} className="font-extrabold text-gray-800 w-8 text-center" id="travelers-count">{travelers}</span>
                              <button 
                                type="button" 
                                className="w-9 h-9 rounded-xl border border-gray-300 bg-gray-100 flex items-center justify-center font-bold text-gray-800 text-xl hover:bg-gray-200 transition cursor-pointer"
                                onClick={() => setTravelers(travelers + 1)}
                                id="increase-travelers"
                                style={{ border: '1px solid #d1d5db' }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Dedicated Guide Option */}
                        <div className="bg-gray-50 hover:bg-green-50/20 p-2.5 rounded-xl border border-gray-100 transition-all duration-300">
                          <label className="flex items-center gap-3 cursor-pointer" style={{ textTransform: 'none', margin: '0px' }}>
                            <input 
                              type="checkbox" 
                              className="w-5 h-5 rounded accent-green-600 cursor-pointer" 
                              checked={needGuide}
                              onChange={(e) => setNeedGuide(e.target.checked)}
                              id="guide-checkbox"
                            />
                            <span className="text-gray-700 font-semibold" style={{ fontSize: '1.25rem' }}>
                              Add Local Guide <strong className="text-green-600 block sm:inline-block sm:ml-1 font-bold">(+Rs 1,500 / traveler)</strong>
                            </span>
                          </label>
                        </div>

                        {/* Coupon implementation */}
                        <div className="flex flex-col gap-1">
                          <label className="block text-gray-700 font-bold" style={{ fontSize: '1.25rem' }}>Promo Code</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="Try AURA15 for 15% off..." 
                              className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-gray-800 w-full focus:ring-2 focus:ring-green-500"
                              style={{ fontSize: '1.25rem', textTransform: 'uppercase' }}
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              id="coupon-input"
                            />
                            <button 
                              type="button" 
                              onClick={handleApplyCoupon} 
                              style={{ margin: 0, padding: '0 16px', fontSize: '1.25rem', background: 'none' }} 
                              className="border-green-600 border rounded-xl text-green-700 font-bold hover:bg-green-50 transition cursor-pointer"
                              id="apply-coupon-btn"
                            >
                              Apply
                            </button>
                          </div>
                          {couponApplied && (
                            <span className="text-green-600 font-bold block mt-1 text-xs" style={{ fontSize: '1.15rem' }} id="coupon-success-tag">
                              🎉 15% coupon applied successfully!
                            </span>
                          )}
                        </div>

                        {/* Dynamic Cost Display */}
                        <div className="bg-green-50 border border-green-100 px-4 py-2.5 rounded-2xl flex justify-between items-center" id="price-card">
                          <div>
                            <span className="text-gray-500 text-[1.10rem] block uppercase tracking-wider font-extrabold">Estimated Total</span>
                            <span className="text-gray-400 font-medium text-xs">({travelers} traveler{travelers > 1 ? 's' : ''}{needGuide ? ' + professional guide' : ''})</span>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl md:text-3xl font-black text-green-700">Rs {calculateTotalCost(selectedPackage).toLocaleString()}</span>
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          style={{ background: 'green', color: 'white', borderColor: 'green', margin: '8px 0 0 0', border: 'none' }} 
                          className="w-full text-center py-3 rounded-xl font-bold text-white hover:brightness-110 active:scale-95 transition-all duration-150 cursor-pointer shadow-md text-[1.4rem]"
                          id="submit-booking-btn"
                        >
                          Confirm Booking Receipt
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center py-6 flex flex-col items-center justify-center" 
                    id="booking-success-view"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.25, 1] }}
                      transition={{ delay: 0.15, duration: 0.45 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm" 
                      id="booking-success-icon-circle"
                    >
                      <Check className="text-green-600 w-9 h-9" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-gray-800 mb-1" id="booking-success-headline">Booking Confirmed!</h3>
                    <p className="text-gray-500 mb-4 max-w-md text-center" style={{ fontSize: '1.3rem' }}>
                      Congratulations! Your reservation for the <strong>{selectedPackage.name}</strong> was issued successfully.
                    </p>

                    <div className="bg-gray-50 border border-dashed border-gray-300 p-5 rounded-2xl w-full max-w-sm mb-6 text-left space-y-2" id="booking-ticket">
                      <div className="flex justify-between" style={{ fontSize: '1.25rem' }}>
                        <span className="text-gray-500">Ticket Serial:</span>
                        <strong className="text-gray-800 font-mono text-base">{ticketNumber}</strong>
                      </div>
                      <div className="flex justify-between" style={{ fontSize: '1.25rem' }}>
                        <span className="text-gray-500">Scheduled Date:</span>
                        <strong className="text-gray-800">{travelDate}</strong>
                      </div>
                      <div className="flex justify-between" style={{ fontSize: '1.25rem' }}>
                        <span className="text-gray-500">Total Travelers:</span>
                        <strong className="text-gray-800">{travelers} Person{travelers > 1 ? 's' : ''}</strong>
                      </div>
                      <div className="flex justify-between" style={{ fontSize: '1.25rem' }}>
                        <span className="text-gray-500">Dedicated Guide:</span>
                        <strong className={needGuide ? 'text-green-600' : 'text-gray-800'}>{needGuide ? 'Yes, Included' : 'None'}</strong>
                      </div>
                      <div className="h-[1px] bg-gray-200 my-1.5"></div>
                      <div className="flex justify-between items-center" style={{ fontSize: '1.25rem' }}>
                        <span className="font-extrabold text-gray-700">Total Charged:</span>
                        <strong className="text-2xl font-black text-green-700">Rs {calculateTotalCost(selectedPackage).toLocaleString()}</strong>
                      </div>
                    </div>

                    <p className="text-gray-400 text-[1rem] text-center mb-6" style={{ textTransform: 'none' }}>
                      *This is a frontend demo receipt. No payment or email is sent from this project.
                    </p>

                    <button 
                      onClick={resetBookingForm} 
                      className="btn"
                      style={{ background: 'black', color: 'white', borderColor: 'black', padding: '10px 24px', fontSize: '1.3rem' }}
                      id="booking-success-close"
                    >
                      Close &amp; Keep Exploring
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT SECTION */}
      <section className="contact" id="contact">
        <div className="wrapper1">
          <div className="title1">
            <h1 id="contact-heading">Contact us</h1>
          </div>
          
          {contactSubmitted && (
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-green-50 border border-green-200 p-6 rounded-2xl mb-6 text-center max-w-md mx-auto"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
              id="contact-success-panel"
            >
              <Send className="text-green-600 w-12 h-12 mb-3 mx-auto" />
              <h4 style={{ fontSize: '1.8rem' }} className="font-bold text-gray-800 mb-1">Message Sent!</h4>
              <p style={{ fontSize: '1.3rem' }} className="text-gray-600 mb-4">
                Thank you for contacting us. This frontend demo has captured the message state locally.
              </p>
              <button 
                onClick={() => setContactSubmitted(false)}
                className="bg-transparent text-green-700 border border-green-600 rounded-full px-4 py-1 hover:bg-green-600 hover:text-white transition cursor-pointer text-xs font-semibold"
                id="reset-contact-btn"
              >
                Send another message
              </button>
            </motion.div>
          )}

          <div className="contact-form" id="contact-fields-container">
            <form onSubmit={submitContactForm} id="original-contact-form" style={{ border: '0px', width: '100%', margin: '0px' }}>
              <div className="input-fields" style={{ width: '100%', marginRight: '0px' }}>
                <input 
                  type="text" 
                  className="input"  
                  placeholder="Name" 
                  name="name" 
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  id="contact-name"
                />
                <input 
                  type="email" 
                  className="input"  
                  placeholder="Email Address" 
                  name="email" 
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  id="contact-email"
                />
                <input 
                  type="tel" 
                  className="input"  
                  placeholder="Phone" 
                  name="phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  id="contact-phone"
                />
                <input 
                  type="text" 
                  className="input"  
                  placeholder="Subject" 
                  name="subject"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  id="contact-subject"
                />
              </div>
              <div className="msg" style={{ width: '100%' }}>
                <textarea 
                  placeholder="Message" 
                  name="message" 
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  id="contact-msg-box"
                ></textarea> 
                <br />
                <div className="btn1" id="contact-submit-btn-wrapper">
                  <button type="submit" className="inline-flex items-center gap-1.5">
                    send <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div> 
      </section>

      {/* FOOTER SECTION */}
      <section className="footer">
        <div className="box-container" id="footer-container">
          <div className="box" id="footer-quick-links">
            <h3>Quick links</h3>
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>home</a>    
            <a href="#packages" onClick={(e) => { e.preventDefault(); scrollToSection('packages'); }}>packages</a>
            <a href="#category" onClick={(e) => { e.preventDefault(); scrollToSection('category'); }}>Adventures</a>
          </div>

          <div className="box" id="footer-extra-links">
            <h3>extra links</h3>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>ask questions</a>
            <a href="#" onClick={(e) => e.preventDefault()}>terms of use</a>
            <a href="#" onClick={(e) => e.preventDefault()}>privacy policy</a>
          </div>

          <div className="box" id="footer-contacts">
            <h3>contact info</h3>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}> <Phone className="inline-block w-4 h-4 mr-2 align-middle text-green-700" /> Travel inquiry form </a>
            <a href="mailto:rohanthakre1342003@gmail.com"> <Mail className="inline-block w-4 h-4 mr-2 align-middle text-green-700" /> rohanthakre1342003@gmail.com </a>
            <a href="#" onClick={(e) => e.preventDefault()}> <MapPin className="inline-block w-4 h-4 mr-2 align-middle text-green-700" /> Pune, India - 411028 </a>
          </div>

          <div className="box" id="footer-social">
            <h3>follow us</h3>
            <a href="#" onClick={(e) => e.preventDefault()}> <Facebook className="inline-block w-4 h-4 mr-2 align-middle text-green-700" /> facebook </a>
            <a href="#" onClick={(e) => e.preventDefault()}> <Instagram className="inline-block w-4 h-4 mr-2 align-middle text-green-700" /> instagram </a>
          </div>
        </div>
        <div className="credit" id="footer-credit">
          created by <span className="font-extrabold text-green-700" style={{ textTransform: 'none' }}>Rohan Thakre</span> | <a href="mailto:rohanthakre1342003@gmail.com" className="hover:underline hover:text-green-600 text-green-700" style={{ textTransform: 'none' }}>rohanthakre1342003@gmail.com</a> | all rights reserved!
        </div>
      </section>
    </>
  );
}
