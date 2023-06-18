import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import { getReviews } from "../../utils/api";

const Testimonials = () => {
  const [data, setData] = useState([]);

  const fetchRatings = async () => {
    try {
      const { data } = await getReviews();
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoPlaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data.map((ele) => (
        <div className="testimonial py-4 px-3">
          <p>{ele.reviewText}</p>

          <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
            <div>
              <h5 className="mb-0 mt-3">{ele.user.username}</h5>
              <p>Customer </p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
