import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const city = searchParams.get("search");

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching geocode data: ", (error as Error).message);
    return new Response("Error fetching geocode data", { status: 500 });
  }
}
