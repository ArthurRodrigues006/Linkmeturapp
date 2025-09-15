export class ApiResponseDto<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
  path?: string;

  constructor(data?: T, message?: string, success: boolean = true) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data?: T, message?: string): ApiResponseDto<T> {
    return new ApiResponseDto(data, message, true);
  }

  static error(message: string, error?: string, path?: string): ApiResponseDto {
    const response = new ApiResponseDto(undefined, message, false);
    response.error = error;
    response.path = path;
    return response;
  }
}

export class PaginatedResponseDto<T = any> extends ApiResponseDto<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  constructor(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message?: string
  ) {
    super(data, message, true);
    this.pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
