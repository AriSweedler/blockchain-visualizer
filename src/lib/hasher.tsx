import CryptoJS from "crypto-js";

/**
 * Hashes a given JavaScript object using the specified hashing algorithm.
 *
 * @param {Object} obj - The object to be hashed.
 * @param {string} algorithm - The hashing algorithm to use (e.g., 'SHA-256', 'SHA-1', 'MD5').
 * @returns {string} - The resulting hash in hexadecimal format.
 */
export default function hash(obj, algorithm = "SHA-256") {
  const jsonString = JSON.stringify(obj, Object.keys(obj).sort());

  let hash;
  switch (algorithm) {
    case "SHA-256":
      hash = CryptoJS.SHA256(jsonString);
      break;
    case "SHA-1":
      hash = CryptoJS.SHA1(jsonString);
      break;
    case "MD5":
      hash = CryptoJS.MD5(jsonString);
      break;
    default:
      throw new Error("Unsupported algorithm");
  }

  return hash.toString(CryptoJS.enc.Hex);
}
