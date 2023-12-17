import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // server: {
    //     host: "172.16.3.162", // Set your desired IP address
    //     port: 5069, // Set the port number you prefer
    // },
});
