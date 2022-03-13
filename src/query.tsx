import { QUERY_PATH } from "./constants";

const QUERY = async (data: string) => {
  const response = await fetch(`${QUERY_PATH}${data}`);
  return await response.json();
};

export default QUERY;
