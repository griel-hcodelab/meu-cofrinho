import './firebase';

import './Class/ClassUtils';
import './Class/ClassLogin';
import Login from './Class/ClassLogin';

const login = new Login();

login.checkAuth();