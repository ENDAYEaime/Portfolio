select
    'IICHTE19' as station_id,
    "Time"::time as observation_time,
    regexp_replace("Temperature", '[^0-9.\-]', '', 'g')::float as temperature_f,
    regexp_replace("Humidity", '[^0-9.\-]', '', 'g')::float as humidity_pct,
    regexp_replace("Pressure", '[^0-9.\-]', '', 'g')::float as pressure_in,
    "Wind" as wind_direction,
    regexp_replace("Speed", '[^0-9.\-]', '', 'g')::float as wind_speed_mph,
    regexp_replace("Solar", '[^0-9.\-]', '', 'g')::float as solar_wm2,
    "UV"::float as uv,
    regexp_replace("Precip__Rate_", '[^0-9.\-]', '', 'g')::float as precip_rate_in,
    regexp_replace("Precip__Accum_", '[^0-9.\-]', '', 'g')::float as precip_accum_in
from {{ source('raw', 'meteo_station_3') }}