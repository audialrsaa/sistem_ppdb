'use client'

import { motion } from 'framer-motion'

export default function Partners() {
  const partners = [
    { id: 1, name: 'Jawa Barat', logo: '/images/collab/gemah.jpg'},
    { id: 2, name: 'Biznet', logo: '/images/collab/biznet.jpg' },
    { id: 3, name: 'SMK BISA', logo: '/images/collab/smkbisa.jpg'},
    { id: 4, name: 'Cisco', logo: '/images/collab/cisco.jpg'},
    { id: 5, name: 'Agate', logo: '/images/collab/agate.jpg'},
    { id: 6, name: 'Mikrotik', logo: '/images/collab/mikro.jpg'},
    { id: 7, name: 'Red Hat', logo: '/images/collab/redhat.jpg'},
    { id: 8, name: 'MD', logo: '/images/collab/md.jpg'},
    { id: 9, name: 'Oracle', logo: '/images/collab/oracle.jpg'},
    { id: 10, name: 'Panasonic', logo: '/images/collab/panasonic.jpg'},
    { id: 11, name: 'Infection', logo: '/images/collab/infection.jpg'},
    { id: 12, name: 'PK', logo: '/images/collab/smkpk.jpg'},
    { id: 13, name: 'Prasimax', logo: '/images/collab/prasimax.jpg'},
    { id: 14, name: 'Toa', logo: '/images/collab/toa.jpg'},
    { id: 15, name: 'IMP', logo: '/images/collab/imp.jpg'},
    { id: 16, name: 'Citra Film', logo: '/images/collab/fs.jpg'},
  ]
  
  const marqueePartners = [...partners, ...partners, ...partners]

  const animationDuration = partners.length * 2.5 

  return (
    <section className="w-full bg-white py-20 relative overflow-hidden"> 
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-3xl font-medium">Kami Bekerja Sama dengan</p>
      </div>

      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={{ x: ["0%", `-${100 / 3}%`] }}
            transition={{
              repeat: Infinity,
              duration: animationDuration,
              ease: 'linear',
            }}
          >
            {marqueePartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex flex-none justify-center items-center w-[33.3333%] md:w-[16.6666%] lg:w-[11.1111%] min-w-[150px] p-4 group"
              >
                <div className="flex items-center justify-center p-2 opacity-50 transition-opacity duration-500 hover:opacity-100 hover:scale-[1.05]">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale group-hover:filter-none transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
