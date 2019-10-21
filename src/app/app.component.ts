import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { VERSION, MatMenuTrigger } from '@angular/material';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  version = VERSION;

  data = [{
    'name': 'George Washington',
    'details': '1789'
  },
  {
    'name': 'John Adams',
    'details': '1796'
  },
  { 'name': 'Thomas Jefferson', 'details': '1800' },
  { 'name': 'James Madison', 'details': '1808' },
  { 'name': 'James Monroe', 'details': '1812' }
  ];
  item: any = "";
  draggable: boolean = false;

  displayedColumns: string[] = ['name', 'details'];
  dataSource: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {

  }

  onDrop(event) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
  edit() {
    this.draggable = !this.draggable;
  }

}
