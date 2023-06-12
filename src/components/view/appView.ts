import News from './news/news';
import Sources from './sources/sources';
import { Data, SourceData, NewsItem } from '../app/interfaces';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Data): void {
        const values: Readonly<NewsItem[]> = data.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Data): void {
        const values: Readonly<SourceData[]> = data.sources ? data.sources : [];
        this.sources.draw(values);
    }
}
export default AppView;
