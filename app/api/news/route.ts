import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GNews API key not configured" },
      { status: 500 }
    );
  }

  try {
    // Buscar noticias relacionadas con la ciudad usando GNews API
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        city
      )}&lang=es&country=es&max=9&apikey=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: "API key inválida o no autorizada" },
          { status: 401 }
        );
      }
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Has superado el límite de solicitudes" },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "Error al obtener noticias" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Convertir formato GNews a formato compatible
    const newsData = {
      status: "ok",
      totalResults: data.totalArticles || 0,
      articles: (data.articles || []).map((article: any) => ({
        source: { id: null, name: article.source.name },
        author: article.author || article.source.name,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.image,
        publishedAt: article.publishedAt,
        content: article.content,
      })),
    };

    return NextResponse.json(newsData);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Error al conectar con la API de noticias" },
      { status: 500 }
    );
  }
}
