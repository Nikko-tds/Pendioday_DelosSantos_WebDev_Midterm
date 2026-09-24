import { useContext, useState } from "react";
import { createService } from "../api/serviceService";
import { ServiceContext } from "../context/ServiceContext";

const ServiceForm = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error("ServiceForm must be used wihtin ServiceProvide");
  const { dispatch } = context;

  const [name, setName] = useState("");
  const [endpointUrl, setEndpointUrl] = useState("");
  const [environment, setEnvironment] = useState("");
  const [status, setStatus] = useState("");
  const [version, setVersion] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const resetForm = () => {
    setName("");
    setEndpointUrl("");
    setEnvironment("");
    setStatus("");
    setVersion("");
    setOwnerEmail("");
    setCreatedAt("");
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      //validate
      const newService = await createService({
        name,
        endpointUrl,
        environment: "DEVELOPMENT",
        status: "HEALTHY",
        version,
        ownerEmail,
        createdAt,
      });
      dispatch({ type: "CREATE_SERVICE_SUCCESS", payload: newService });
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to create service");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Microservice</h3>
      <input
        type="text"
        placeholder="Service Name"
        value={name}
        onChange={(e) => e.target.value}
        required
      />
      <input
        type="text"
        placeholder="Service Endpoint URL"
        value={endpointUrl}
        onChange={(e) => e.target.value}
        required
      />
      <input
        type="text"
        placeholder="Service Environment"
        value={environment}
        onChange={(e) => e.target.value}
        required
      />
      <input
        type="text"
        placeholder="Service Status"
        value={status}
        onChange={(e) => e.target.value}
        required
      />
      <input
        type="text"
        placeholder="Service Version"
        value={version}
        onChange={(e) => e.target.value}
        required
      />
      <input
        type="text"
        placeholder="Service Owner Email"
        value={ownerEmail}
        onChange={(e) => e.target.value}
        required
      />
      <input
        type="text"
        placeholder="Service Created At"
        value={createdAt}
        onChange={(e) => e.target.value}
        required
      />
    </form>
  );
};

export default ServiceForm;
