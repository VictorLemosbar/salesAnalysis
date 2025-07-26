-- Identifiers used respectively:
-- working_database1 = dt
-- working_database2 = dm
-- INNER JOIN was used to combine the two tables and enable brand identification through dt.id_marca_
-- and dm.id_marca

-- SQL query used to join the two JSON files into a CSV
-- Selects the columns data, sales, vehicle_value, name, and brand from the working_database1.json
-- Selects the brand column from working_database2.json

SELECT dt.data, dt.id_marca_, dt.vendas, dt.valor_do_veiculo, dt.nome, dm.marca
FROM working_database1 as dt
INNER JOIN working_database2 as dm on dt.id_marca_ = dm.id_marca;

-------------------------------------------------------------------------------------------------------------------

-- 1. Which brand had the highest sales volume?

-- SQL query that checks the brand with the highest number of sales;
-- Selects the sum of the sales column, grouping by its respective brand and creates a new column (total_sales)
-- Also selects the brand and id_marca columns

SELECT SUM(dt.vendas) as total_sales, dm.marca, dm.id_marca
FROM working_database1 as dt
INNER JOIN working_database2 as dm on dt.id_marca_ = dm.id_marca
GROUP BY dm.id_marca, dm.marca
ORDER BY total_sales DESC; -- Added ORDER BY for a meaningful answer

-------------------------------------------------------------------------------------------------------------------

-- 2. Which vehicle generated the highest and lowest revenue?

-- SQL query that checks the vehicle that generated the most revenue;
-- Selects the sum of the multiplication of sales by their respective vehicle values and creates a new column (total_per_vehicle)
-- Also selects the columns dt.name, dm.brand
-- Groups the query results by dm.name
-- Orders the results of total_per_vehicle in descending order
-- Limits the query to only one result

SELECT SUM(dt.vendas * dt.valor_do_veiculo) AS total_per_vehicle, dt.nome, dm.marca
FROM working_database1 as dt
INNER JOIN working_database2 as dm on dt.id_marca_ = dm.id_marca
GROUP BY dt.nome, dm.marca
ORDER BY total_per_vehicle DESC
LIMIT 1;

-- SQL query that checks the vehicle that generated the lowest revenue;
-- Selects the sum of the multiplication of sales by their respective vehicle values and creates a new column (total_per_vehicle)
-- Also selects the columns dt.name, dm.brand
-- Groups the query results by dm.name
-- Orders the results of the total_per_vehicle column in ascending order
-- Limits the query to only one result

SELECT SUM(dt.vendas * dt.valor_do_veiculo) AS total_per_vehicle, dt.nome, dm.marca
FROM working_database1 as dt
INNER JOIN working_database2 as dm on dt.id_marca_ = dm.id_marca
GROUP BY dt.nome, dm.marca
ORDER BY total_per_vehicle ASC
LIMIT 1; -- Added LIMIT 1 for the lowest revenue

-- SQL query that checks the least sold vehicles
-- Selects the sum of sales
-- Selects the name column
-- Creates the car_sales column
-- Groups the result by name
-- Orders the result in ascending order

SELECT SUM(dt.vendas) as car_sales, dt.nome
FROM working_database1 AS dt
INNER JOIN working_database2 AS dm on dm.id_marca = dt.id_marca_
GROUP BY dt.nome
ORDER BY car_sales ASC;

-------------------------------------------------------------------------------------------------------------------

-- 3. Consider car sales price ranges every 10 thousand reais. Which range sold the most cars? How many?

-- SQL query that checks how many vehicles were sold per range
-- Selects the sum of vehicle quantities that meet the conditions of each range
-- Creates a column for each range in ascending order
-- Works based on conditions, where if met, they will fall into the respective range
-- If the conditions are not met, the query adds 0 to the sum

SELECT
    SUM(CASE WHEN valor_do_veiculo BETWEEN 0 AND 10000 THEN vendas ELSE 0 END) AS Range_0_10000,
    SUM(CASE WHEN valor_do_veiculo BETWEEN 10000 AND 20000 THEN vendas ELSE 0 END) AS Range_10000_20000,
    SUM(CASE WHEN valor_do_veiculo BETWEEN 20000 AND 30000 THEN vendas ELSE 0 END) AS Range_20000_30000,
    SUM(CASE WHEN valor_do_veiculo BETWEEN 30000 AND 40000 THEN vendas ELSE 0 END) AS Range_30000_40000,
    SUM(CASE WHEN valor_do_veiculo BETWEEN 40000 AND 50000 THEN vendas ELSE 0 END) AS Range_40000_50000,
    SUM(CASE WHEN valor_do_veiculo BETWEEN 50000 AND 60000 THEN vendas ELSE 0 END) AS Range_50000_60000,
    SUM(CASE WHEN valor_do_veiculo BETWEEN 60000 AND 70000 THEN vendas ELSE 0 END) AS Range_60000_70000,
    SUM(CASE WHEN valor_do_veiculo BETWEEN 70000 AND 80000 THEN vendas ELSE 0 END) AS Range_70000_80000,
    SUM(CASE WHEN valor_do_veiculo BETWEEN 80000 AND 90000 THEN vendas ELSE 0 END) AS Range_80000_90000,
    SUM(CASE WHEN valor_do_veiculo BETWEEN 90000 AND 100000 THEN vendas ELSE 0 END) AS Range_90000_100000,
    SUM(CASE WHEN valor_do_veiculo BETWEEN 100000 AND 110000 THEN vendas ELSE 0 END) AS Range_100000_110000
FROM working_database1;

-------------------------------------------------------------------------------------------------------------------

-- 4. What is the revenue of the 3 brands that have the lowest average ticket?

-- SQL query that checks the 3 lowest average tickets and their respective brands;
-- Selects the sum of the multiplication of sales by their respective vehicle values,
-- Divides by the sum of the total number of sales for each brand and creates a new column (average_ticket)
-- Selects the dm.marca (brand) column
-- Groups the query results by brand
-- Orders the results of the average_ticket column in ascending order
-- Limits the query to 3 results

SELECT SUM(dt.vendas * dt.valor_do_veiculo) / SUM(dt.vendas) AS average_ticket, dm.marca
FROM working_database1 as dt
INNER JOIN working_database2 as dm on dt.id_marca_ = dm.id_marca
GROUP BY dm.marca
ORDER BY average_ticket ASC
LIMIT 3;

-------------------------------------------------------------------------------------------------------------------

-- 5. Is there any relationship between the best-selling vehicles?

-- SQL query that shows the best-selling car models and their respective brands;
-- Selects the sum of sales and creates a new column total_vehicle
-- Selects the columns dt.name, dm.brand, dt.vehicle_value
-- Groups the query results by dm.brand, dt.name (added dt.name to group by for specific vehicle models)
-- Orders the results of the total_vehicle column in descending order
-- Limits the query to 3 results

SELECT SUM(dt.vendas) AS total_vehicle, dt.nome, dm.marca, dt.valor_do_veiculo
FROM working_database1 AS dt
INNER JOIN working_database2 as dm on dt.id_marca_ = dm.id_marca
GROUP BY dm.marca, dt.nome, dt.valor_do_veiculo -- Added dt.valor_do_veiculo to GROUP BY if it's in SELECT
ORDER BY total_vehicle DESC
LIMIT 3;