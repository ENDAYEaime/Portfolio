-- =========================
-- FUSION WEB + LIAISON
-- =========================

CREATE OR REPLACE TABLE web_liaison AS

SELECT DISTINCT
    l.product_id,
    l.id_web,

    w.sku,
    w.post_title,
    w.post_name,
    CAST(w.total_sales AS INTEGER) AS total_sales

FROM liaison_clean AS l

INNER JOIN web_clean AS w
ON l.id_web = w.sku

WHERE l.id_web IS NOT NULL
AND w.sku IS NOT NULL;



-- =========================
-- TEST JOINTURE WEB + LIAISON
-- =========================

CREATE OR REPLACE TABLE test_jointure_web_liaison AS

SELECT
    COUNT(*) AS nb_lignes,

    COUNT(DISTINCT product_id)
    AS nb_produits_uniques,

    SUM(
        CASE
            WHEN sku IS NULL THEN 1
            ELSE 0
        END
    ) AS nb_sans_correspondance_web

FROM web_liaison;



-- =========================
-- FUSION RESULTAT + ERP
-- =========================

CREATE OR REPLACE TABLE dataset_final AS

SELECT DISTINCT

    e.product_id,

    CAST(e.price AS DOUBLE)
    AS price,

    e.stock_quantity,
    e.stock_status,
    e.onsale_web,

    wl.id_web,
    wl.post_title,
    wl.post_name,

    wl.total_sales

FROM erp_clean AS e

INNER JOIN web_liaison AS wl
ON e.product_id = wl.product_id

WHERE wl.total_sales IS NOT NULL;



-- =========================
-- TEST DATASET FINAL
-- =========================

CREATE OR REPLACE TABLE test_dataset_final AS

SELECT

    COUNT(*) AS nb_lignes_finales,

    COUNT(DISTINCT product_id)
    AS nb_produits_uniques,

    SUM(
        CASE
            WHEN price IS NULL THEN 1
            ELSE 0
        END
    ) AS prix_null,

    SUM(
        CASE
            WHEN total_sales IS NULL THEN 1
            ELSE 0
        END
    ) AS ventes_null,

    SUM(
        CASE
            WHEN post_title IS NULL THEN 1
            ELSE 0
        END
    ) AS titre_web_null

FROM dataset_final;