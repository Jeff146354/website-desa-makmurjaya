/**
 * Property-based tests for validateKontakForm
 * Validates: Requirements 9.5
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { validateKontakForm, type KontakFormData } from './form';

// Arbitrary for whitespace-only strings (empty or contains only whitespace)
const whitespaceOnlyArb = fc.stringOf(
  fc.constantFrom(' ', '\t', '\n', '\r', ''),
);

// Arbitrary for valid non-empty strings (trimmed, at least 1 visible char)
const nonEmptyStringArb = fc
  .string({ minLength: 1 })
  .filter((s) => s.trim().length > 0);

// Arbitrary for valid email patterns
const validEmailArb = fc
  .tuple(
    fc.string({ minLength: 1 }).filter((s) => /^[^\s@]+$/.test(s)),
    fc.string({ minLength: 1 }).filter((s) => /^[^\s@]+$/.test(s)),
    fc.string({ minLength: 2 }).filter((s) => /^[^\s@]+$/.test(s)),
  )
  .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

// Arbitrary for a fully valid KontakFormData
const validFormDataArb = fc
  .tuple(nonEmptyStringArb, validEmailArb, nonEmptyStringArb, nonEmptyStringArb)
  .map(
    ([nama, email, subjek, pesan]): KontakFormData => ({
      nama,
      email,
      subjek,
      pesan,
    }),
  );

const requiredFields: (keyof KontakFormData)[] = [
  'nama',
  'email',
  'subjek',
  'pesan',
];

describe('validateKontakForm — Property-Based Tests', () => {
  /**
   * Property 1: Empty/whitespace-only fields always produce validation failure
   * **Validates: Requirements 9.5**
   */
  it('should fail validation when any single required field is empty/whitespace-only', () => {
    for (const field of requiredFields) {
      fc.assert(
        fc.property(validFormDataArb, whitespaceOnlyArb, (validData, ws) => {
          const data: KontakFormData = { ...validData, [field]: ws };
          const result = validateKontakForm(data);

          expect(result.valid).toBe(false);
          expect(result.errors.length).toBeGreaterThan(0);
          expect(result.errors.some((e) => e.field === field)).toBe(true);
        }),
        { numRuns: 50 },
      );
    }
  });

  /**
   * Property 2: All fields empty always fails with errors for all 4 fields
   * **Validates: Requirements 9.5**
   */
  it('should return errors for all 4 required fields when all are empty/whitespace', () => {
    fc.assert(
      fc.property(
        whitespaceOnlyArb,
        whitespaceOnlyArb,
        whitespaceOnlyArb,
        whitespaceOnlyArb,
        (nama, email, subjek, pesan) => {
          const data: KontakFormData = { nama, email, subjek, pesan };
          const result = validateKontakForm(data);

          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(4);

          const errorFields = result.errors.map((e) => e.field);
          for (const field of requiredFields) {
            expect(errorFields).toContain(field);
          }
        },
      ),
      { numRuns: 50 },
    );
  });

  /**
   * Property 3: Valid data always passes
   * **Validates: Requirements 9.5**
   */
  it('should pass validation when all fields contain valid non-empty data', () => {
    fc.assert(
      fc.property(validFormDataArb, (data) => {
        const result = validateKontakForm(data);

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }),
      { numRuns: 100 },
    );
  });

  /**
   * Property 4: Error identification is accurate — empty/whitespace field is always identified
   * **Validates: Requirements 9.5**
   */
  it('should accurately identify which specific field is invalid', () => {
    for (const field of requiredFields) {
      fc.assert(
        fc.property(validFormDataArb, whitespaceOnlyArb, (validData, ws) => {
          const data: KontakFormData = { ...validData, [field]: ws };
          const result = validateKontakForm(data);

          // The specific invalid field must appear in errors
          const fieldError = result.errors.find((e) => e.field === field);
          expect(fieldError).toBeDefined();
          expect(fieldError!.field).toBe(field);
          expect(fieldError!.message).toBeTruthy();
        }),
        { numRuns: 50 },
      );
    }
  });
});
