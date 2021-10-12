import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import NewRoom from '../pages/NewRoom';
import Room from '../pages/Room';
import AdminRoom from '../pages/AdminRoom';

/**
 * @export
 * @component
 * @name Home
 *
 * @description
 * Responsável por montar o roteamento.
 */
export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
      </Switch>
    </BrowserRouter>
  );
};
