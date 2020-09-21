import * as firebase from 'firebase';

export type Role = 'doctor' | 'patient' | 'assistant';

export class User {
  constructor(public id: string,
              public emailVerified: boolean,
              public email: string,
              public role: string,
              public managerID: string,
              public isActive: boolean,
              public isSuperadmin: boolean) {}

  public static fromDB(user: firebase.User) {
    return new User(
      user.uid,
      user.emailVerified,
      user.email,
      '',
      null,
      true,
      false
    );
  }

  public static fromDBAndStorage(user: firebase.User, storageString: string) {
    const storageData = JSON.parse(storageString);
    return new User(
      user.uid,
      user.emailVerified,
      user.email,
      storageData.role,
      storageData.managerID,
      storageData.isActive,
      false
    );
  }

  toStorageString() {
    return JSON.stringify( {
      role: this.role,
      managerID: this.managerID,
      isActive: this.isActive
    });
  }

}
