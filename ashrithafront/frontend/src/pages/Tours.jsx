/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import Newsletter from "../shared/Newsletter";
import SearchBar from "../shared/SearchBar";
import TourCard from "../shared/TourCard";
import { Alert, Container } from "reactstrap";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import { useTours } from "../hooks/tours";
import { useSearchParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

const Tours = () => {
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const { tours, fetchTours } = useTours();
  const [params, setParams] = useState({});

  useEffect(() => {
    if (!tours.isLoaded) {
      fetchTours({ featured: true }, setError);
    }
  }, []);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    if (!isEmpty(params)) {
      setParams(params);
      fetchTours(params, setError);
    } else if (!tours.isLoaded) {
      fetchTours({ featured: true }, setError);
    }
  }, [searchParams]);

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar params={params} />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <p>
            <Alert color="danger" isOpen={error}>
              {error}
            </Alert>
          </p>
          <Row>
            {tours.data.length === 0 && (
              <div className="d-flex justify-content-center">
                <h1>No Packages Found</h1>
              </div>
            )}
            {tours.data?.map((tour) => (
              <Col lg="3" className="mb-4" key={tour._id}>
                {""}
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
