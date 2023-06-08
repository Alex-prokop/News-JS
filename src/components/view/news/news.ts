import './news.css';

interface NewsItem {
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

class News {
    public draw(data: ReadonlyArray<NewsItem>): void {
        const news: ReadonlyArray<NewsItem> = data.slice(0, 10);

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (newsItemTemp !== null) {
            news.forEach((item: NewsItem, idx: number) => {
                const newsClone: HTMLElement = newsItemTemp.content.cloneNode(true) as HTMLElement;

                if (idx % 2) {
                    newsClone.querySelector('.news__item')?.classList.add('alt');
                }

                const newsPhoto: HTMLElement = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

                const newsAuthor: HTMLElement = newsClone.querySelector('.news__meta-author') as HTMLElement;
                newsAuthor.textContent = item.author || item.source.name;

                const newsDate: HTMLElement = newsClone.querySelector('.news__meta-date') as HTMLElement;
                newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

                const newsTitle: HTMLElement = newsClone.querySelector('.news__description-title') as HTMLElement;
                newsTitle.textContent = item.title;

                const newsSource: HTMLElement = newsClone.querySelector('.news__description-source') as HTMLElement;
                newsSource.textContent = item.source.name;

                const newsContent: HTMLElement = newsClone.querySelector('.news__description-content') as HTMLElement;
                newsContent.textContent = item.description;

                const newsLink: HTMLAnchorElement = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
                newsLink.setAttribute('href', item.url);

                fragment.appendChild(newsClone);
            });
        }

        const newsContainer: HTMLElement | null = document.querySelector('.news');
        if (newsContainer !== null) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
