import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, createSearchParams } from "react-router-dom";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { Select, DatePicker } from "antd";
import { getCountries } from "../utils/api";
import { monthNames } from "../utils/months";

const SearchBar = ({ params }) => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [adventures, setAdventures] = useState([]);

  const [location, setLocation] = useState(null);
  const [adventureType, setAdventureType] = useState(null);
  const [when, setWhen] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (params) {
      setLocation(params.location || null);
      setAdventureType(params.adventure || null);
      setWhen(params.month || null);
    }
  }, [params]);

  const fetchCountries = async () => {
    try {
      const { data } = await getCountries();
      const {
        data: { countries, adventureType },
      } = data;

      setCountries(countries.map((ele) => ({ value: ele, label: ele })));
      setAdventures(adventureType.map((ele) => ({ value: ele, label: ele })));
    } catch (err) {
      console.log(err);
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const searchHandler = () => {
    const query = {};

    if (location) query.location = location;
    if (adventureType) query.adventure = adventureType;
    if (when) query.month = when;

    navigate(`/tours?${createSearchParams(query)}`);
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast mt-3">
            <span>
              <i class="ri-map-pin-fill"></i>
            </span>
            <div style={{ marginRight: "12px" }}>
              <h6>Where to?</h6>
              <Select
                placeholder="where are you going?"
                style={{
                  width: 200,
                }}
                showArrow={false}
                bordered={false}
                options={countries}
                value={location}
                onChange={(e) => setLocation(e)}
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast mt-3">
            <span>
              <i class="ri-map-pin-time-fill"></i>
            </span>
            <div style={{ marginRight: "12px" }}>
              <h6>When?</h6>
              <DatePicker
                allowClear={false}
                bordered={false}
                picker="month"
                disabledDate={disabledDate}
                onChange={(e, dateString) => {
                  setWhen(dateString);
                }}
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-last mt-3">
            <span>
              <i class="ri-group-fill"></i>
            </span>
            <div style={{ marginRight: "12px" }}>
              <h6>All Adventures</h6>
              <Select
                placeholder="select adventure"
                style={{
                  width: 200,
                }}
                showArrow={false}
                bordered={false}
                options={adventures}
                value={adventureType}
                onChange={(e) => setAdventureType(e)}
              />
            </div>
          </FormGroup>

          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i class="ri-search-2-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
