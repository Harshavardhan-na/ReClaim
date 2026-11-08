/**
 * ReClaim University Authentication Configuration
 *
 * STUDENTS:
 * - Must register using their @vitap.ac.in email.
 *
 * ADMINISTRATORS:
 * - Created separately by authorized administrators in AWS Cognito.
 * - Can use their registered email address, including Gmail.
 * - Admin privileges are determined ONLY by the Cognito "Admin" group.
 */

export const AUTH_EMAIL_CONFIG = {
  studentEmailPattern: /^[a-zA-Z0-9._-]+@vitap\.ac\.in$/i,
  universityDomain: "@vitap.ac.in",
};

/**
 * Identifies a registration account type.
 * Public registration is restricted to students.
 */
export function identifyAccountType(email) {
  if (!email || typeof email !== "string") return null;

  const trimmed = email.trim().toLowerCase();

  return AUTH_EMAIL_CONFIG.studentEmailPattern.test(trimmed)
    ? "student"
    : null;
}

/**
 * Validates student registration email.
 * Admin accounts are created separately in Cognito.
 */
export function validateUniversityEmail(email) {
  if (!email || typeof email !== "string") {
    return {
      isValid: false,
      accountType: null,
      message: "University email address is required.",
    };
  }

  const trimmed = email.trim().toLowerCase();
  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!basicEmailRegex.test(trimmed)) {
    return {
      isValid: false,
      accountType: null,
      message: "Please enter a valid email address.",
    };
  }

  if (!AUTH_EMAIL_CONFIG.studentEmailPattern.test(trimmed)) {
    return {
      isValid: false,
      accountType: null,
      message: "Student registration requires a valid @vitap.ac.in email address.",
    };
  }

  return {
    isValid: true,
    accountType: "student",
    message: "",
  };
}