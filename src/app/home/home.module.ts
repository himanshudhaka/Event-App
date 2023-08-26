import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    HomePageRoutingModule,
    CalendarModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
