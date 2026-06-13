import duckdb

con = duckdb.connect("/app/data/pipeline.duckdb")

df = con.execute("""
SELECT *
FROM vins_zscore
WHERE z_score > 2;
""").fetchdf()

df.to_csv("/app/outputs/vins_premium.csv", index=False)

con.close()

print(f"Export vins premium terminé : {len(df)} lignes.")