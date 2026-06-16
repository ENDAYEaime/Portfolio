{{
  config(
    materialized='table',
    indexes=[
      {'columns': ['station_id']},
      {'columns': ['observation_time']},
      {'columns': ['station_id', 'observation_time']}
    ]
  )
}}

select *
from (
    select
        station_id,
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
        row_number() over (
            partition by station_id, observation_time
            order by observation_time
        ) as rn
    from {{ ref('int_weather_observations') }}
    where observation_time is not null
) t
where rn = 1
