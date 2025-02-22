import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500, // Default is 500KB, increase if needed
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Separate third-party libraries
          }
          if (id.includes("Contact.jsx")) {
            return "contact"; // Separate Contact page
          }
        },
      },
    },
  },
});
