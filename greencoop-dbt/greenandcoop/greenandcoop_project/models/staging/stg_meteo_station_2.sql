select
    station->>'id' as station_id,
    station->>'nom' as station_name,
    (station->>'latitude')::float as latitude,
    (station->>'longitude')::float as longitude,
    (station->>'élévation')::float as elevation,
    station->>'type' as station_type
from {{ source('raw', 'meteo_station_2') }},
jsonb_array_elements(stations) as station