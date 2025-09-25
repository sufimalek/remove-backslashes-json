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

function decodeUnicode(str) {
    return str.replace(/\\u[\dA-Fa-f]{4}/g, match =>
        String.fromCharCode(parseInt(match.slice(2), 16))
    );
}

// Recursively parse JSON strings and decode Unicode
function decodeNestedJSON(data) {
    if (typeof data === "string") {
        // Try to parse JSON
        try {
            const parsed = JSON.parse(data);
            return decodeNestedJSON(parsed); // recurse
        } catch (e) {
            // Not JSON, just decode Unicode
            return decodeUnicode(data);
        }
    } else if (Array.isArray(data)) {
        return data.map(decodeNestedJSON);
    } else if (typeof data === "object" && data !== null) {
        const result = {};
        for (const key in data) {
            result[key] = decodeNestedJSON(data[key]);
        }
        return result;
    } else {
        // number, boolean, null
        return data;
    }
}

function removeBackslashes() {
    const inputBox = document.getElementById("inputBox");
    const outputBox = document.getElementById("outputBox");
    const inputData = inputBox.value;

    try {
        const parsed = JSON.parse(inputData);         // Parse top-level JSON
        const decoded = decodeNestedJSON(parsed);     // Recursively decode
        outputBox.value = JSON.stringify(decoded, null, 2); // Pretty-print
    } catch (error) {
        outputBox.value = "Error decoding input: " + error.message;
    }
}
