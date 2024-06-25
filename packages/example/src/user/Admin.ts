import { User } from './User';

export interface Admin extends User {
	role: 'admin';
}
