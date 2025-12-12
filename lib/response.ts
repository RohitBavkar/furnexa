import { NextResponse } from "next/server";

export type ApiResponse<T = unknown> = {
  data?: T;
  error?: string;
  success: boolean;
};

/**
 * Return a successful API response
 */
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      data,
      success: true,
    } as ApiResponse<T>,
    { status }
  );
}

/**
 * Return an error API response
 */
export function errorResponse(error: string, status = 500) {
  return NextResponse.json(
    {
      error,
      success: false,
    } as ApiResponse,
    { status }
  );
}

/**
 * Handle API errors with logging
 */
export function handleApiError(error: unknown, defaultMessage: string) {
  console.error(defaultMessage, error);
  return errorResponse(defaultMessage, 500);
}
