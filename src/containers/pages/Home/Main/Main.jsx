import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { NewGuide, Guidelines } from '../../index';

class Main extends React.Component {
  render() {
    return (

      <main style={{ paddingTop: '90px', paddingBottom: '30px' }}>
        <Switch>
          <Route exact path="/guides/new" component={NewGuide} />
          <Route component={Guidelines} />
        </Switch>
      </main>

    );
  }
}

export default Main;