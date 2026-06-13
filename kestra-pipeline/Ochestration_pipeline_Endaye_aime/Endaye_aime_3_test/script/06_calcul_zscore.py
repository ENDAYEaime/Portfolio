import duckdb

con = duckdb.connect("/app/data/pipeline.duckdb")

con.execute("""
CREATE OR REPLACE TABLE vins_zscore AS

SELECT
    *,
    (
        CAST(price AS DOUBLE)
        -
        AVG(CAST(price AS DOUBLE)) OVER ()
    )
    /
    STDDEV_SAMP(CAST(price AS DOUBLE)) OVER ()
    AS z_score

FROM dataset_final

WHERE price IS NOT NULL
AND total_sales IS NOT NULL;
""")

con.close()

print("Table vins_zscore créée avec succès.")