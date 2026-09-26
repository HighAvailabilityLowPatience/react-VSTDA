const LOCATION_MAX_AGE_MS = 60 * 60 * 1000;

function getSeason(latitude, month) {
  let season;

  if (month >= 3 && month <= 5) season = "spring";
  else if (month >= 6 && month <= 8) season = "summer";
  else if (month >= 9 && month <= 11) season = "fall";
  else season = "winter";

  if (latitude < 0) {
    season = {
      spring: "fall",
      summer: "winter",
      fall: "spring",
      winter: "summer"
    }[season];
  }

  return season;
}

function getCurrentDateTime(now) {
  return {
    iso: now.toISOString(),
    date: now.toISOString().split("T")[0],
    time: now.toISOString().split("T")[1],
    timezone: "UTC"
  };
}

function getRuntimeContext(location) {
  const now = new Date();
  const currentDateTime = getCurrentDateTime(now);
  const latitude = location?.latitude;
  const longitude = location?.longitude;
  const capturedTime = new Date(location?.capturedAt);

  if (!location) {
    return { location: null, locationStatus: "unavailable", currentDateTime, season: null };
  }

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return { location: null, locationStatus: "invalid", currentDateTime, season: null };
  }

  if (Number.isNaN(capturedTime.getTime())) {
    return { location: null, locationStatus: "invalid", currentDateTime, season: null };
  }

  const ageMilliseconds = Math.max(0, now.getTime() - capturedTime.getTime());

  if (ageMilliseconds > LOCATION_MAX_AGE_MS) {
    return { location: null, locationStatus: "stale", currentDateTime, season: null };
  }

  return {
    location: {
      latitude,
      longitude,
      accuracy: location.accuracy ?? null,
      capturedAt: location.capturedAt,
      age: {
        milliseconds: ageMilliseconds,
        seconds: Math.floor(ageMilliseconds / 1000),
        minutes: Math.floor(ageMilliseconds / 60000)
      }
    },
    locationStatus: "available",
    currentDateTime,
    season: getSeason(latitude, now.getUTCMonth() + 1)
  };
}

export default getRuntimeContext;
