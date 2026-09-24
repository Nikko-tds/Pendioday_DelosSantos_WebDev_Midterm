import { useContext, useEffect } from "react";
import { ServiceContext } from "../context/ServiceContext";
import { fetchServices } from "../api/serviceService";

const ServiceList = () => {
  const context = useContext(ServiceContext);
  if (!context)
    throw new Error("ServiceList must be used within a ServiceProvider.");
  const { state, dispatch } = context;

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        dispatch({ type: "FETCH_SERVICES_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: (error as Error).message });
      }
    };
    loadServices();
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {state.services.map((service) => (
        <div key={service.id}>
          <h2>{service.name}</h2>
          <p>{service.endpointUrl}</p>
          <p>{service.environment}</p>
          <p>{service.status}</p>
          <p>{service.version}</p>
          <p>{service.ownerEmail}</p>
          <p>{service.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
