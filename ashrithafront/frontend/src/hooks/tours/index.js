import { createContext, useContext, useMemo, useState } from "react";
import { getPackages } from "../../utils/api";
import { monthNames } from "../../utils/months";

const ToursContext = createContext();

export const ToursProvider = ({ children }) => {
  const [tours, setTours] = useState({
    isLoaded: false,
    data: [],
  });

  const fetchTours = async (params, callback) => {
    try {
      if (params.month) {
        params.month = monthNames[params.month.split("-")[1]];
      }

      const { data } = await getPackages(params);

      setTours({
        isLoaded: true,
        data: data.data,
      });
    } catch (err) {
      const { status, data } = err.response;

      if ([400, 404].includes(status)) callback(data.message);
      else callback("Something went wrong, Please try again later.");
    }
  };

  const value = useMemo(
    () => ({
      tours,
      fetchTours,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tours]
  );

  return (
    <ToursContext.Provider value={value}>{children}</ToursContext.Provider>
  );
};

export const useTours = () => {
  return useContext(ToursContext);
};
