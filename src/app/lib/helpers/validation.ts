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
    if (!fields[key]) {
      missingFields.push(key);
    }
  }
  return missingFields;
}

// Add more validators as needed
