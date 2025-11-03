import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");
  const type = searchParams.get("type");

  if (!city) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  try {
    // Primero, obtener las coordenadas de la ciudad
    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        city
      )}&key=${apiKey}`
    );

    if (!geocodeResponse.ok) {
      throw new Error("Error al obtener coordenadas de la ciudad");
    }

    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== "OK" || geocodeData.results.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron coordenadas para esta ciudad" },
        { status: 404 }
      );
    }

    const location = geocodeData.results[0].geometry.location;

    // Buscar lugares cercanos
    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        location.lat
      },${location.lng}&radius=5000&type=${type || "tourist_attraction"}&key=${apiKey}&language=es`
    );

    if (!placesResponse.ok) {
      throw new Error("Error al obtener lugares de interés");
    }

    const placesData = await placesResponse.json();

    return NextResponse.json(placesData);
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
