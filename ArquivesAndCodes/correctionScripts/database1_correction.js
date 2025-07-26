// Global variable to store the information present in broken_database1.json
var consulta = ""

// Global variable to store fs (file system) functions
var fs = require('fs')

// Function that loads the data present in the broken_database1.json file
function loadData() {

  // Try block to monitor the code related to loadData()
  try {

    // Constant used to store the path where the broken database is located
    // In this case, this path is flexible
    const databasePath = ('../bancosQuebrados/broken_database_1.json');
    // The require function exports the file, being assigned to the global 'consulta' variable
    consulta = require(databasePath)
  }

  // Catch block to receive the exception
  catch (err) {

    // Message if an exception was identified
    console.error("The following error occurred: ", err)
  }
}

// Executes the loadData() function
loadData();

// Creates the modifyNamesData() function that corrects formatting errors related to the 'name' column
function modifyNamesData() {

  // Try block to monitor the code related to modifyNamesData()
  try {

    // Constant that modifies the global 'consulta' variable
    // Through the map function, a new version of the json is created for alterations, called 'espelho' (mirror)
    const nameCorrection = consulta.map(espelho => {

      // Creates the 'valorNomes' (nameValue) variable to assign the 'espelho'
      // The 'name' column is selected within the 'espelho'
      let nameValue = espelho.nome

      // If method to execute the code
      if (nameValue) {

        // This code block executes if nameValue is not empty
        // nameValue is altered using the replace method to substitute "ø" characters with "o"
        nameValue = nameValue.replace(/ø/g, "o")
        // nameValue is altered using the replace method to substitute "æ" characters with "a"
        nameValue = nameValue.replace(/æ/g, "a")

        // Displays a message with the altered value
        console.log(nameValue + " corrected successfully!! ")
      }

      // Assigns the modifications made in the 'nameValue' variable to the 'espelho'
      espelho.nome = nameValue
      // Displays the modified 'espelho' in json format in the console
      console.log(espelho)
      // Returns the 'espelho'
      return espelho

    })
  }

  // Catch block to receive the exception
  catch (err) {

    // Message if an exception was identified
    console.error("The following error occurred: ", err)
  }
}

// Executes the modifyNamesData() function
modifyNamesData();

// Creates the modifyStringToIntData() function that corrects formatting errors related to the 'sales' column
function modifyStringToIntData() {

  // Try block to monitor the code related to modifyStringToIntData()
  try {

    // Constant with the parameters of the global 'consulta' variable
    // Through the map function, a new version of the json is created for alterations, called 'espelho' (mirror)
    const salesCorrection = consulta.map(espelho => {

      // Creates the 'valorVendas' (salesValue) variable to assign the 'espelho'
      // The 'sales' column is selected within the 'espelho'
      let salesValue = espelho.vendas

      // If method to execute the code
      if (salesValue) {

        // This code block executes if salesValue is not empty
        // salesValue is altered by transforming all values present in salesValue to an Integer
        salesValue = parseInt(salesValue)
      }

      // Assigns the modifications made in the 'salesValue' variable to the 'espelho'
      espelho.vendas = salesValue
      // Returns the 'espelho'
      return espelho
    })
  }

  // Catch block to receive the exception
  catch (err) {

    // Message if an exception was identified
    console.error("The following error occurred: ", err)
  }
}

// Executes the modifyStringToIntData() function
modifyStringToIntData();

// Creates the createJSONFile() function to format the corrected data and create a json file in the 'bancosCorrigidos' folder
function createJSONFile() {

  // Try block to monitor the code related to createJSONFile()
  try {

    // Constant that ensures the assignment of the global 'consulta' variable, which was modified by the functions
    // It has null and value 2 as json formatting parameters (for pretty printing)
    const json = JSON.stringify(consulta, null, 2)

    var outputPath = "../BancosCorrigidos/working_database1.json"

    // If method to execute the code
    if (json) {

      // This code block executes if the condition is true
      // Creates a constant 'writeFile' and assigns the functionalities of fs, in this case fs.writeFileSync
      // fs.writeFileSync writes a file synchronously using the new file's name and the 'json' constant as parameters
      const writeFile = fs.writeFileSync(outputPath, json)
    }
  }

  // Catch block to receive the exception
  catch (err) {

    // Message if an exception was identified
    console.error("The following error occurred: ", err)
  }
}

// Executes the function and creates the working_database1.json file with the alterations and corrections made
createJSONFile()

// Function to perform all steps: load data, modify names, modify sales to integer, and create the JSON file
function doAll() {
  loadData()
  modifyNamesData()
  modifyStringToIntData()
  createJSONFile()
}