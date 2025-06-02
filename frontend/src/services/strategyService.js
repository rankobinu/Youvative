import api from "./api";

const strategyService = {
  getUserStrategies: async () => {
    try {
      const response = await api.get("/api/strategy.php?endpoint=get");
      return response.data;
    } catch (error) {
      console.error("Error fetching strategies:", error);
      throw error;
    }
  },

  selectStrategy: async (strategyId) => {
    const response = await api.post("/strategy/select", {
      strategy_id: strategyId,
    });
    return response.data;
  },

  // Get only the monthly strategy
  getMonthlyStrategy: async () => {
    try {
      const response = await api.get("/api/strategy.php?endpoint=get");

      console.log("Strategy API response:", response.data);

      // Check if the response has the expected structure
      if (response.data && response.data.status && response.data.strategies) {
        // Find the most recent monthly strategy
        const monthlyStrategies = response.data.strategies
          .filter((strategy) => strategy.strategy_type === "monthly")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        console.log("Monthly strategies found:", monthlyStrategies);

        if (monthlyStrategies.length > 0) {
          const result = {
            goal: monthlyStrategies[0].goal,
            description: monthlyStrategies[0].description,
          };
          console.log("Returning monthly strategy:", result);
          return result;
        }
      }

      console.log("No monthly strategy found, returning fallback");
      // Fallback if no data is available
      return {
        goal: "Monthly goal not available",
        description: "No description available",
      };
    } catch (error) {
      console.error("Error fetching monthly strategy:", error);
      // Return fallback data in case of error
      return {
        goal: "Failed to load monthly goal",
        description: "Please try again later",
      };
    }
  },

  // Get only the general strategy
  getGeneralStrategy: async () => {
    try {
      const response = await api.get("/api/strategy.php?endpoint=get");

      // Check if the response has the expected structure
      if (response.data && response.data.status && response.data.strategies) {
        // Find the most recent general strategy
        const generalStrategies = response.data.strategies
          .filter((strategy) => strategy.strategy_type === "general")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        if (generalStrategies.length > 0) {
          return {
            goal: generalStrategies[0].goal,
            description: generalStrategies[0].description,
          };
        }
      }

      // Fallback if no data is available
      return {
        goal: "General goal not available",
        description: "No description available",
      };
    } catch (error) {
      console.error("Error fetching general strategy:", error);
      // Return fallback data in case of error
      return {
        goal: "Failed to load general goal",
        description: "Please try again later",
      };
    }
  },
};

export default strategyService;
