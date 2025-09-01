import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Basic health check
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "moody",
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "production",
      uptime: process.uptime(),
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
