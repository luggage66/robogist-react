import Home from './home';
import Browse from './browse';
import Login from './login';
import Logout from './logout';
import UserProfile from './user-profile';
import NotFound from './not-found';

const sitemap = [
    { path: '/browse', handler: Browse },
    { path: '/login', handler: Login },
    { path: '/logout', handler: Logout },
    { path: '/profile', handler: UserProfile },
    { path: '', handler: Home },
];

export default sitemap;
