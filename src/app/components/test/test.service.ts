import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Users } from './test';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private socket = io('http://localhost:3000/');

  constructor() { }

  JoinRoom(data) {
    this.socket.emit('join', data);
  }

  NewUserJoined() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('New user joined', (data) => {
        observer.next(data);
      });

      // return () => {this.socket.disconnect(); };
    });

    return observable;
  }

  LeaveRoom(data) {
    this.socket.emit('leave', data);
  }


  UserLeaveRoom() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('leave room', (data) => {
        observer.next(data);
      });

      // return () => {this.socket.disconnect(); };
    });

    return observable;
  }

  SendMessage(data) {
    this.socket.emit('message', data);
  }

  RecievedMessage() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      // return () => {this.socket.disconnect(); };
    });

    return observable;
  }

  AddUser(data) {
    this.socket.emit('newUser', data);
  }

  GetUserList() {
    const observable = new Observable<Users[]>(observer => {
      this.socket.on('userList', (data) => {
        observer.next(data);
      });

      // return () => {this.socket.disconnect(); };
    });

    return observable;
  }

  AllUserList() {
    this.socket.emit('getUserList');
  }


  SMessage(data) {
    this.socket.emit('msg', data);
  }

  RMessage() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('nmsg', (data) => {
        observer.next(data);
      });

      // return () => {this.socket.disconnect(); };
    });

    return observable;
  }
}
