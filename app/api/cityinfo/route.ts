import { NextRequest, NextResponse } from "next/server";

// Datos específicos y únicos de cada ciudad
const citiesData: Record<string, {
  population: number;
  founded?: string;
  altitude?: number;
  nickname?: string;
  famousFor: string[];
  funFact: string;
}> = {
  Madrid: {
    population: 3266126,
    founded: "Siglo IX",
    altitude: 667,
    nickname: "La Villa",
    famousFor: ["Museo del Prado", "Palacio Real", "Retiro", "Gran Vía"],
    funFact: "Madrid es la capital más alta de Europa a 667 metros sobre el nivel del mar.",
  },
  Barcelona: {
    population: 1636762,
    founded: "Siglo I a.C.",
    altitude: 12,
    nickname: "Ciudad Condal",
    famousFor: ["Sagrada Familia", "Park Güell", "La Rambla", "Camp Nou"],
    funFact: "La Sagrada Familia lleva más de 140 años en construcción y se espera terminar en 2026.",
  },
  Valencia: {
    population: 794288,
    founded: "138 a.C.",
    altitude: 15,
    nickname: "Cap i Casal",
    famousFor: ["Ciudad de las Artes", "Paella", "Las Fallas", "Playa de la Malvarrosa"],
    funFact: "Valencia es la cuna de la paella, el plato más internacional de España.",
  },
  Sevilla: {
    population: 689434,
    founded: "Siglo VIII a.C.",
    altitude: 7,
    nickname: "Hispalis",
    famousFor: ["Giralda", "Real Alcázar", "Plaza de España", "Feria de Abril"],
    funFact: "Sevilla tiene el casco antiguo más grande de España y uno de los tres más grandes de Europa.",
  },
  Málaga: {
    population: 578460,
    founded: "770 a.C.",
    altitude: 11,
    nickname: "Capital Costa del Sol",
    famousFor: ["Museo Picasso", "Alcazaba", "Playas", "Semana Santa"],
    funFact: "Pablo Picasso nació en Málaga en 1881, y su casa natal es ahora un museo.",
  },
  Zaragoza: {
    population: 681877,
    founded: "24 a.C.",
    altitude: 199,
    nickname: "La Inmortal",
    famousFor: ["Basílica del Pilar", "La Seo", "Aljafería", "Expo 2008"],
    funFact: "El Pilar es el primer templo mariano de la cristiandad y único santuario visitado por la Virgen en vida.",
  },
  Bilbao: {
    population: 346843,
    founded: "1300",
    altitude: 19,
    nickname: "Botxo",
    famousFor: ["Guggenheim", "Casco Viejo", "Puente Colgante", "Pintxos"],
    funFact: "El Guggenheim transformó Bilbao de ciudad industrial a destino cultural mundial.",
  },
  Granada: {
    population: 232770,
    founded: "Siglo V a.C.",
    altitude: 738,
    nickname: "La Sultana",
    famousFor: ["La Alhambra", "Albaicín", "Sierra Nevada", "Tapas gratis"],
    funFact: "La Alhambra recibe más de 3 millones de visitantes al año, siendo el monumento más visitado de España.",
  },
  Toledo: {
    population: 85811,
    founded: "Siglo V a.C.",
    altitude: 529,
    nickname: "Ciudad Imperial",
    famousFor: ["Catedral", "Alcázar", "El Greco", "Espadas toledanas"],
    funFact: "Toledo fue capital de España hasta 1561 y es Patrimonio de la Humanidad desde 1986.",
  },
  Salamanca: {
    population: 144228,
    founded: "Siglo III a.C.",
    altitude: 802,
    nickname: "La Dorada",
    famousFor: ["Universidad", "Plaza Mayor", "Clerecía", "Rana de la fachada"],
    funFact: "La Universidad de Salamanca, fundada en 1218, es una de las cuatro más antiguas de Europa.",
  },
  Córdoba: {
    population: 325701,
    founded: "Siglo VIII a.C.",
    altitude: 123,
    nickname: "La Califal",
    famousFor: ["Mezquita-Catedral", "Patios", "Puente Romano", "Medina Azahara"],
    funFact: "Córdoba fue la ciudad más grande de Occidente en el siglo X con 500,000 habitantes.",
  },
  Alicante: {
    population: 337482,
    founded: "Siglo IV a.C.",
    altitude: 3,
    nickname: "La Ciudad de la Luz",
    famousFor: ["Castillo Santa Bárbara", "Explanada", "Hogueras", "Playa del Postiguet"],
    funFact: "Alicante tiene más de 300 días de sol al año, siendo una de las ciudades más soleadas de Europa.",
  },
  Murcia: {
    population: 459403,
    founded: "825",
    altitude: 43,
    nickname: "La Huerta de Europa",
    famousFor: ["Catedral", "Casino", "Huerta", "Gastronomía"],
    funFact: "Murcia es la séptima ciudad más grande de España y capital de la huerta europea.",
  },
  Palma: {
    population: 416065,
    founded: "123 a.C.",
    altitude: 13,
    nickname: "Ciutat",
    famousFor: ["Catedral La Seu", "Bellver", "Playas", "Lonja"],
    funFact: "La Catedral de Palma tiene el rosetón gótico más grande del mundo con 13,8 metros de diámetro.",
  },
  Valladolid: {
    population: 298412,
    founded: "Siglo XI",
    altitude: 698,
    nickname: "Pucela",
    famousFor: ["Plaza Mayor", "Cervantes", "Semana Santa", "Museo Nacional de Escultura"],
    funFact: "Valladolid fue la ciudad donde se casaron los Reyes Católicos y residencia de Felipe II.",
  },
  Vigo: {
    population: 296479,
    founded: "Siglo II a.C.",
    altitude: 31,
    nickname: "Ciudad Olívica",
    famousFor: ["Islas Cíes", "Puerto", "Ostras", "Navidad"],
    funFact: "Vigo tiene la mayor flota pesquera de Europa y el puerto con más movimiento de Galicia.",
  },
  Gijón: {
    population: 271780,
    founded: "Siglo V a.C.",
    altitude: 5,
    nickname: "Capital de la Costa Verde",
    famousFor: ["Playa San Lorenzo", "Elogio del Horizonte", "Sidra", "Laboral"],
    funFact: "Gijón es la ciudad más grande de Asturias y tiene más de 10 km de playas urbanas.",
  },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { success: false, error: "City parameter is required" },
      { status: 400 }
    );
  }

  try {
    const normalizedCity = city.trim();
    const cityData = citiesData[normalizedCity];

    if (!cityData) {
      return NextResponse.json(
        { success: false, error: "Ciudad no encontrada en la base de datos" },
        { status: 404 }
      );
    }

    const cityInfo = {
      name: normalizedCity,
      population: cityData.population,
      founded: cityData.founded,
      altitude: cityData.altitude,
      nickname: cityData.nickname,
      famousFor: cityData.famousFor,
      funFact: cityData.funFact,
    };

    return NextResponse.json({
      success: true,
      data: cityInfo,
    });
  } catch (error) {
    console.error("Error fetching city info:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
