import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { MessagesComponent } from '../messages/messages.component';


const routes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      { path: '', component: MessagesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
