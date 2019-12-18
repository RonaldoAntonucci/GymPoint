import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Students from '~/pages/Students/StudentsList';
import CreateStudent from '~/pages/Students/CreateStudent';

import Plans from '~/pages/Plans/PlansList';
import CreatePlan from '~/pages/Plans/CreatePlan';

import Registrations from '~/pages/Registrations/RegistrationsList';
import CreateRegistration from '~/pages/Registrations/CreateRegistration';

import HelpOrders from '~/pages/HelpOrders/HelpOrdersList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/create" component={CreateStudent} isPrivate />
      <Route path="/students/:id" component={CreateStudent} isPrivate />
      <Route path="/students" component={Students} isPrivate />

      <Route path="/plans/create" component={CreatePlan} isPrivate />
      <Route path="/plans/:id" component={CreatePlan} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />

      <Route
        path="/registrations/create"
        component={CreateRegistration}
        isPrivate
      />
      <Route
        path="/registrations/:id"
        component={CreateRegistration}
        isPrivate
      />
      <Route path="/registrations" component={Registrations} isPrivate />

      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
