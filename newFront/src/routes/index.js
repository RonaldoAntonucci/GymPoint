import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Students from '~/pages/Students/StudentsList';
import CreateStudent from '~/pages/Students/CreateStudent';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/create" component={CreateStudent} isPrivate />
      <Route path="/students/:id" component={CreateStudent} isPrivate />
      <Route path="/students" component={Students} isPrivate />
    </Switch>
  );
}
