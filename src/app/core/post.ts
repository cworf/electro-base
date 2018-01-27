export interface Post{
	title: string;
	content: string;
	authorName: string;
	authorId: string;
}

export interface PostId extends Post{
	id: string;
}
