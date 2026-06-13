-- =========================
-- CHIFFRE D'AFFAIRES PAR PRODUIT
-- =========================

CREATE OR REPLACE TABLE ca_produit AS

SELECT
    product_id,
    post_title,

    CAST(price AS DOUBLE) AS prix,

    CAST(total_sales AS INTEGER) AS ventes,

    CAST(price AS DOUBLE)
    *
    CAST(total_sales AS INTEGER)
    AS chiffre_affaires_produit

FROM dataset_final

WHERE price IS NOT NULL
AND total_sales IS NOT NULL;



-- =========================
-- CHIFFRE D'AFFAIRES TOTAL
-- =========================

CREATE OR REPLACE TABLE rapport_chiffre_affaires AS

SELECT
    SUM(chiffre_affaires_produit)
    AS chiffre_affaires_total

FROM ca_produit;