
import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Powerchain",
    short_name: "Powerchain",
    description: "Renewable infrastructure and decentralized finance.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fbf8",
    theme_color: "#087a3b",
    icons: [{ src: "/logo.png", sizes: "512x512", type: "image/png" }]
  };
}
