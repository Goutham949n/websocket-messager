import { Component, Input } from '@angular/core';
import { WebsocketService } from "./websocket.service";
import { ChatService } from "./chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, ChatService]
})
export class AppComponent {

  title = 'wesocket-ui';
  selectedOption:string='';
  messageResponse :string ='';

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      if(msg && msg.correct)  {
        console.log("Response from websocket: " + msg);
        this.message = msg;
        this.messageResponse = "Response from websocket: " + msg.content;
      }
  
    });
  }

   message = {
    from: "a",
    content: "this is a test message",
    question : "Sample Question 1",
    selectedOption : this.selectedOption,
    correct : "Not Correct"
  };

  sendMsg() {
    console.log("new message from client to websocket: ", this.message);
    this.message.selectedOption = this.selectedOption;  
    this.chatService.messages.next(this.message);
    this.message.content = "";
  }

}
