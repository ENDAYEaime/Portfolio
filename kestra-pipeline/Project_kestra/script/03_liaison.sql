-- ============================
-- IMPORT LIAISON
-- ============================

CREATE OR REPLACE TABLE liaison_raw AS

SELECT *
FROM read_xlsx(
    '/app/data/fichier_liaison.xlsx',
    all_varchar = true
);



-- ============================
-- TEST IMPORT LIAISON
-- ============================

CREATE OR REPLACE TABLE test_import_liaison AS

SELECT
    COUNT(*) AS nb_lignes_importees,
    COUNT(DISTINCT product_id) AS nb_product_id_uniques,
    COUNT(DISTINCT id_web) AS nb_id_web_uniques

FROM liaison_raw;



-- ============================
-- TEST VALEURS MANQUANTES
-- ============================

CREATE OR REPLACE TABLE test_na_liaison AS

SELECT
    SUM(CASE WHEN product_id IS NULL THEN 1 ELSE 0 END) AS product_id_null,
    SUM(CASE WHEN id_web IS NULL THEN 1 ELSE 0 END) AS id_web_null

FROM liaison_raw;



-- ============================
-- TEST DOUBLONS
-- ============================

CREATE OR REPLACE TABLE test_doublons_liaison AS

SELECT
    product_id,
    id_web,
    COUNT(*) AS nb_occurrences

FROM liaison_raw

GROUP BY
    product_id,
    id_web

HAVING COUNT(*) > 1;



-- ============================
-- NETTOYAGE LIAISON
-- ============================

CREATE OR REPLACE TABLE liaison_clean AS

SELECT DISTINCT
    product_id,
    id_web

FROM liaison_raw

WHERE product_id IS NOT NULL;



-- ============================
-- TEST NETTOYAGE
-- ============================

CREATE OR REPLACE TABLE test_nettoyage_liaison AS

SELECT

    (SELECT COUNT(*)
     FROM liaison_raw)

AS nb_lignes_avant,


    (SELECT COUNT(*)
     FROM liaison_clean)

AS nb_lignes_apres,


    (SELECT COUNT(*)
     FROM liaison_raw)

-

    (SELECT COUNT(*)
     FROM liaison_clean)

AS nb_lignes_supprimees;