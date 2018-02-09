import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user/user.module';

@Injectable()
export class UserService{
	userCollectionRef: AngularFirestoreCollection<User>;
	users$: Observable<User[]>;

	constructor(
		private afs: AngularFirestore
		){
		this.userCollectionRef = this.afs.collection<User>('users');
		this.users$ = this.userCollectionRef.valueChanges();
	}
	
	getUsersList(){	
		return this.users$;
	}

	addUserList(user: User){
		this.userCollectionRef.add({
			nome: user.nome,
			telefone: user.telefone
		});
	}

	// addItem(item: Item){
	// 	return this.shoppingListRef.push(item);
	// }

	// editItem(item: Item){
	// 	console.log(item);
	// 	return this.shoppingListRef.update(item.key, {name: item.name, quantity: item.quantity, price: item.price})
	// 	.then(() => { console.log('ok'); })
	// 	.catch((e) => { console.log('Erro! ' + e); });
	// }

	// removeItem(item: Item){
	// 	return this.shoppingListRef.remove(item.key);
	// }
}