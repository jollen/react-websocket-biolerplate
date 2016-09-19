
實作具備 WebSocket 的 React 元件

A React biolerplate that polyfill Websocket by Flux pattern.

## Install

To setup the package.

```
$ git clone https://github.com/jollen/react-websocket-biolerplate.git
$ cd react-websocket-biolerplate
$ npm install
$ gulp compile
```

Open 'dist/index.html' with your browser.

## Usage

在 React 元件裡加入 WebSocket 的步驟如下。

```
import React, { Component } from 'react';
import { render } from 'react-dom';

// 1. 引入 'react-websocket-flux'
import { WebsocketStore, WebsocketActions } from 'react-websocket-flux';

export class MyComponent extends Component {
    constructor(props, context) {
        super(props, context);

        // 2. 初始化 this.state
        this.state = {
            temperature: -1
        };

        // 3. WebSocket 的 'onMessage' callback
        this.onMessage = this.onMessage.bind(this);

        // 4. 連線到 WebSocket Server
        WebsocketActions.connect(this.props.server);
    }

    componentDidMount() {
        // 5. 將 'onMessage' 註冊到 react-websocket-flux
        WebsocketStore.addMessageListener(this.onMessage);
    }

    componentWillUnmount() {
        // 將 'onMessage' 從 react-websocket-flux 解除註冊       
        WebsocketStore.removeMessageListener(this.onMessage);      
    }

    onMessage(data) {
        // 6. Deserialize: 從 Server 推送過來的 JSON data 取出資料，並放入 this.state
        this.setState({
            temperature: data.temperature
        });
        console.log(data)
    }

    render() {
        return (    
            <div>
                <h1>{this.state.temperature}</h1>
            </div>
        );
    }
}
```

完成後編譯元件：

```
$ gulp compile
```

## License

The [MIT License](http://www.opensource.org/licenses/MIT) (MIT). See [LICENSE.md](LICENSE.md).
