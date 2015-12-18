/**
 * OmorfiaApp
 * app startup script for development purpose
 */

require('./index.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { Main } from 'utils/main-dev';
import { makeStore } from 'utils/store-dev';

import { App } from 'containers/app';
import { DEV as initialState } from 'fixtures/initial-state-dev.fixture';

export function start(targetEl, payload) {

    // apply the host's page payload 
    if (payload.title) {
        initialState.app.title = payload.title;
    }

    ReactDOM.render((
        <Main
            app={App}
            store={makeStore(initialState)} />
    ), targetEl);
}
