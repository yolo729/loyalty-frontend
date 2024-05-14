import React, { useEffect } from "react";

declare global {
  interface Window {
    zrl: any; // Use 'any' if you're not sure about the type
  }
}
export const Dashboard: React.FC = () => {
  useEffect(() => {
    const apiKey = "your-api-key";
    const customerId = "customer-id";
    const zrl = window.zrl as any;
    // Function to load the Zinrelo script
    const loadZinreloScript = () => {
      const script = document.createElement("script");
      // Replace 'path/to/zinrelo/dashboard/script.js' with the actual URL
      script.src = "https://example.com/zinrelo/dashboard/script.js";
      script.async = true;
      document.body.appendChild(script);
    };

    // Check if Zinrelo script is already loaded
    if (window.zrl) {
      // If Zinrelo script is already available, directly initialize it
      window.zrl.init({
        // Add any additional configurations needed for Zinrelo initialization
        // For example:
        apiKey: apiKey,
        customerId: customerId,
      });
    } else {
      // If Zinrelo script is not yet loaded, load it and then initialize
      loadZinreloScript();
      // Wait for the script to load, then initialize Zinrelo
      document.addEventListener("zrl:ready", () => {
        window.zrl.init({
          // Add any additional configurations needed for Zinrelo initialization
          // For example:
          apiKey: "your-api-key",
          customerId: "customer-id",
        });
      });
    }

    // Cleanup function
    return () => {
      // Remove Zinrelo script when component is unmounted
      const zinreloScript = document.getElementById("zrl-script");
      if (zinreloScript) {
        zinreloScript.remove();
      }
    };
  }, []);

  return <div id="zrl_embed_div"></div>;
};
