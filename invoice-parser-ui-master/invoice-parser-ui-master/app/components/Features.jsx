'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      title: '🔍 Hybrid Extraction Model',
      description:
        'Combines OCR, Regex, and Gemini LLM for high-accuracy field extraction.',
      image: './images/feature1.gif',
    },
    {
      title: '📄 Multi-format Invoice Support',
      description: 'Supports scanned image invoices in PNG, JPG formats.',
      image: './images/feature2.gif',
    },
    {
      title: '📤 Structured Output',
      description:
        'Exports extracted data in JSON and CSV formats for seamless integration.',
      image: './images/feature3.gif',
    },
    {
      title: '🔁 Smart Field Recognition',
      description:
        'Extracts invoice number, date, vendor details, taxes, totals, and line items automatically.',
      image: './images/feature4.gif',
    },
  ];

  return (
    <section id="features" className="py-24 px-6 md:px-20 bg-black">
      <div className="text-center max-w-5xl mx-auto mb-16">
        <h2 className="text-5xl font-extrabold text-blue-800 mb-4">
          Why <span className="text-blue-700">AI Invoice Parser</span>?
        </h2>
      </div>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{ clickable: true }}
        slideToClickedSlide={true} // 👈 click-to-slide enabled
        autoplay={{
          delay: 1000, // 1 seconds
          disableOnInteraction: false, // keep autoplay after manual swipe
        }}
        modules={[Pagination, Autoplay]} // 👈 include Autoplay
        className="w-full max-w-6xl"
        breakpoints={{
          768: { slidesPerView: 1.6 },
          1024: { slidesPerView: 2.2 },
        }}
      >
        {features.map((feature, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="bg-black rounded-3xl shadow-2xl p-8 h-full flex flex-col justify-between mx-auto max-w-md cursor-pointer"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-64 object-contain mb-6"
              />
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">
                {feature.title}
              </h3>
              <p className="text-lg text-white leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
