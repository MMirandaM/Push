import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from './../../models/user/user.module';
import { UserService } from './../../services/user/user.service';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	users:any;

	constructor(
		public navCtrl: NavController,
		private userSrvc: UserService,
		private push: Push,
		public localNotifications: LocalNotifications,
	) {
		this.users = this.userSrvc.getUsersList();
	}

	teste(){
		this.push.hasPermission()
			.then((res) => {
				if(res.isEnabled){
					alert('Permission');
				}
				else{
					alert('Not Permission');
				}
			});

		let options: PushOptions = {
			android:{
				senderID:"AIzaSyBoNGw1tvR46agwQA_8ZFfD-gmK7UWiWhY"
			},
			browser: {
				pushServiceURL: 'http://push.api.phonegap.com/v1/push'
			}
		}
		const pObj: PushObject = this.push.init(options);

		pObj.on('registration').subscribe((resgistration:any) => {
			alert('device ' + resgistration.registrationType);
		});

		pObj.on('notification').subscribe((data) => {
			if(data.additionalData.foreground){
				alert('message: ' + data.message);
				alert(data.additionalData.foreground.toString());
				alert((!data.additionalData.foreground).toString());
				let new_user: User = {
					nome: 'Love',
					telefone: '15937-8624'
				}
				this.userSrvc.addUserList(new_user);
			}
			let variable = !(data.additionalData.foreground);
			if(variable == false){
				// let new_user: User = {
				// 	nome: 'Love',
				// 	telefone: '15937-8624'
				// }

				// this.userSrvc.addUserList(new_user);
				alert('esta mensagem é de coldstart');
				alert(variable.toString());
				
				this.localNotifications.schedule({
					text : ' esta mensagem é: ' + data.message
				});
			}
		});

		pObj.on('error').subscribe( (error) => {
			alert('Error with Push plugin ' +  error.message);
		});
	}
}
