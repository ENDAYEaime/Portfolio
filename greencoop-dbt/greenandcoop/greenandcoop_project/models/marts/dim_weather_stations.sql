{{
  config(
    materialized='table',
    indexes=[
      {'columns': ['station_id'], 'unique': true}
    ]
  )
}}

-- Stations issues des données sources
select
    station_id,
    coalesce(station_name, 'unknown') as station_name,
    null as city,
    latitude,
    longitude,
    elevation,
    station_type,
    null as hardware,
    null as software
from {{ ref('stg_meteo_station_2') }}

union all

-- Station Weather Underground 1
select
    'ILAMAD25' as station_id,
    'La Madeleine' as station_name,
    'La Madeleine' as city,
    50.659::float as latitude,
    3.070::float as longitude,
    23::float as elevation,
    null as station_type,
    'other' as hardware,
    'EasyWeatherPro_V5.1.6' as software

union all

-- Station Weather Underground 2
select
    'IICHTE19' as station_id,
    'WeerstationBS' as station_name,
    'Ichtegem' as city,
    51.092::float as latitude,
    2.999::float as longitude,
    15::float as elevation,
    null as station_type,
    'other' as hardware,
    'EasyWeatherV1.6.6' as software