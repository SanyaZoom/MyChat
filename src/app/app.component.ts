import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChatService }       from './chat.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './chat.component.html',
  styleUrls: ['app.component.sass']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message = '';
  user = "Say";
  color: any;

  @ViewChild('user') usr: ElementRef;

  constructor(private chatService:ChatService) {
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  sendMessage(){
    if(this.message.indexOf('http') >= 0){
      this.message = this.msgWithLink(this.message);
    }
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnDestroy() {
    console.log(this.messages);
    this.connection.unsubscribe();
  }

  changes(event){
    if(event.target.innerText === "B"){
      this.onBold();
    } else if(event.target.innerText === "I") {
      this.onItalic();
    } else if(event.target.innerText === "Color") {
      this.onColor();
    } else if(event.target.innerText === "Font-size") {
      this.onFont();
    }
  }

  onBold(){
    this.message += '[b]bold[/b]';
  }

  onItalic(){
    this.message += '[i]italic[/i]';
  }

  onColor(){
    this.message += '[color=red]red text[/color]';
  }

  onFont(){
    this.message += '[size=1]font-size[/size]';
  }

  msgWithLink(msg){
    let begin, end, from, arr, url;
    from = msg.indexOf('http');
    begin = msg.split('http')[0];
    msg = msg.substring(from);
    arr = msg.split(" ");
    for(let i = 1; i < arr.length; i++){
      if(i === 1){
        end =" " + arr[i] + " ";
      } else {
        end += arr[i] + " ";
      }
    }
    url = "[url]" + arr[0] + "[/url]";
    return begin + url + end;
  }
}
