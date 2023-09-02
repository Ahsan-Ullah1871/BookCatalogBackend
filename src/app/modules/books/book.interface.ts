export type IBookFilter = {
	minPrice?: string;
	maxPrice?: string;
	category?: string;
	search?: string;
};

export type IBookFilteringItems = {
	all_genre: string[];
	all_publication_date: string[];
};

