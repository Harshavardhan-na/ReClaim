import {
  signUp,
  signIn,
  signOut,
  fetchAuthSession,
  getCurrentUser,
} from "aws-amplify/auth";

import { validateUniversityEmail } from "../config/authConfig";

// BUILD USER FROM COGNITO INFORMATION
function buildUser(payload, userId) {
  const email = (payload.email || "").toLowerCase();

  // Normalize Cognito groups
  let groups = payload["cognito:groups"] || [];

  if (typeof groups === "string") {
    try {
      groups = JSON.parse(groups);
    } catch {
      groups = [groups];
    }
  }

  if (!Array.isArray(groups)) {
    groups = [];
  }

  // Admin privileges come ONLY from Cognito Admin group
  const isAdmin = groups.includes("Admin");

  return {
    id: userId,
    name: payload.name || email.split("@")[0],
    email,
    role: isAdmin ? "admin" : "student",
    groups,
    regNumber: email.split("@")[0].toUpperCase(),
    campus: "VIT-AP University",
    department: isAdmin
      ? "Campus Administration"
      : "Undergraduate Studies",
  };
}

// GET AUTHENTICATED USER INFORMATION
async function getAuthenticatedUser() {
  const session = await fetchAuthSession();

  const payload = session.tokens?.idToken?.payload;

  if (!payload) {
    throw new Error("Unable to retrieve your account information.");
  }

  // DEBUG: Check Cognito Admin group
  console.log(
    "COGNITO ID TOKEN GROUPS:",
    payload["cognito:groups"]
  );

  console.log(
    "COGNITO GROUPS TYPE:",
    typeof payload["cognito:groups"]
  );

  // Retrieve actual Cognito user ID
  const currentUser = await getCurrentUser();

  const user = buildUser(payload, currentUser.userId);

  localStorage.setItem(
    "reclaim_auth_session",
    JSON.stringify(user)
  );

  return {
    user,
    token: session.tokens.idToken.toString(),
  };
}
// LOGIN
export async function authenticate({ email, password }) {
  const username = (email || "").trim().toLowerCase();

  if (!username || !password) {
    throw new Error("Please enter your email and password.");
  }

  const result = await signIn({
    username,
    password,
  });

  if (!result.isSignedIn) {
    throw new Error(
      `Login requires an additional step: ${result.nextStep.signInStep}.`
    );
  }

  return getAuthenticatedUser();
}

// STUDENT REGISTRATION
export async function registerAccount({
  fullName,
  email,
  password,
}) {
  const trimmedName = (fullName || "").trim();
  const trimmedEmail = (email || "").trim().toLowerCase();

  if (!trimmedName) {
    throw new Error("Please enter your full name.");
  }

  if (!password || password.length < 8) {
    throw new Error(
      "Password must contain at least 8 characters."
    );
  }

  // Validate VIT-AP student email
  const validation = validateUniversityEmail(trimmedEmail);

  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const result = await signUp({
    username: trimmedEmail,
    password,
    options: {
      userAttributes: {
        email: trimmedEmail,
        name: trimmedName,
      },
    },
  });

  if (result.nextStep.signUpStep !== "DONE") {
    throw new Error(
      "Account confirmation is pending. Please contact the administrator."
    );
  }

  // Automatically sign in after successful registration
  return authenticate({
    email: trimmedEmail,
    password,
  });
}

// LOGOUT
export async function logout() {
  await signOut();

  localStorage.removeItem("reclaim_auth_session");
  localStorage.removeItem("reclaim_auth_token");
}

// RESTORE EXISTING SESSION
export async function getActiveSession() {
  try {
    const session = await fetchAuthSession();

    const payload = session.tokens?.idToken?.payload;

    if (!payload) {
      return null;
    }

    const currentUser = await getCurrentUser();

    const user = buildUser(
      payload,
      currentUser.userId
    );

    localStorage.setItem(
      "reclaim_auth_session",
      JSON.stringify(user)
    );

    return user;

  } catch (error) {
    console.error("Session restoration failed:", error);

    return null;
  }
}