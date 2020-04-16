import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var numname = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine"
    ];

    function getCurrentSeconds() {
      var dNow = new Date();
      return dNow.getSeconds() + 60 * (dNow.getMinutes() + 60 * dNow.getHours());
    }

    var s1 = document.getElementById("s1");
    var s2 = document.getElementById("s2");

    var m1 = document.getElementById("m1");
    var m2 = document.getElementById("m2");

    var h1 = document.getElementById("h1");
    var h2 = document.getElementById("h2");

    var start = new Date().getTime();
    var interval = 1000;

    function countUp() {
      var count = getCurrentSeconds();

      // Only update if at least a second has passed.
      if (new Date().getTime() - start >= interval) {
        start = new Date().getTime();

        s2.className = "clock__digit " + numname[(count % 60) % 10];

        s1.className = "clock__digit " + numname[Math.floor((count % 60) / 10)];

        m2.className =
          "clock__digit " + numname[Math.floor(((count / 60) % 60) % 60) % 10];

        m1.className =
          "clock__digit " + numname[Math.floor((((count / 60) % 60) % 60) / 10)];

        h2.className =
          "clock__digit " + numname[Math.floor(((count / 3600) % 60) % 24) % 10];

        h1.className =
          "clock__digit " + numname[Math.floor((((count / 3600) % 60) % 24) / 10)];
      }

      requestAnimationFrame(countUp);
    }

    var raf = requestAnimationFrame(countUp);
  }

}
