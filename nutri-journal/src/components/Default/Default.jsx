import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

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
        <SwiperSlide>
          <div className="banner_1"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner_2"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner_3"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner_4"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner_5"></div>
        </SwiperSlide>
      </Swiper>

      <div class="test container mt-5">
<div class="row mb-5 d-flex align-items-center justify-content-center">
    <div class="col-lg-12 text-center">
            <h1>
              Introducing Nutri Journal: Your Ultimate Nutritional Companion
            </h1>
            <p>
              In the fast-paced world we live in, maintaining a healthy
              lifestyle can often be challenging, but not anymore! Meet Nutri
              Journal, the innovative and user-friendly app designed to
              transform the way you approach your health and nutrition. Nutri
              Journal is not just an ordinary app; it's your virtual partner in
              achieving your wellness goals, providing seamless weight tracking,
              calorie monitoring, and an extensive database of nutritional
              information, all accessible on a responsive website.
            </p>
          </div>
        </div>

        <div class="row mb-5 d-flex align-items-center justify-content-center">
    <div class="col-lg-12 text-center">
            <h1>Effortless Weight Tracking: Empowering Your Fitness Journey</h1>
            <p>
              Understanding the number of calories you consume is crucial when
              striving for a balanced diet. Nutri Journal takes the guesswork
              out of calorie tracking, making it an effortless process. Simply
              input your meals, snacks, and beverages into the app, and it will
              calculate your daily calorie intake.
            </p>
          </div>
        </div>

        <div class="row mb-5 d-flex align-items-center justify-content-center">
    <div class="col-lg-12 text-center">
            <h1>
              Comprehensive Nutritional Value: Enlightening Your Food Choices
            </h1>
            <p>
              Have you ever wondered about the nutritional content of the food
              you eat? With Nutri Journal's vast database, you can now access
              detailed nutritional information for thousands of food items. From
              fruits and vegetables to packaged goods and restaurant dishes, the
              app covers it all. Uncover essential details like macronutrient
              breakdowns (carbohydrates, proteins, and fats), vitamins,
              minerals, and more, helping you make informed decisions about your
              meals.
            </p>
          </div>
        </div>

        <div class="row mb-5 d-flex align-items-center justify-content-center">
    <div class="col-lg-12 text-center">
            <h1>Responsive Website: Seamlessly Accessible Anywhere, Anytime</h1>
            <p>
              Nutri Journal goes beyond being just another app by providing a
              responsive website interface. Access your account, track your
              weight, log your meals, and find nutritional values on any device
              with internet access, including your smartphone, tablet, laptop,
              or desktop. Whether you're at home, at the office, or on the go,
              Nutri Journal is right at your fingertips, ensuring that you stay
              connected to your health and wellness goals. In conclusion, Nutri
              Journal is more than just a weight-tracking and calorie-monitoring
              app; it's a comprehensive, user-friendly, and responsive website
              that revolutionizes the way you approach nutrition. With its vast
              food database, and effortless weight-tracking capabilities. Nutri
              Journal becomes your ultimate nutritional companion on your
              journey to a healthier and happier life. Embrace the power of
              Nutri Journal today and take the first step towards a better you!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
