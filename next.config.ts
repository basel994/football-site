import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {  
    domains: ['res.cloudinary.com'], // استبدل بالنطاق الصحيح لخدمة الصور المستخدمة  
  },
};

export default nextConfig;
