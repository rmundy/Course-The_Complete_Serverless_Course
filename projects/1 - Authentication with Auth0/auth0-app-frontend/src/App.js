import './App.css';

function App() {
  const state = {
    accessToken: null,
    profile: 'null'
  };

  return (
    <div className="App">
      <header className="App-header">
        {state.profile}
      </header>
    </div>
  );
}

export default App;
