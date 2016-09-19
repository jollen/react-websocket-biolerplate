import React from 'react';
import { render } from 'react-dom';
import { MyComponent } from './Component';

render(
    <MyComponent server="wss://wot.city/object/testman/viewer">
    </MyComponent>,
    document.getElementById('content')
);