export class LoginRequest {
    constructor(
      public documento: string,
      public password: string
    ) {}
  }
  
  export class LoginResponse {
    constructor(
      public access_token: string,
      public user: {
        id: number;
        name: string;
        documento: string;
        rol_id: number;
        email: string;
      }
    ) {}
  }
  