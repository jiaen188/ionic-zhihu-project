import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, TextInput } from 'ionic-angular';
import { ChatserviceProvider, ChatMessage } from '../../providers/chatservice/chatservice';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { Events } from 'ionic-angular/util/events';

/**
 * Generated class for the ChatdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {

  chatUserName: string;
  chatUserId: string;
  userId: string;
  userName: string;
  userImgUrl: string;
  isOpenEmojiPicker = false;
  messageList: ChatMessage[] = [];
  errorMessage: any;
  editorMessage: string;
  @ViewChild(Content) content: Content; // 全局的 content
  @ViewChild('chatInput') messageInput: TextInput // 获取前台的输入框

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public chatService: ChatserviceProvider,
    public storage: Storage,
    public rest: RestProvider,
    public event: Events) {
    this.chatUserName = navParams.get('username');
    this.chatUserId = navParams.get('userid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatdetailsPage');
  }

  ionViewDidEnter() {

    this.storage.get('UserId').then(val => {
      if (val != null) {
        this.rest.getUserInfo(val)
          .subscribe(
          userinfo => {
            this.userId = '140000198202211138';
            this.userName = userinfo['UserNickName'];
            this.userImgUrl = userinfo['UserHeadface'] + '?' + (new Date()).valueOf();
          },
          error => this.errorMessage = <any>error);
      }
    })

    this.getMessages()
      .then(() => {
        this.scrollToBottom();
      });

    // 听取消息的发布，订阅
    this.event.subscribe('chat.received', (msg, time) => {
      this.messageList.push(msg);
      this.scrollToBottom();
    });
  }

  ionViewWillLeave() {
    // 进行事件的取消订阅
    this.event.unsubscribe('chat.received');
  }

  sendMessage() {
    if (!this.editorMessage.trim())
      return;

    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId: id,
      userId: this.userId,
      username: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.chatUserId,
      time: Date.now(),
      message: this.editorMessage,
      status: 'pending'
    };

    this.messageList.push(messageSend);
    this.scrollToBottom();

    this.editorMessage = '';

    if (!this.isOpenEmojiPicker) {
      this.messageInput.setFocus();
    }

    // 发送消息并改变消息的状态
    this.chatService.sendMessage(messageSend)
      .then(() => {
        let index = this.getMessageIndex(id);
        if (index !== -1) {
          this.messageList[index].status = 'success';
        }
      });
  }

  focus() {
    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  /**
   * 调用 service 里面的方法进行属性的赋值
   * 
   * @returns 
   * @memberof ChatdetailsPage
   */
  getMessages() {
    return this.chatService.getMessageList()
      .then(res => {
        this.messageList = res;
      })
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * 切换表情组件
   * 
   * @memberof ChatdetailsPage
   */
  switchEmojiPicker() {
    console.log("switch emojiPicker");
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }

  scrollToBottom(): any {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
  }

  getMessageIndex(id: string) {
    return this.messageList.findIndex(e => e.messageId === id);
  }

}
