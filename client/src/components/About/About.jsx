import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaXTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa6';
import { features, stats, teamMembers } from '../../assets/drive-download-20250620T152333Z-1-001/dummydata';

const About = () => {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#3c2a21] to-[#1a120b] overflow-hidden relative text-white">
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light" />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 text-center relative"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 font-serif bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-600"
          >
            Culinary Express
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-amber-100/80 max-w-2xl mx-auto"
          >
            Crafting unforgettable dining experiences delivered to your doorstep.
          </motion.p>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-1 bg-gradient-to-br from-amber-600/30 to-amber-500/30 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500 rounded-3xl" />
                <div className="relative bg-[#3c2a21]/95 backdrop-blur-lg rounded-3xl overflow-hidden border border-amber-600/30 hover:border-amber-500 transition-all duration-300 h-full shadow-md">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={f.img}
                      alt={f.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div className="p-8">
                    <motion.div
                      className="text-amber-500 mb-4 inline-block"
                      whileHover={{ rotate: 15 }}
                    >
                      <Icon className="w-12 h-12 text-amber-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-amber-100">{f.title}</h3>
                    <p className="text-amber-100/80">{f.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-[#1a120b] relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => {
            const Icon = s.icon;
            const isHovered = hoveredStat === i;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                transition={{ delay: i * 0.2 }}
                onHoverStart={() => setHoveredStat(i)}
                onHoverEnd={() => setHoveredStat(null)}
                className="relative group rounded-3xl overflow-hidden border border-amber-500/40 shadow-xl backdrop-blur-xl p-6 bg-[#3c2a21]/80"
              >
                {/* Blurred Glow Background */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-600/20 to-yellow-400/10 blur-2xl opacity-50 group-hover:opacity-80 transition duration-700"
                  animate={{
                    opacity: isHovered ? 0.7 : 0.4,
                    scale: isHovered ? 1.02 : 1,
                  }}
                />

                {/* Icon */}
                <motion.div
                animate={{
                    rotate: isHovered ? 12 : 0,
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-amber-900/30 border border-amber-700/40"
                >
                <Icon className="text-amber-400 w-7 h-7" />
                </motion.div>



                {/* Number */}
                <motion.div
                className="relative z-10 text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500"
                animate={{
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                >
                {s.number}
                </motion.div>


                {/* Label */}
                <motion.div
                  className="relative z-10 text-sm uppercase tracking-widest font-medium text-amber-100/80"
                  animate={{
                    letterSpacing: isHovered ? '0.2em' : '0.1em',
                    textShadow: isHovered ? '0 0 10px rgba(255, 193, 7, 0.5)' : 'none',
                  }}
                >
                  {s.label}
                </motion.div>

                {/* Optional Bottom Glow Ring */}
                <motion.div
                  className="absolute inset-x-4 bottom-0 h-1 rounded-full bg-amber-500/20 blur-xl"
                  animate={{ opacity: isHovered ? 0.5 : 0.2 }}
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Team Section (Optional placeholder) */}
      <section className="py-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif sm:text-5xl md:text-6xl font-bold text-center mb-12 text-amber-100"
          >
            Meet Our <span className="text-amber-500">Culinary Artists</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {teamMembers.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                transition={{ delay: m.delay || i * 0.1 }}
                className="relative group">
                <div className="relative h-62 sm:h-72 md:h-96 overflow-hidden">
                    <motion.img src={m.img} alt={m.name} className='w-full h-full object-cover'
                    initial={{scale: 1}} whileHover={{scale: 1.1 }} transition={{duration: 0.5}} />
                </div>
                <div className='p-8 text-center flex flex-col h-[cal(100%-24rem)]'>
                    <div className='mb-4'>
                        <h3 className='text-3xl font-bold mb-2 text-amber-100'>{m.name}</h3>
                        <p className='text-amber-500 text-lg font-medium font-cursive'>
                            {m.role}
                        </p>
                    </div>
                    <p className='text-amber-100/80 text-lg font-cursive flex-grow'>
                        {m.bio}
                    </p>
                    <motion.div className='flex justify-center gap-4 pt-6' 
                    initial={{scale: 0}}
                    whileInView={{scale: 1}} >
                        {
                            Object.entries(m.social).map(([p, url]) => (
                                <a key={p} href={url} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 transition-colors duration-300 hover:scale-110">
                                {({ twitter: <FaXTwitter className="w-6 h-6"/>, instagram: <FaInstagram className="w-6 h-6" />, facebook: <FaFacebookF className="w-6 h-6" />, linkedin: <FaLinkedinIn className="w-6 h-6" /> })[p]}
                                </a>
                            ))
                        }
                    </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;