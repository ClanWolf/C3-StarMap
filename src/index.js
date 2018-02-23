/* @flow */
import './index.less';
import React from 'react';
import { render } from 'react-dom';
import RootComponent from './components/root';

render(<RootComponent />, document.getElementById('starmap-container'));
