/**
 * ReClaim API Service
 *
 * AWS Services:
 * - Amazon Cognito: Authentication
 * - Amazon API Gateway: HTTP API
 * - AWS Lambda: Backend
 * - Amazon DynamoDB: Item storage
 * - Amazon S3: Private image storage
 */

import { fetchAuthSession } from "aws-amplify/auth";

// ==================================================
// CONFIGURATION
// ==================================================

const API_BASE_URL = (
  import.meta.env.VITE_API_GATEWAY_BASE_URL || ""
).replace(/\/$/, "");

const USE_AWS_BACKEND =
  import.meta.env.VITE_USE_AWS_BACKEND === "true";


// ==================================================
// COMMON API REQUEST
// ==================================================

async function request(endpoint, options = {}) {

  if (!API_BASE_URL) {
    throw new Error("API Gateway URL is not configured.");
  }

  // Get Cognito authentication session
  const session = await fetchAuthSession();

  const token = session.tokens?.idToken?.toString();

  if (!token) {
    throw new Error("Please log in to continue.");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    ...(options.body
      ? { "Content-Type": "application/json" }
      : {}),
    ...options.headers,
  };

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message ||
      `API request failed with status ${response.status}`
    );
  }

  return result;
}


// ==================================================
// ITEMS API
// ==================================================

/**
 * GET /items
 * Fetch all items from DynamoDB.
 */

export async function getItems(params = {}) {

  if (!USE_AWS_BACKEND) {
    return null;
  }

  const query = new URLSearchParams(params).toString();

  const result = await request(
    `/items${query ? `?${query}` : ""}`
  );

  return (result.items || []).map(mapItem);
}


/**
 * GET /items/{id}
 * Fetch one item.
 */

export async function getItemById(id) {

  if (!USE_AWS_BACKEND) {
    return null;
  }

  const result = await request(
    `/items/${encodeURIComponent(id)}`
  );

  return result.item ? mapItem(result.item) : null;
}


/**
 * POST /items
 * Create a new item.
 */

export async function createItem(itemData) {

  if (!USE_AWS_BACKEND) {
    return null;
  }

  const result = await request("/items", {
    method: "POST",
    body: JSON.stringify(itemData),
  });

  return result.item ? mapItem(result.item) : null;
}


/**
 * PUT /items/{id}
 * Update an item.
 */

export async function updateItem(id, itemData) {

  if (!USE_AWS_BACKEND) {
    return null;
  }

  const result = await request(
    `/items/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(itemData),
    }
  );

  return result.item ? mapItem(result.item) : null;
}


/**
 * DELETE /items/{id}
 * Delete an item.
 */

export async function deleteItem(id) {

  if (!USE_AWS_BACKEND) {
    return null;
  }

  return request(
    `/items/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );
}


/**
 * PATCH /items/{id}/status
 * Admin-only status update.
 */

export async function updateItemStatus(id, status) {

  if (!USE_AWS_BACKEND) {
    return null;
  }

  const result = await request(
    `/items/${encodeURIComponent(id)}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }
  );

  return result.item ? mapItem(result.item) : null;
}


// ==================================================
// ITEM DATA MAPPING
// ==================================================

/**
 * Backend uses itemId.
 * Frontend uses id.
 *
 * Convert the backend format into the frontend format.
 */

function mapItem(item) {

  return {
    ...item,
    id: item.itemId || item.id,
  };
}


// ==================================================
// S3 IMAGE UPLOAD
// ==================================================

/**
 * Upload an image securely to the private S3 bucket.
 *
 * Flow:
 * 1. Request presigned URL from Lambda.
 * 2. Upload image directly to S3.
 * 3. Return imageKey for DynamoDB storage.
 */

export async function uploadItemPhoto(file) {

  if (!file) {
    throw new Error("Please select an image.");
  }

  // Local development fallback
  if (!USE_AWS_BACKEND) {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onloadend = () => {
        resolve({
          imageUrl: reader.result,
        });
      };

      reader.onerror = () => {
        reject(new Error("Unable to read image."));
      };

      reader.readAsDataURL(file);
    });
  }

  // Validate image type
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG and WEBP images are allowed.");
  }

  // Step 1: Request presigned upload URL
  const result = await request(
    "/media/presign-upload",
    {
      method: "POST",
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
      }),
    }
  );

  const { uploadUrl, imageKey } = result;

  if (!uploadUrl || !imageKey) {
    throw new Error("Unable to generate S3 upload URL.");
  }

  // Step 2: Upload image directly to S3
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Image upload to S3 failed.");
  }

  // Step 3: Return S3 object key
  return {
    imageKey,
  };
}


// ==================================================
// AUTHENTICATION COMPATIBILITY
// ==================================================

/**
 * Authentication is handled directly through
 * AWS Amplify in authService.js.
 *
 * These functions are retained for compatibility
 * with any older imports.
 */

export async function authenticateUser() {

  throw new Error(
    "Use authService.js for Cognito authentication."
  );
}


export async function registerStudentAccount() {

  throw new Error(
    "Use authService.js for Cognito registration."
  );
}