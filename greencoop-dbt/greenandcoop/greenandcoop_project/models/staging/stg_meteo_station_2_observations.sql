select
    station.key as station_id,
    (obs.value->>'dh_utc')::timestamp as observation_timestamp,
    replace(nullif(obs.value->>'temperature', ''), ',', '.')::float as temperature_c,
    replace(nullif(obs.value->>'humidite', ''), ',', '.')::float as humidity_pct,
    replace(nullif(obs.value->>'pression', ''), ',', '.')::float as pressure_hpa,
    replace(nullif(obs.value->>'point_de_rosee', ''), ',', '.')::float as dew_point_c,
    replace(nullif(obs.value->>'vent_moyen', ''), ',', '.')::float as wind_speed_kmh,
    replace(nullif(obs.value->>'vent_rafales', ''), ',', '.')::float as wind_gust_kmh,
    obs.value->>'vent_direction' as wind_direction,
    replace(nullif(obs.value->>'pluie_1h', ''), ',', '.')::float as precip_1h_mm,
    replace(nullif(obs.value->>'pluie_3h', ''), ',', '.')::float as precip_3h_mm,
    replace(nullif(obs.value->>'visibilite', ''), ',', '.')::float as visibility_m,
    replace(nullif(obs.value->>'nebulosite', ''), ',', '.')::float as cloudiness_pct,
    obs.value->>'temps_omm' as weather_description,
    'infoclimat' as source_system
from {{ source('raw', 'meteo_station_2') }} src,
lateral jsonb_each(src.hourly) as station(key, value),
lateral jsonb_array_elements(station.value) as obs(value)
where station.key not like '\_%' escape '\'