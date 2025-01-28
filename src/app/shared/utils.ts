export default class Utils {
    static readonly sanitizingExp: RegExp = /(\[|\]|,|\(|\)|<|>|\{|\}|;|\\|\/|\"|\'|\s+)/g;

    // ===================================================
    // generateId
    // ---------------------------------------------------
    // Returns: randomly generated GUID string.
    // ===================================================
    static generateId() {
        const timestamp = new Date().getTime();
        const randomNum = Math.floor(Math.random() * 1000000);
        return `${timestamp}-${randomNum}`;
    }

    // ===================================================
    // getUrlFromString
    // ---------------------------------------------------
    // Converts a string to a URL.
    // Returns: URL object if valid, otherwise null.
    // ===================================================
    static getUrlFromString(urlString: string) {
        try {
            const url = new URL(urlString);
            return url;
        } catch (error) {
            console.error("Invalid URL:", error);
            return null;
        }
    }

    // ===================================================
    // sanitizeInput
    // ---------------------------------------------------
    // Removes unwanted characters from the query text and
    //  condenses whitespace to a single character.
    // ===================================================
    static sanitizeInput(input: string) : string {
        return input.replace(this.sanitizingExp, " ")
                    .split(" ")
                    .filter((c: string) => c !== "")
                    .join(" ");
    }

    // ===================================================
    // getWords
    // ---------------------------------------------------
    // Returns the first n words of the input string.
    // ===================================================
    static getWords(input: string, n: number) : string {
        const words = input.split(" ");
        return words.slice(0, Math.min(words.length, n)).join(" ");
    }
}