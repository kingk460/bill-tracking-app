window.onload = function () {
  const button = document.getElementById("addBillButton");
  const clearButton = document.getElementById("clearBills");
  const billName = document.getElementById("billName");
  const billAmount = document.getElementById("billAmount");
  const billDate = document.getElementById("billdate");
  const billType = document.getElementById("billType");
  const textArea = document.getElementById("textArea");
  const checkBill = document.getElementById("checkBills");
  const dateList = [];
  const billList = [];

  function reset() {
    billName.value = "";
    billAmount.value = "";
    billDate.value = "";
    billType.value = "";
    billList.length = 0; // Clear the billList array
    dateList.length = 0; // Clear the dateList array
  }

  clearButton.addEventListener("click", async () => {
    const jsonString = JSON.stringify(billList, null, 2);
    const result = await window.electronAPI.clearJsonFile();
    if (result.success) {
      alert("Content claeared from app memory.");
    } else {
      alert("Failed to clear JSON file: " + result.error);
    }
    textArea.value = "";
  });

  button.addEventListener("click", async () => {
    const bill =
      billName.value +
      " " +
      billAmount.value +
      "$" +
      " " +
      "due" +
      " " +
      billDate.value +
      " " +
      "Type:" +
      " " +
      billType.value;
    billList.push(bill);
    dateList.push(billDate.value);
    textArea.value = billList.join("\n");

    // Convert the array to a JSON string
    const jsonString = JSON.stringify(billList, null, 2); // Use 2 for indentation
    const result = await window.electronAPI.saveJsonToFile(jsonString);
    if (result.success) {
      alert("Content saved to app memory");
    } else {
      alert("Failed to save: " + result.error);
    }

    reset();
    billLogic();
  });

  checkBill.addEventListener("click", () => {
    billLogic();
  });

  // to see the logsin hr render process use crtl + shift + i

  // bill alert logic

  function billLogic() {
    for (let i = 0; i < dateList.length; i++) {
      const currentDate = new Date();
      const billDate = new Date(dateList[i]);

      // Check if the bill is due this month
      if (
        billDate.getMonth() === currentDate.getMonth() &&
        billDate.getFullYear() === currentDate.getFullYear()
      ) {
        alert(`Bill due this month: ${billList[i]}`);
      }
    }
  }
};
