import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.39'],
 
};

export default withNextIntl(nextConfig);