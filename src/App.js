import React from 'react'
import Menu from './components/Menu/Menu'
import MainPage from './Pages/Main/Main'
import NewsPage from './Pages/News/News'
import styles from './App.module.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.App}>
          <Menu />  
          <Switch>
            <Route exact path="/news" render={() => <NewsPage /> } />
            <Route path="/" render={() => <MainPage /> } />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
