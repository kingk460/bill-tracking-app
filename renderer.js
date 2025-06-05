

let billList = [];

window.onload = function () {
  const button = document.getElementById("addBillButton");
  const clearButton = document.getElementById("clearBills");
  const billName = document.getElementById("billName");
  const billAmount = document.getElementById("billAmount");
  const billDate = document.getElementById("billdate");
  const billType = document.getElementById("billType");
  const textArea = document.getElementById("textArea");

  function reset() {

      billName.value = "";
      billAmount.value = "";
      billDate.value = "";
      billType.value = "";
  }


  clearButton.addEventListener("click", async () => {
     
    const jsonString = JSON.stringify(billList, null, 2);
    const result = await window.electronAPI.clearJsonFile();
    if (result.success) {
      alert('JSON file cleared successfully.');
    } else {
      alert('Failed to clear JSON file: ' + result.error);
    }
    textArea.value = "";
    });
  


  button.addEventListener("click", async () => {
  const bill = billName.value + " " + billAmount.value + "$" + " " + "due" + " "  + billDate.value + " " + billType.value;
  billList.push(bill);
  textArea.value = billList.join('\n');

//   // fs module code 
//   fs.writeFile(filePath, '', (err) => {
//   if (err) {
//     console.error('Error clearing JSON file:', err);
//   } else {
//     console.log('JSON file cleared successfully.');
//   }
// });

// // 5. Convert the array to a JSON string
const jsonString = JSON.stringify(billList, null, 2); // Use 2 for indentation
const result = await window.electronAPI.saveJsonToFile(jsonString);
  if (result.success) {
    alert('List saved to data.json!');
  } else {
    alert('Failed to save: ' + result.error);
  }

// // 6. Write the string to the file
// fs.writeFile(filePath, jsonString, 'utf8', (err) => { // Use 'utf8' encoding
//   if (err) {
//     console.error('Error writing to file:', err); // Log any errors
//   } else {
//     console.log('Data written to file successfully!'); // Success message
//   }
// });

  reset();
  });
};


// add a  button to check if the bill is due monthly if checked yes, add a fucntion that displays bill each monthy, you will need to incorporate date checking 

// the code bwlow is code snippets for the file save system 



// to see the logsin hr render process use crtl + shift + i 



