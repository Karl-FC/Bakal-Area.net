//MGA VARIABLESSSSSSSS (sana tama)
var E = parseFloat(document.getElementById("ModulusE").value);
    console.log("bf/tf is " + F_Lamda)
var Fy = document.getElementById("YieldStrength").value;
    console.log("bf/tf is " + F_Lamda)
var Ag = document.getElementById("AreaGross").value;
        console.log("bf/tf is " + F_Lamda)

//var rx = document.getElementById("RadiusGX").value;
//var ry = document.getElementById("RadiusGY").value;

var F_Lamda = 5.86
    console.log("bf/tf is " + F_Lamda)

var W_Lamda = 14.8
    console.log("h/tw is " + W_Lamda)


//FORMULA flange//
    console.log("Checking if Flange is Compact, noncompact, or slender")
var F_lamdaP = 0.38 * Math.sqrt(E / Fy)
    console.log("Flange Lamda P is " + F_lamdaP)
var F_lamdaR = 1.0 * Math.sqrt(E / Fy)
    console.log("Flange Lamda R is " + F_lamdaR)

// Check flange and log the result
if (F_Lamda < F_lamdaP) {
    console.log("The flange is Compact.");
    flangeStatus = "The flange is compact";
} else if (F_Lamda >= F_lamdaP && F_Lamda < F_lamdaR) {
    console.log("The flange is Noncompact.");
    flangeStatus = "The flange is noncompact";
} else if (F_Lamda >= F_lamdaR) {
    console.log("The flange is Slender.");
    flangeStatus = "The flange is slender";
}


//FORMULA Web//
    console.log("Checking if Web is Compact, noncompact, or slender")
var W_lamdaP = 3.76 * Math.sqrt(E / Fy)
    console.log("Web Lamda P is " + W_lamdaP);
var W_lamdaR = 5.70 * Math.sqrt(E / Fy)
    console.log("Web Lamda R is " + W_lamdaR);



// Check web and log the result
if (W_Lamda < W_lamdaP) {
    console.log("The web is Compact.");
    WebStatus = "The web is compact";
} else if (W_Lamda >= W_lamdaP && W_Lamda < W_lamdaR) {
    console.log("The web is Noncompact.");
    WebStatus = "The web is noncompact";
} else if (W_Lamda >= W_lamdaR) {
    console.log("The web is Slender.");
    WebStatus = "The web is slender.";
}
    
// Update the blockquote element
document.getElementById("ResultCompactnessFlange").textContent = flangeStatus;
// Update the blockquote element
document.getElementById("ResultCompactnessWeb").textContent = WebStatus;





  /*  const XLSX = require('xlsx');

    function readCell(filename, sheetName, cellNumber) {

      // Load the workbook
      const workbook = XLSX.readFile(filename);
      
      // Get the worksheet
      const worksheet = workbook.Sheets[sheetName];
      
      // Read the cell value
      const cellValue = worksheet[cellNumber].v;
      
      console.log(`The value in cell ${cellNumber} is: ${cellValue}`);
    }
    
    // Usage
    const filename = 'ColumnAnalysis.js';
    const sheetName = 'Database v15.0'; // Replace with your actual sheet name
    const cellValue = worksheet?.['E2']?.v; // Replace with the actual cell number
    readCell(filename, sheetName, cellValue);
    */
   