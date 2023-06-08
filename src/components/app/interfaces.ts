export interface Data {
    sources: SourceData[];
    articles: NewsItem[];
}

export interface SourceData {
    name: string;
    id: string;
}
export interface NewsItem {
    author: string;
    source: {
        name: string;
    };
    publishedAt: string;
    urlToImage: string;
    title: string;
    description: string;
    url: string;
}
