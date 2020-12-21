import './App.css';
import { Auth0Lock } from 'auth0-lock';


function App() {
  console.log('running app');
  let state = JSON.parse(localStorage.getItem('state'));
  if(!state) {
    localStorage.setItem('state', JSON.stringify({
      accessToken: null,
      profile: null
    }));
  }
  const lock = new Auth0Lock(
    'mDH7Xfrtr1mGJLSp1PvQZGuhDOoBMQXz',
    'cylex.auth0.com'
  );

  lock.on('authenticated', (authResult) => {
    lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error) {
        return;
      }

      localStorage.setItem('accessToken', authResult.accessToken);
      localStorage.setItem('profile', JSON.stringify(profile));

      state = {
        accessToken: authResult.accessToken,
        profile: profile
      };
      localStorage.setItem('state', JSON.stringify(state));
    });
  });

  const showLogin = () => {
    lock.show();
  };

  const showLogout = () => {
    state = {
      accessToken: null,
      profile: null
    };
    localStorage.setItem('state', JSON.stringify({
      accessToken: null,
      profile: null
    }));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
    lock.logout();
  };

  return (
    <div className="App">
      <header className="App-header">
        {!state.profile ? (
          <div>
            <p>User is not logged in</p>
            <button onClick={showLogin}>Login</button>
          </div>
        ) : (
          <div>
            <p>{state.profile.name} is logged in</p>
            <button onClick={showLogout}>Logout</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
