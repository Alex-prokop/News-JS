import { SourceData, Options } from '../app/interfaces';

enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

abstract class Loader {
    baseLink: string;
    options: Partial<Options>;

    constructor(baseLink: string, options: Partial<Options>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected load(
        method: HttpMethod,
        endpoint: string,
        callback: (data: SourceData) => void,
        options: Partial<Options> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: SourceData) => callback(data))
            .catch((err) => console.error(err));
    }

    protected getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Partial<Options> },
        callback: (data: SourceData) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    private makeUrl(options: Partial<Options>, endpoint: string): string {
        const urlOptions: Partial<Options> = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key as keyof Options]}&`;
        });

        return url.slice(0, -1);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }
}

export default Loader;
