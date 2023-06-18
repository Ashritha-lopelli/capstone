import React, { useEffect } from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";
import { useTours } from "../../hooks/tours";

const FeaturedTourList = () => {
  const { tours, fetchTours } = useTours();

  useEffect(() => {
    if (!tours.isLoaded) {
      fetchTours({ featured: true });
    }
  }, [tours, fetchTours]);

  return (
    <>
      {tours.data?.map((tour) => (
        <Col lg="3" className="mb-4" key={tour.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
