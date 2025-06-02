import api from "./api";

const registerService = {
  registerUser: async (registrationData) => {
    const response = await api.post(
      "/api/auth.php?endpoint=register",
      registrationData,
    );

    // Store token if provided in response
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  },
};

export default registerService;
