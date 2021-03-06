import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './modules/routing/routing.module';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { WebService } from './services/web.service';
import { ExcelService } from './services/excel.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RoutingModule,
    HttpModule
  ],
  providers: [WebService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }


