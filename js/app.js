function removeBackslashes() {
    const inputBox = document.getElementById("inputBox");
    const outputBox = document.getElementById("outputBox");
    const inputData = inputBox.value;

    try {
        const parsedData = JSON.parse(inputData.replace(/\\/g, ""));
        outputBox.value = JSON.stringify(parsedData, null, 2);
    } catch (error) {
        outputBox.value = "Invalid JSON data";
    }
}
function beautifyJSON() {
    const inputText = document.getElementById('outputBox').value;
    try {
        const parsedJSON = JSON.parse(inputText);
        const beautifiedJSON = JSON.stringify(parsedJSON, null, 2);
        document.getElementById('outputBox').value = beautifiedJSON;
    } catch (error) {
        document.getElementById('outputBox').value = "Invalid JSON input.";
    }
}