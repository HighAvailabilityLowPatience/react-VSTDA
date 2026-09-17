/*
========================================
RUNTIMECONTEXT.JS
========================================

PURPOSE:
Build runtime context for the current user session.

RESPONSIBILITIES:
- Receive browser location data
- Preserve latitude / longitude / accuracy
- Calculate age of location data
- Generate current date and time
- Determine current season

THIS FILE SHOULD NOT:
- contain route logic
- call OpenRouter
- manage chat history
- persist data
*/


// ========================================
// GET SEASON
// ========================================

function getSeason(latitude, month) {

  // Northern Hemisphere
  let season;

  if (month >= 3 && month <= 5) {

    season = "spring";

  } else if (month >= 6 && month <= 8) {

    season = "summer";

  } else if (month >= 9 && month <= 11) {

    season = "fall";

  } else {

    season = "winter";

  }


  // ========================================
  // SOUTHERN HEMISPHERE
  // Seasons are reversed
  // ========================================

  if (latitude < 0) {

    const oppositeSeason = {

      spring: "fall",
      summer: "winter",
      fall: "spring",
      winter: "summer"

    };

    season = oppositeSeason[season];

  }


  return season;

}


// ========================================
// BUILD RUNTIME CONTEXT
// ========================================

function getRuntimeContext(location) {

  // ========================================
  // CURRENT TIME
  // ========================================

  const now = new Date();


  // ========================================
  // LOCATION VALIDATION
  // ========================================

  if (!location) {

    return {
      location: null,
      currentDateTime: {
        iso: now.toISOString(),
        date: now.toISOString().split("T")[0],
        time: now.toISOString().split("T")[1],
        timezone: "UTC"
      },
      season: null
    };

  }


  const {
    latitude,
    longitude,
    accuracy,
    capturedAt
  } = location;


  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {

    throw new Error(
      "Runtime Context Error: invalid latitude or longitude"
    );

  }


  // ========================================
  // LOCATION AGE
  // ========================================

  const capturedTime =
    new Date(capturedAt);


  if (Number.isNaN(capturedTime.getTime())) {

    throw new Error(
      "Runtime Context Error: invalid capturedAt timestamp"
    );

  }


  const locationAgeMilliseconds =
    Math.max(
      0,
      now.getTime() - capturedTime.getTime()
    );


  const locationAgeSeconds =
    Math.floor(
      locationAgeMilliseconds / 1000
    );


  const locationAgeMinutes =
    Math.floor(
      locationAgeSeconds / 60
    );


  // ========================================
  // DATE / TIME
  // ========================================

  const currentDateTime = {

    iso:
      now.toISOString(),

    date:
      now.toISOString().split("T")[0],

    time:
      now.toISOString().split("T")[1],

    timezone:
      "UTC"

  };


  // ========================================
  // SEASON
  // ========================================

  const currentMonth =
    now.getUTCMonth() + 1;


  const season =
    getSeason(
      latitude,
      currentMonth
    );


  // ========================================
  // RETURN RUNTIME CONTEXT
  // ========================================

  return {

    location: {

      latitude,

      longitude,

      accuracy:
        accuracy ?? null,

      capturedAt,

      age: {

        milliseconds:
          locationAgeMilliseconds,

        seconds:
          locationAgeSeconds,

        minutes:
          locationAgeMinutes

      }

    },


    currentDateTime,


    season

  };

}


// ========================================
// EXPORTS
// ========================================

export default getRuntimeContext;