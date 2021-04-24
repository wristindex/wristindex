import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Home from './pages';
import SigninPage from './pages/signin';
import SpiderChart from './pages/spider';

function App() {
  return (
    // Implementing react router and wrap in a switch statement to pass the route
    <Router >
      <Switch>
        <Route path="/" component = {Home} exact/>
        <Route path="/signin" component = {SigninPage} exact/>
        <Route path="/spider" component = {SpiderChart} />
      </Switch>
    </Router>
  );
}

export default App;
