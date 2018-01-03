import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Social, NewTask } from '../../../components';

class Main extends React.Component {
  render() {
    return (

      <main style={{ paddingTop: '90px', paddingBottom: '30px' }}>
        <Switch>
          <Route exact path="/" render={(props) => (<Social />)}/>
          <Route exact path="/new" render={(props) => (<NewTask />)}/>
        </Switch>
      </main>

    );
  }
}

export default Main;