import createHistory from 'history/createBrowserHistory';
import RouteRecognizer from 'route-recognizer';
import routes from './pages/sitemap';

const router = new RouteRecognizer();
const history = createHistory();

window.history2 = history;
let APP_INSTANCE;

history.listen((location, action) => {

    let result = router.recognize(`${location.pathname}${location.search}${location.hash}`);

    let data = result[0]; //assume no nested routes.

    APP_INSTANCE.setCurrentPage(data.handler);

    console.log('recognize', result);
    console.log('listen', location, action);
});

export function pushState() {
    console.log(arguments);
    history.push(...arguments);
}

export function initializeRouting(appInstance) {
    for (let route of routes) {
        router.add([route]);
    }

    APP_INSTANCE = appInstance;

    history.replace(window.location);
}
