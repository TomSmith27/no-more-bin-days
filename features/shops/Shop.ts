import { OpeningTimes } from './OpeningHours';

export interface Shop {
	id?: string;
	name: string;
	imageUrl: string;
	address: string;
	products: string[];
	shopType: string;
	openingTimes: OpeningTimes[];
	is247: boolean;
	externalOpeningHours: boolean;
	externalWebsite: string;
	longitude: number;
	latitude: number;
}
