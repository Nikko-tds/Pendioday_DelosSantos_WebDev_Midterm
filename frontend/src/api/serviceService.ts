import type { Microservice } from "../types";

const API_BASE = "http://localhost:3000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchServices = async (): Promise<Microservice[]> => {
  const response = await fetch(`${API_BASE}/services`);
  if (!response.ok) throw new Error("Failed to fetch services");
  return response.json();
};

export const createService = async (service: Omit<Microservice, "id">): Promise<Microservice> => {
  //call await fetch assign to var response
  const response = await fetch(`${API_BASE}/services`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(service),
  });
  //check if response is not ok
  if (!response.ok) throw new Error("Failed to create service");
  //return response json
  return response.json();
};
