import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { WebsocketService } from "./websocket.service";
import { map } from "rxjs/operators";


const CHAT_URL = "ws://localhost:8080/websocket-messager/chat/a";

export interface Message {
  from: string;
  content: string;
  question: string;
  selectedOption: string;
  correct: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          from: data.from,
          content: data.content,
          question: data.question,
          selectedOption: data.selectedOption,
          correct: data.correct
        };
      }
    ));
  }
}