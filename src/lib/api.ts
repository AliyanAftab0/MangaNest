import { Manga, Chapter, SearchFilters } from '@/types';

const BASE_URL = 'https://api.mangadex.org';
const UPLOADS_URL = 'https://uploads.mangadex.org';

// Helper to get cover URL
const getCoverUrl = (mangaId: string, fileName: string) => {
    return `${UPLOADS_URL}/covers/${mangaId}/${fileName}.256.jpg`;
};

// Helper for fetch requests with error handling
const fetchFromApi = async (endpoint: string, params: Record<string, any> = {}) => {
    try {
        const url = new URL(`${BASE_URL}${endpoint}`);
        Object.keys(params).forEach(key => {
            if (Array.isArray(params[key])) {
                params[key].forEach((val: string) => url.searchParams.append(`${key}[]`, val));
            } else if (typeof params[key] === 'object' && params[key] !== null) {
                Object.keys(params[key]).forEach(subKey => {
                    url.searchParams.append(`${key}[${subKey}]`, params[key][subKey]);
                });
            } else if (params[key] !== undefined && params[key] !== '') {
                url.searchParams.append(key, params[key]);
            }
        });

        const response = await fetch(url.toString(), {
            next: { revalidate: 3600 }, // Cache for 1 hour
            headers: {
                'User-Agent': 'MangaNest/1.0.0 (https://manga-nest-phi.vercel.app)',
            }
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
};

export const getTrendingManga = async (limit = 10): Promise<Manga[]> => {
    const data = await fetchFromApi('/manga', {
        limit,
        includes: ['cover_art', 'author'],
        order: { rating: 'desc' },
        contentRating: ['safe', 'suggestive'],
    });

    if (!data || !data.data) return [];

    return data.data.map((item: any) => {
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
};

export const getMangaDetails = async (id: string): Promise<Manga | null> => {
    const data = await fetchFromApi(`/manga/${id}`, {
        includes: ['cover_art', 'author', 'artist'],
    });

    if (!data || !data.data) return null;

    const item = data.data;
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
};

export const getChapterList = async (mangaId: string, limit = 100, offset = 0): Promise<Chapter[]> => {
    const data = await fetchFromApi(`/manga/${mangaId}/feed`, {
        limit,
        offset,
        translatedLanguage: ['en'],
        order: { chapter: 'desc' },
        contentRating: ['safe', 'suggestive'],
    });

    if (!data || !data.data) return [];

    return data.data.map((item: any) => ({
        id: item.id,
        title: item.attributes.title,
        chapter: item.attributes.chapter,
        volume: item.attributes.volume,
        publishAt: item.attributes.publishAt,
        pages: item.attributes.pages,
    }));
};

export const getChapterImages = async (chapterId: string): Promise<string[]> => {
    try {
        // We don't use fetchFromApi here because we need 'no-store' cache policy
        // as the image server URLs can expire or change.
        const response = await fetch(`${BASE_URL}/at-home/server/${chapterId}`, {
            cache: 'no-store',
            headers: {
                'User-Agent': 'MangaNest/1.0.0 (https://manga-reader.vercel.app)',
            }
        });

        if (!response.ok) throw new Error('Failed to fetch chapter images');

        const data = await response.json();
        const baseUrl = data.baseUrl;
        const hash = data.chapter.hash;
        const fileNames = data.chapter.data;

        return fileNames.map((fileName: string) => `${baseUrl}/data/${hash}/${fileName}`);
    } catch (error) {
        console.error("Error fetching chapter images:", error);
        return [];
    }
};

export const searchManga = async (query: string, filters: SearchFilters = {}): Promise<Manga[]> => {
    const params: any = {
        title: query,
        limit: filters.limit || 20,
        offset: filters.offset || 0,
        includes: ['cover_art', 'author'],
        contentRating: ['safe', 'suggestive'],
    };

    if (filters.year) params.year = filters.year;
    if (filters.status) params.status = filters.status;

    const data = await fetchFromApi('/manga', params);

    if (!data || !data.data) return [];

    return data.data.map((item: any) => {
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
};
