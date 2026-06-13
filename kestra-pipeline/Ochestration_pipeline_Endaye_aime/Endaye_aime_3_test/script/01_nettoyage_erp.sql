-- 1. Import du fichier ERP
CREATE OR REPLACE TABLE erp_raw AS
SELECT *
FROM read_xlsx('/app/data/Fichier_erp.xlsx');

-- 2. Test : nombre de lignes importées
CREATE OR REPLACE TABLE test_import_erp AS
SELECT 
    COUNT(*) AS nb_lignes_importees,
    COUNT(DISTINCT product_id) AS nb_product_id_uniques
FROM erp_raw;

-- 3. Test : valeurs manquantes
CREATE OR REPLACE TABLE test_na_erp AS
SELECT
    SUM(CASE WHEN product_id IS NULL THEN 1 ELSE 0 END) AS product_id_null,
    SUM(CASE WHEN price IS NULL THEN 1 ELSE 0 END) AS price_null,
    SUM(CASE WHEN stock_quantity IS NULL THEN 1 ELSE 0 END) AS stock_quantity_null,
    SUM(CASE WHEN stock_status IS NULL THEN 1 ELSE 0 END) AS stock_status_null
FROM erp_raw;

-- 4. Test : doublons sur product_id
CREATE OR REPLACE TABLE test_doublons_erp AS
SELECT 
    product_id,
    COUNT(*) AS nb_occurrences
FROM erp_raw
GROUP BY product_id
HAVING COUNT(*) > 1;

-- 5. Nettoyage ERP : suppression NA + doublons
CREATE OR REPLACE TABLE erp_clean AS
SELECT DISTINCT *
FROM erp_raw
WHERE product_id IS NOT NULL
  AND price IS NOT NULL
  AND stock_quantity IS NOT NULL
  AND stock_status IS NOT NULL;

-- 6. Test nettoyage
CREATE OR REPLACE TABLE test_nettoyage_erp AS
SELECT
    (SELECT COUNT(*) FROM erp_raw) AS nb_lignes_avant,
    (SELECT COUNT(*) FROM erp_clean) AS nb_lignes_apres,
    (SELECT COUNT(*) FROM erp_raw) - (SELECT COUNT(*) FROM erp_clean) AS nb_lignes_supprimees;