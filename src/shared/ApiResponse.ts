export class ApiResponse {
  data: any;
  message: string;

  constructor(message: string, data?: any) {
    this.data = data ? data : null;
    this.message = message;
  }
}
