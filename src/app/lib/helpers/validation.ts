// src/lib/helpers/validation.ts

export function validateNumber(value: any, fieldName: string): number {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`${fieldName} must be a valid number.`);
  }
  return num;
}

export function validateRequired(fields: Record<string, any>): string[] {
  const missingFields: string[] = [];
  for (const key in fields) {
    // Checks for undefined, null, empty string, or false boolean
    if (
      fields[key] === undefined ||
      fields[key] === null ||
      (typeof fields[key] === "string" && fields[key].trim() === "") 
    ) {
      missingFields.push(key);
    }
  }
  return missingFields;
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateMinLength(value: string, minLength: number, fieldName: string): void {
  if (value.length < minLength) {
    throw new Error(`${fieldName} must be at least ${minLength} characters long.`);
  }
}

export function validateMaxLength(value: string, maxLength: number, fieldName: string): void {
  if (value.length > maxLength) {
    throw new Error(`${fieldName} cannot be longer than ${maxLength} characters.`);
  }
}

export function validateInEnum<T>(value: any, validValues: T[], fieldName: string): void {
  if (!validValues.includes(value)) {
    throw new Error(`${fieldName} must be one of: ${validValues.join(", ")}`);
  }
}

// Add more validators as needed
