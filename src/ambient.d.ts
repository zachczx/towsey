interface TowelDB {
	collectionId: string;
	collectionName: string;
	id: string;
	time: string;
	created: string;
	updated: string;
	user: string;
}

interface TowelRecord extends TowelDB {
	gap: number;
}

interface SprayDB {
	collectionId: string;
	collectionName: string;
	id: string;
	time: string;
	created: string;
	updated: string;
	user: string;
}
