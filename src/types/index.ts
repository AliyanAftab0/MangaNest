export interface Manga {
    id: string;
    title: string;
    description: string;
    cover: string;
    author: string;
    status: string;
    year: number;
    tags: string[];
}

export interface Chapter {
    id: string;
    title: string;
    chapter: string;
    volume: string;
    publishAt: string;
    pages: number;
}

export interface MangaDexResponse<T> {
    result: string;
    response: string;
    data: T;
    limit?: number;
    offset?: number;
    total?: number;
}

export interface SearchFilters {
    title?: string;
    status?: string;
    year?: number;
    genre?: string;
    limit?: number;
    offset?: number;
}
