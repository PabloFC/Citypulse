import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const photoReference = searchParams.get("photo_reference");

  if (!photoReference) {
    return NextResponse.json(
      { error: "Photo reference is required" },
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
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${apiKey}`;
    
    const response = await fetch(photoUrl);
    
    if (!response.ok) {
      throw new Error("Error fetching photo");
    }

    // Obtener la imagen como buffer
    const imageBuffer = await response.arrayBuffer();
    
    // Devolver la imagen con los headers correctos
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error fetching photo:", error);
    return NextResponse.json(
      { error: "Error al obtener la foto" },
      { status: 500 }
    );
  }
}
