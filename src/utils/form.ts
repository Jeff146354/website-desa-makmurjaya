/**
 * Form validation utilities for contact form.
 * Extracted for testability.
 */

export interface KontakFormData {
  nama: string;
  email: string;
  subjek: string;
  pesan: string;
}

export interface ValidationError {
  field: keyof KontakFormData;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validates contact form data.
 * Returns validation result indicating which fields are invalid and why.
 */
export function validateKontakForm(data: KontakFormData): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate nama
  if (!data.nama || data.nama.trim() === '') {
    errors.push({ field: 'nama', message: 'Nama wajib diisi' });
  }

  // Validate email
  if (!data.email || data.email.trim() === '') {
    errors.push({ field: 'email', message: 'Email wajib diisi' });
  } else if (!isValidEmail(data.email.trim())) {
    errors.push({ field: 'email', message: 'Format email tidak valid' });
  }

  // Validate subjek
  if (!data.subjek || data.subjek.trim() === '') {
    errors.push({ field: 'subjek', message: 'Subjek wajib diisi' });
  }

  // Validate pesan
  if (!data.pesan || data.pesan.trim() === '') {
    errors.push({ field: 'pesan', message: 'Pesan wajib diisi' });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Basic email validation using a standard regex pattern.
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
