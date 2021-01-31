import firebase from 'firebase/app';
import 'firebase/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor() { }

  uploadModule(obj: any, file: File, fname: string, extension: string,
               callback: (obj: any, url: string, path: string, progress: number, err: string) => void) {
    const storageRef = firebase.storage().ref();
    let metadata;
    if (fname.toLowerCase().endsWith('pdf')) {
      metadata = {
        contentType: 'application/pdf'
      };
    } else {
      metadata = {
        contentType: 'image/' + extension
      };
    }

    const uploadTask = storageRef.child(fname).put(file, metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('upload paused', progress);
          callback(obj, null, fname, progress, null);
          break;
        case firebase.storage.TaskState.RUNNING:
          callback(obj, null, fname, progress, null);
          break;
      }
    }, (err) => {
      callback(obj, null, fname, 0, err.message);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        callback(obj, url, fname, 100, null);
      });
    });
  }

  checkIfNameExists(path: string) {
    const storageRef = firebase.storage().ref();
    return storageRef.child(path).getMetadata()
      .then(() => {
        return true;
      })
      .catch(reason => {
        console.log(reason);
        return false;
      });
  }
}
