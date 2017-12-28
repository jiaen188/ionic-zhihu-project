import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { DetailsPage } from '../../pages/details/details';
import { Input } from '@angular/core';
/**
 * Generated class for the QuestionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent extends BaseUI {

  questions: string[];
  errorMessage: any;

  // dataType 外部传递进来， dataSourceType 本地接受之后的参数命名
  @Input('datatype') dataSourceType;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider) {
      super();
    console.log('Hello QuestionListComponent Component');
  }

  // 这里没有 ionViewDidLoad 生命周期函数
  ngAfterContentInit() {
    this.storage.get('UserId').then(val => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getUserQuestionList(val, this.dataSourceType)
          .subscribe(
          q => {
            this.questions = q;
            loading.dismissAll();
          },
          error => this.errorMessage = <any>error);
      }
    });
  }

  goToDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId});
  }

}
