/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import tourdata from "../assets/data/tours";
import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import { getPackageDetails } from "../utils/api";

const TourDetails = () => {
  const [tourRating, setTourRating] = useState(null);
  const [reviewText, setReviewText] = useState(null);
  const [tourData, setTourData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log({ id });
    fetchPackageDetails(id);
  }, [id]);

  const fetchPackageDetails = async (id) => {
    try {
      const { data } = await getPackageDetails(id);

      setTourData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!id) return <></>;

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const { images, title, itenary, price, reviews, country, maxGroupSize } =
    tourData;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img src={images && images[0]} alt="" />
              <div className="tour__info">
                <h2>{title}</h2>

                <div className="d-flex align-items-center gap-5">
                  <span className="tour__rating d-flex align-items-center gap-1">
                    <i
                      class="ri-star-fill"
                      style={{ color: "var(--secondary-color)" }}
                    ></i>
                    {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                      "Not rated"
                    ) : (
                      <span>({reviews?.length})</span>
                    )}
                  </span>
                </div>

                <div className="tour__extra-details">
                  <span>
                    <i class="ri-map-pin-2-fill"></i>
                    {country}
                  </span>

                  <span>
                    <i class="ri-money-dollar-circle-fill"></i>${price} /per
                    person
                  </span>

                  <span>
                    <i class="ri-group-fill"></i>
                    {maxGroupSize} People
                  </span>
                </div>

                <h5>Description</h5>
                <p>{itenary}</p>
              </div>
              <div className="tour__reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>
                <Form onSubmit={submitHandler}>
                  <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    <span onClick={() => setTourRating(1)}>
                      1<i class="ri-star-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(2)}>
                      2<i class="ri-star-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(3)}>
                      3<i class="ri-star-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(4)}>
                      4<i class="ri-star-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(5)}>
                      5<i class="ri-star-fill"></i>
                    </span>
                  </div>
                  <div className="review__input">
                    <input
                      onChange={(e) => setReviewText(e.target.value)}
                      type="text"
                      placeholder="share your thoughts"
                      required
                    />
                    <button
                      className="btn primary__btn text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>

                <ListGroup className="user__reviews mt-4">
                  {reviews?.map((review) => (
                    <div className="review__item">
                      <img src={avatar} alt="" />

                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>{review.user.username}</h5>
                            <p>
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </p>
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating}
                            <i class="ri-star-fill"></i>
                          </span>
                        </div>
                        <h6>{review.reviewText}</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </div>
          </Col>

          <Col lg="4">
            <Booking tour={tourData} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
      <Newsletter />
    </section>
  );
};

export default TourDetails;
