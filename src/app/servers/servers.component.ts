import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  //selector: 'app-servers',
  //selector: '.app-servers',
  selector: 'app-servers',
  //template: `
  //<app-server></app-server>
  //<app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms ease-in-out", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("500ms", style({ opacity: 0 }))
      ])
    ])]
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Testserver';
  submitted = false;



  goingForm: FormGroup;

  name = new FormControl('');
  going = new FormControl('');

  constructor(private _formBuilder: FormBuilder) {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
  }

  ngOnInit() {
    this.goingForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      going: ["", Validators.required]
    });
  }



  onCreateServer() {
    this.serverCreationStatus = 'Server was created';
    console.log(this.goingForm)
    this.saveToDb(this.goingForm)
    this.submitted = true;

  }

  saveToDb(data) {
    let sentData = {
      name: data.value.name,
      going: data.value.going
    }
    console.log("---Database---")
    console.log(sentData)
  }


  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}