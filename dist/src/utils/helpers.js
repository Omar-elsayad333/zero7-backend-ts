"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValuesInBody = void 0;
// Function to set values at nested paths in the body object
function setValuesInBody(body, fields, values) {
    // Iterate through each field and value
    fields.forEach((field, index) => {
        // Split the field string to get the keys
        const keys = field.fieldname.split('[').map((key) => key.replace(']', ''));
        let current = body;
        // Traverse the body object according to the keys
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (!current[key]) {
                // If the current key doesn't exist, create an empty object/array
                current[key] = isNaN(parseInt(keys[i + 1])) ? {} : [];
            }
            if (i === keys.length - 1) {
                // If it's the last key in the path, set the corresponding value
                current[key] = values[index];
            }
            else {
                // Move to the next nested object/array
                current = current[key];
            }
        }
    });
}
exports.setValuesInBody = setValuesInBody;
