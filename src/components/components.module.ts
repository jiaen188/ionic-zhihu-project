import { NgModule } from '@angular/core';
import { EmojipickerComponent } from './emojipicker/emojipicker';
import { IonicPageModule } from 'ionic-angular/module';
@NgModule({
	declarations: [EmojipickerComponent],
	imports: [IonicPageModule .forChild(EmojipickerComponent),],
	exports: [EmojipickerComponent]
})
export class ComponentsModule {}
