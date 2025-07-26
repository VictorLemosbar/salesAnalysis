// Global variable to store the information present in broken_database2.json
var consulta = ""

// Global variable to store fs (file system) functions
var fs = require('fs')

// Function that loads the data present in the broken_database1.json file
function loadData() {

  // Try block to monitor the code related to loadData()
  try {

    // Constant used to store the flexible path where the broken database is located
    const databasePath = ('../bancosQuebrados/broken_database_2.json');
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
      let brandValue = espelho.marca // Assuming 'marca' (brand) is the column to be corrected in this file

      // If method checks if the 'brandValue' variable is an empty string
      if (brandValue) {

        // This code block executes if 'brandValue' is not empty
        // 'brandValue' is altered using the replace method to substitute "ø" characters with "o"
        brandValue = brandValue.replace(/ø/g, "o")
        // 'brandValue' is altered using the replace method to substitute "æ" characters with "a"
        brandValue = brandValue.replace(/æ/g, "a")

        // Displays a message with the altered value
        console.log(brandValue + " corrected successfully!! ")

      }

      // Assigns the modifications made in the 'brandValue' variable to the 'espelho'
      espelho.marca = brandValue
      // Displays the modified 'espelho' in json format in the console
      console.log(espelho)
      // Space between messages
      console.log("")
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
modifyNamesData()

// Creates the createJSONFile() function to format the corrected data and create a json file in the 'bancosCorrigidos' folder
function createJSONFile() {

  // Try block to monitor the code related to createJSONFile()
  try {

    // Constant that ensures the assignment of the global 'consulta' variable, which was modified by the functions
    // It has null and value 2 as json formatting parameters (for pretty printing)
    const json = JSON.stringify(consulta, null, 2)

    // Variable that flexibly stores the path to the file
    var outputPath = "../BancosCorrigidos/working_database2.json"

    // If method checks if the json is not empty
    if (json) {

      // This code block executes if the condition is true
      // Creates a constant 'writeFile' and assigns the functionalities of fs, in this case fs.writeFileSync
      // fs.writeFileSync writes a file synchronously using the file path and the 'json' constant as parameters
      const writeFile = fs.writeFileSync(outputPath, json)

    }
  }

  // Catch block to receive the exception
  catch (err) {

    // Message if an exception was identified
    console.error("The following error occurred: ", err)
  }
}

// Executes the function and creates the working_database2.json file with the alterations and corrections made
createJSONFile()