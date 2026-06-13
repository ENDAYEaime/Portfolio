-- ============================
-- IMPORT WEB
-- ============================

CREATE OR REPLACE TABLE web_raw AS

SELECT *
FROM read_xlsx(
    '/app/data/Fichier_web.xlsx',
    all_varchar = true
);



-- ============================
-- TEST IMPORT WEB
-- ============================

CREATE OR REPLACE TABLE test_import_web AS

SELECT
    COUNT(*) AS nb_lignes_importees,
    COUNT(DISTINCT sku) AS nb_sku_uniques

FROM web_raw;



-- ============================
-- NETTOYAGE WEB
-- Suppression des lignes sans SKU
-- Résultat attendu : 1428 lignes
-- ============================

CREATE OR REPLACE TABLE web_nettoye AS

SELECT *

FROM web_raw

WHERE sku IS NOT NULL;



-- ============================
-- TEST NETTOYAGE WEB
-- ============================

CREATE OR REPLACE TABLE test_nettoyage_web AS

SELECT
    (SELECT COUNT(*) FROM web_raw) AS nb_lignes_avant,

    (SELECT COUNT(*) FROM web_nettoye) AS nb_lignes_apres,

    (SELECT COUNT(*) FROM web_raw)
    -
    (SELECT COUNT(*) FROM web_nettoye) AS nb_lignes_supprimees;



-- ============================
-- TEST VALEURS MANQUANTES
-- ============================

CREATE OR REPLACE TABLE test_na_web AS

SELECT
    SUM(CASE WHEN sku IS NULL THEN 1 ELSE 0 END) AS sku_null,

    SUM(CASE WHEN post_title IS NULL THEN 1 ELSE 0 END) AS post_title_null,

    SUM(CASE WHEN post_name IS NULL THEN 1 ELSE 0 END) AS post_name_null

FROM web_nettoye;



-- ============================
-- TEST DOUBLONS
-- ============================

CREATE OR REPLACE TABLE test_doublons_web AS

SELECT
    sku,
    COUNT(*) AS nb_occurrences

FROM web_nettoye

GROUP BY sku

HAVING COUNT(*) > 1;



-- ============================
-- DEDOUBLONNAGE WEB
-- On garde uniquement les vraies fiches produits
-- On exclut les attachments/images
-- Résultat attendu : 714 lignes
-- ============================

CREATE OR REPLACE TABLE web_clean AS

SELECT *

FROM (

    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY sku
            ORDER BY sku
        ) AS rn

    FROM web_nettoye

    WHERE post_type = 'product'

) t

WHERE rn = 1;



-- ============================
-- TEST DEDOUBLONNAGE WEB
-- ============================

CREATE OR REPLACE TABLE test_dedoublonnage_web AS

SELECT

    (SELECT COUNT(*) FROM web_nettoye)
    AS nb_lignes_avant_dedoublonnage,

    (SELECT COUNT(*) FROM web_clean)
    AS nb_lignes_apres_dedoublonnage,

    (SELECT COUNT(*) FROM web_nettoye)
    -
    (SELECT COUNT(*) FROM web_clean)
    AS nb_lignes_supprimees_dedoublonnage;



-- ============================
-- TEST CONTROLE POST_TYPE
-- ============================

CREATE OR REPLACE TABLE test_post_type_web AS

SELECT
    post_type,
    COUNT(*) AS nb_lignes

FROM web_clean

GROUP BY post_type;