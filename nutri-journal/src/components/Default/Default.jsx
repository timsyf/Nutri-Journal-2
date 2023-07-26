import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

export default function Default() {

    return (
        <>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><div className='image_1'></div></SwiperSlide>
                <SwiperSlide><div className='image_1'></div></SwiperSlide>
                <SwiperSlide><div className='image_1'></div></SwiperSlide>
                <SwiperSlide><div className='image_1'></div></SwiperSlide>
                <SwiperSlide><div className='image_1'></div></SwiperSlide>
            </Swiper>
        </>
    );
}