export class User {
  constructor(public id: string,
              public refreshToken: string,
              public token: string,
              private _tokenExpiration: Date) {}

  get isValid() {
    return this._tokenExpiration && this.tokenDuration > 0;
  }

  toStorageString() {
    return JSON.stringify( {
      id: this.id,
      refreshToken: this.refreshToken,
      token: this.token,
      tokenExpiration: this._tokenExpiration.toISOString()
    });
  }

  get tokenDuration() {
    return (this._tokenExpiration.getTime() - Date.now());
  }
}
