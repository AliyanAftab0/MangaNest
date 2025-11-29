import axios from 'axios';
import { Manga, Chapter, SearchFilters } from '@/types';

const BASE_URL = 'https://api.mangadex.org';
const UPLOADS_URL = 'https://uploads.mangadex.org';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Helper to get cover URL
const getCoverUrl = (mangaId: string, fileName: string) => {
    return `${UPLOADS_URL}/covers/${mangaId}/${fileName}.256.jpg`;
};

export const getTrendingManga = async (limit = 10): Promise<Manga[]> => {
    try {
        const response = await api.get('/manga', {
            params: {
                limit,
                includes: ['cover_art', 'author'],
                order: { rating: 'desc' },
                contentRating: ['safe', 'suggestive'],
            },
        });

        return response.data.data.map((item: any) => {
            const coverFileName = item.relationships.find((r: any) => r.type === 'cover_art')?.attributes?.fileName;
            const authorName = item.relationships.find((r: any) => r.type === 'author')?.attributes?.name;

            return {
                id: item.id,
                title: item.attributes.title.en || Object.values(item.attributes.title)[0],
                description: item.attributes.description.en || '',
                cover: coverFileName ? getCoverUrl(item.id, coverFileName) : '',
                author: authorName || 'Unknown',
                status: item.attributes.status,
                year: item.attributes.year,
                tags: item.attributes.tags.map((t: any) => t.attributes.name.en),
            };
        });
    } catch (error) {
        console.error('Error fetching trending manga:', error);
        return [];
    }
};

export const getMangaDetails = async (id: string): Promise<Manga | null> => {
    try {
        const response = await api.get(`/manga/${id}`, {
            params: {
                includes: ['cover_art', 'author', 'artist'],
            },
        });

        const item = response.data.data;
        const coverFileName = item.relationships.find((r: any) => r.type === 'cover_art')?.attributes?.fileName;
        const authorName = item.relationships.find((r: any) => r.type === 'author')?.attributes?.name;

        return {
            id: item.id,
            title: item.attributes.title.en || Object.values(item.attributes.title)[0],
            description: item.attributes.description.en || '',
            cover: coverFileName ? getCoverUrl(item.id, coverFileName) : '',
            author: authorName || 'Unknown',
            status: item.attributes.status,
            year: item.attributes.year,
            tags: item.attributes.tags.map((t: any) => t.attributes.name.en),
        };
    } catch (error) {
        console.error('Error fetching manga details:', error);
        return null;
    }
};

export const getChapterList = async (mangaId: string, limit = 100, offset = 0): Promise<Chapter[]> => {
    try {
        const response = await api.get(`/manga/${mangaId}/feed`, {
            params: {
                limit,
                offset,
                translatedLanguage: ['en'],
                order: { chapter: 'desc' },
                contentRating: ['safe', 'suggestive'],
            },
        });

        return response.data.data.map((item: any) => ({
            id: item.id,
            title: item.attributes.title,
            chapter: item.attributes.chapter,
            volume: item.attributes.volume,
            publishAt: item.attributes.publishAt,
            pages: item.attributes.pages,
        }));
    } catch (error) {
        console.error('Error fetching chapter list:', error);
        return [];
    }
};

export const getChapterImages = async (chapterId: string): Promise<string[]> => {
    try {
        const response = await api.get(`/at-home/server/${chapterId}`);
        const baseUrl = response.data.baseUrl;
        const hash = response.data.chapter.hash;
        const fileNames = response.data.chapter.data; // High quality images

        return fileNames.map((fileName: string) => `${baseUrl}/data/${hash}/${fileName}`);
    } catch (error) {
        console.error('Error fetching chapter images:', error);
        return [];
    }
};

export const searchManga = async (query: string, filters: SearchFilters = {}): Promise<Manga[]> => {
    try {
        const params: any = {
            title: query,
            limit: filters.limit || 20,
            offset: filters.offset || 0,
            includes: ['cover_art', 'author'],
            contentRating: ['safe', 'suggestive'],
        };

        if (filters.year) params.year = filters.year;
        if (filters.status) params.status = filters.status;

        const response = await api.get('/manga', { params });

        return response.data.data.map((item: any) => {
            const coverFileName = item.relationships.find((r: any) => r.type === 'cover_art')?.attributes?.fileName;
            const authorName = item.relationships.find((r: any) => r.type === 'author')?.attributes?.name;

            return {
                id: item.id,
                title: item.attributes.title.en || Object.values(item.attributes.title)[0],
                description: item.attributes.description.en || '',
                cover: coverFileName ? getCoverUrl(item.id, coverFileName) : '',
                author: authorName || 'Unknown',
                status: item.attributes.status,
                year: item.attributes.year,
                tags: item.attributes.tags.map((t: any) => t.attributes.name.en),
            };
        });
    } catch (error) {
        console.error('Error searching manga:', error);
        return [];
    }
};
