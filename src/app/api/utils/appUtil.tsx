export const getCurrentActiveAccount = async () => {
    if (localStorage.getItem("privy:connections") === null) return;
    try {
        const address: any = localStorage.getItem("privy:connections");
        return JSON.parse(address)
    } catch (error) {
        console.log("Error getting your wallet!")
    }
    return ""
}

export const checkActiveAccount = () => {
    const value = localStorage.getItem("privy:connections");
    if (value === null) {
        // Key doesn't exist in localStorage
        return false;
    }
    try {
        // Try parsing the value as JSON
        const parsedValue = JSON.parse(value);
        return Array.isArray(parsedValue) && parsedValue.length === 0;
    } catch (error) {
        // Unable to parse value as JSON
        console.error("Error parsing value:", error);
        return false;
    }
}

