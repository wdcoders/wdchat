import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MessagesComponent } from '../messages/messages.component';
import { AppListComponent } from '../app-list/app-list.component';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { DynamicSidebarComponent } from '../dynamic-sidebar/dynamic-sidebar.component';
import { LayoutComponent } from './layout.component';


@NgModule({
  declarations: [
    LayoutComponent,
    MessagesComponent,
    AppListComponent,
    MainNavComponent,
    DynamicSidebarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
