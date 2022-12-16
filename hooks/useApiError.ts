import { AxiosResponse } from "axios";
import useAuth from "./useAuth";

export default function useApiError() {
  const { logout } = useAuth();

  const handleError = (errorResponse: unknown) => {
    const response = errorResponse as AxiosResponse;
    const status = response.status;

    if ([401, 403].includes(status)) {
      logout();
    }

    if (typeof response.data.message === 'string') {
      alert(response.data.message);
    }
  };

  return {
    handleError
  }
}