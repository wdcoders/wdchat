import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { Users } from './test';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  users = [];
  user: string;
  room: string;
  messageText: string;
  message = [];
  selectedUser = [];
  constructor(
    private testServices: TestService
  ) {

    this.GetAllUsers();

    this.testServices.NewUserJoined().subscribe((data) => {
      console.log(data);
      this.message.push(data);
    });

    this.testServices.UserLeaveRoom().subscribe((data) => {
      console.log(data);
      this.message.push(data);
    });

    this.testServices.RecievedMessage().subscribe((data) => {
      console.log(data);
      this.message.push(data);
    });


    this.testServices.RMessage().subscribe((data) => {
      console.log(data);
      this.message.push(data);
    });

  }

  ngOnInit() {

    this.testServices.GetUserList().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  JoinRoom() {
    this.testServices.JoinRoom({user: this.user, room: this.room});
  }

  LeaveRoom() {
    this.testServices.LeaveRoom({user: this.user, room: this.room});
  }

  SendMessage() {
    this.testServices.SendMessage({user: this.user, room: this.room, message: this.messageText});
  }

  SMessage() {
    this.testServices.SMessage({user: this.selectedUser[0].user, id: this.selectedUser[0].id, message: this.messageText});
  }

  AddUser() {
    this.testServices.AddUser({user: this.user});
  }

  GetAllUsers() {
    this.testServices.AllUserList();
  }

  OnSelectUser(u) {
    this.selectedUser = [];
    this.selectedUser.push(u);
    console.log(this.selectedUser);
  }
}
