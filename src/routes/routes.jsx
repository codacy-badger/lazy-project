import React from 'react';
import { Route } from 'react-router-dom';
import uuidv1 from 'uuid/v1';

import universal from 'react-universal-component';
import Loadable from 'react-loadable';
import loadable from '@loadable/component';

// Utils.
import { LoadStateComponent } from '../components/load-state';
import LazyComponent from '../components/lazy-component';

const lazyPages = ['home'];

// ! Universal Components.

const pages = ['users'];

const UniversalComponent = universal(props => import(`./secure/${props.page}`), {
  loading: <LoadStateComponent />,
});

// ? Loadable Component.

const Profile = loadable(() => import('./secure/profile'), {
  fallback: <LoadStateComponent />,
});

// ? React Loadable.

const About = Loadable({
  loader: () => import('./secure/about'),
  loading: LoadStateComponent,
});

export default () => (
  <>
    {
      lazyPages.map(page => (
        <Route
          key={uuidv1()}
          path={`/secure/${page}`}
          component={props => <LazyComponent {...props} page={page} />}
        />
      ))
    }
    {/* This universal component can be generated using a list of routes */}
    {
      pages.map(page => (
        <Route
          key={uuidv1()}
          path={`/secure/${page}`}
          component={props => <UniversalComponent {...props} page={page} />}
        />
      ))
    }
    {/* @loadable/component is not as expected */}
    <Route path="/secure/profile" component={props => <Profile {...props} />} />
    <Route path="/secure/about" component={About} />
  </>
);
