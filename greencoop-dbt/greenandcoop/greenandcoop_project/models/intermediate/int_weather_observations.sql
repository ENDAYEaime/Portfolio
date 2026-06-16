select
    station_id,
    null::timestamp as observation_timestamp,
    observation_time,
    temperature_f,
    humidity_pct,
    pressure_in,
    wind_direction,
    wind_speed_mph,
    solar_wm2,
    uv,
    precip_rate_in,
    precip_accum_in,
    null::float as dew_point_c,
    null::float as wind_gust_kmh,
    null::float as visibility_m,
    null::float as cloudiness_pct,
    null::text as weather_description,
    'weather_underground' as source_system
from {{ ref('stg_meteo_test') }}

union all

select
    station_id,
    null::timestamp as observation_timestamp,
    observation_time,
    temperature_f,
    humidity_pct,
    pressure_in,
    wind_direction,
    wind_speed_mph,
    solar_wm2,
    uv,
    precip_rate_in,
    precip_accum_in,
    null::float as dew_point_c,
    null::float as wind_gust_kmh,
    null::float as visibility_m,
    null::float as cloudiness_pct,
    null::text as weather_description,
    'weather_underground' as source_system
from {{ ref('stg_meteo_station_3') }}

union all

select
    station_id,
    observation_timestamp,
    null::time as observation_time,
    null::float as temperature_f,
    humidity_pct,
    null::float as pressure_in,
    wind_direction,
    null::float as wind_speed_mph,
    null::float as solar_wm2,
    null::float as uv,
    null::float as precip_rate_in,
    null::float as precip_accum_in,
    dew_point_c,
    wind_gust_kmh,
    visibility_m,
    cloudiness_pct,
    weather_description,
    source_system
from {{ ref('stg_meteo_station_2_observations') }}