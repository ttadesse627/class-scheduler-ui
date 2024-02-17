## Basic Usage

### BrowserRouter

The BrowserRouter is a key component that should wrap your entire application. It utilizes HTML5 history API to keep UI in sync with the URL.

```jsx
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
};
```

Route Parameters
React Router allows capturing dynamic segments from the URL using the :param syntax.

```jsx
const UserProfile = ({ match }) => {
  const { username } = match.params;
  return <p>User Profile: {username}</p>;
};

// ...

<Route path="/user/:username" component={UserProfile} />;
```

## Advanced Concepts

### Nested Routes

You can nest routes within components to create complex UI structures.

```jsx
const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Route path="/dashboard/profile" component={Profile} />
      <Route path="/dashboard/settings" component={Settings} />
    </div>
  );
};

// ...

<Route path="/dashboard" component={Dashboard} />;
```

### Programmatic Navigation

React Router provides the history object, enabling programmatic navigation.

```jsx
import { useHistory } from "react-router-dom";

const MyComponent = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/new-route");
  };

  return <button onClick={handleClick}>Go to New Route</button>;
};
```

### Route Guards

Implementing route guards helps control access to specific routes based on conditions.

```jsx
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = // check authentication logic here

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

// Usage
<PrivateRoute path="/dashboard" component={Dashboard} />
```

These are just a few advanced features of React Router. The library offers even more capabilities like route transition animations, lazy loading, and custom route matching.
