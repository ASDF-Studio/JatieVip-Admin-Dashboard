interface StripeErrorOptions extends ErrorOptions {
  statusCode?: number
}
export class StripeError extends Error {
  public statusCode: number

  constructor(message: string, options: StripeErrorOptions) {
    super(message)
    this.statusCode = options.statusCode
  }
}
