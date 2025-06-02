import api from "./api";

const subscriptionService = {
  createSubscription: async (paymentData) => {
    const response = await api.post(
      "/api/subscription.php?endpoint=create",
      paymentData,
    );
    return response.data;
  },

  getSubscriptionDetails: async () => {
    const response = await api.get("/api/subscription.php?endpoint=get");
    // Extract data from the nested structure
    if (response.data && response.data.status && response.data.data) {
      return response.data.data;
    }
    throw new Error("Invalid subscription data format");
  },

  renewSubscription: async (paymentData) => {
    const response = await api.post(
      "/api/subscription.php?endpoint=update",
      paymentData,
    );
    return response.data;
  },
};

export default subscriptionService;
