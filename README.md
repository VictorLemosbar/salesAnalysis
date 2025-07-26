<h2>Project Basics</h2>

<p>The premise is the correction of two Json files with errors</p>



## Tecnologies 

* JavaScript/NodeJS

* SQL/SQLOnline

* Power BI

* Json



<h2>Folder Structure</h2>

bancosCorrigidos (Corrected Databases): After corrections are made, new JSON format databases will be created or modified here. In this case, the saved files are working_database1 and working_database2.



bancosQuebrados (Broken Databases): This folder is responsible for storing the JSON files with errors, in this case, broken_database1 and broken_database2.



comandosSQL (SQL Commands): In this folder, we have the SQL commands used to join the corrected databases into a CSV file, and the codes referring to the queries made to answer the questions, along with their explanations and documentation.



scriptsCorreção (Correction Scripts): In this folder, we have the scripts that were used to correct the broken databases, along with their explanations and documentation.



working_databaseJOIN.csv: CSV file created after joining the two tables.



Análise de Vendas - Power BI.pbfix (Sales Analysis - Power BI.pbfix): Analysis of the generated CSV file.



## Json Files

* broken_database1.json

* broken_database2.json

* working_database1.json

* working_database2.json



## Corrections Scripts

* database1_correction.js

* database2_correction.js



## SQL Commands

* comands.sql



<h2>How to execute</h2>

<p>First open the folder .../correctionscripts/database1_correction.js</p>
