import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { HeadfacePage } from '../headface/headface';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {

  headface: string = 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg?';
  nickname: string = '加载中...';
  errorMessage: string;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then(val => {
      if (val != null) {
        // 加载用户数据
        var loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getUserInfo(val)
          .subscribe(
          userinfo => {
            this.nickname = userinfo['UserNickName'];
            this.headface = userinfo['UserHeadface'] + '?' + (new Date()).valueOf();
            loading.dismiss();
          },
          error => this.errorMessage = <any>error);
      }
    })
  }

  updateNickName() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, '修改中...');
        this.rest.updateNickName(val, this.nickname)
          .subscribe(
          f => {
            if (f['Status'] == 'OK') {
              loading.dismiss();
              super.showToast(this.toastCtrl, '昵称修改成功');
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f['StatusContent']);
            }
          },
          error => this.errorMessage = <any>error);
      }
    });
  }

  logout() {
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }

  goToHeadface() {
    this.navCtrl.push(HeadfacePage);
  }

}
