import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'ab245c2f8a53458781466cedebb4eb87',
        });
    }
}

export default AppLoader;
