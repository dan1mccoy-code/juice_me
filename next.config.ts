import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://ejypnkyztcfvkkdkhuds.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXBua3l6dGNmdmtrZGtodWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDY3MjAsImV4cCI6MjA4ODMyMjcyMH0.9xO7g17aePJUNyjUoYOJ4dOTQp3F9CI7NHEP2FFObfo',
  },
};

export default nextConfig;
