import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {

  MatButtonModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatToolbarModule,

} from '@angular/material';
import {AppComponent} from './app.component';

@NgModule({
  exports: [
    // CDK
    DragDropModule,
    // Material
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
   
  ]
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
   
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}