export class BaseError extends Error {
  constructor(message: string, public type: string, public code: string) {
    super(message);
    this.name = new.target.name;
    this.type = type;
    this.code = code;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    // 下記の行はTypeScriptの出力ターゲットがES2015より古い場合(ES3, ES5)のみ必要
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UnknownException extends BaseError {
  constructor(message: string, type = '', code = '') {
    super(message, type, code);
  }
}

export class FirebaseException extends BaseError {
  constructor(message: string, code: string) {
    super(message, 'firebase', code);
  }
}

export class HttpException extends BaseError {
  constructor(message: string, code: string, type: string) {
    super(message, type, code);
  }
}

export class ValidateException extends BaseError {
  constructor(message: string, code: string) {
    super(message, 'validation', code);
  }
}
