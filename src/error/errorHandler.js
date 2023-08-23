import errors from "./errors.js";

export function customError(code) {
  return errors[code] || "Error desconocido";
}