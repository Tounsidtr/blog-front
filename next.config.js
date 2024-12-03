/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["encrypted-tbn0.gstatic.com","parisjetaime.com","www.myurbanexperience.com"], // Ajoute les domaines autorisés
  },
};

module.exports = nextConfig;
