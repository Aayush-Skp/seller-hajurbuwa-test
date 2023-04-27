import { httpClient } from "../config/httpClient";

const policyUrl = "/policy";

export function getAllPolicies() {
  return httpClient.get(policyUrl).then((res) => res.data.data);
}