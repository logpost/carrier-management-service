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
}
