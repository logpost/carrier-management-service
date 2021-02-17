import { Whitelists } from '../interfaces/data/whitelist.interface'

export const whitelist: Whitelists = {
	carrier: {
		name: { field: 'name' },
		display_name: { field: 'display_name' },
		tel: { field: 'tel' },
		address: { field: 'address' },
		account_description: { field: 'account_description' },
		juristic_id: { field: 'juristic_id' },
	},
	carrier_srv: {
		username: { field: 'username' },
		password: { field: 'password' },
		email: { field: 'email' },
		is_email_confirmed: { field: 'is_email_confirmed' },
		is_verified: { field: 'is_verified' },
		account_type: { field: 'account_type' },
	},
}
