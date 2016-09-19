
實現 WebSocket React 元件的項目模板。你可以用這模板製作具 WebSocket 功能的元件，或是為現有的元件注入 WebSocket 功能。使用 Flux 模式。

A React biolerplate that polyfill Websocket by Flux pattern.

## 安裝

```
$ git clone https://github.com/jollen/react-websocket-biolerplate.git
$ cd react-websocket-biolerplate
$ npm install
$ gulp compile
```

開啟 'dist/index.html' 文件即可。你會看到來自 ```wot.city``` 服務器的即時數據。要修改服務器來源，請開啟 ```src/App.jsx```，並修改 ```server``` prop。修改後必須重新運行 ```gulp compile``` 來編譯文件。

## 使用教學

### 製作元件

讓 React 支援 WebSocket 協定，接收來自 WebSocket 服務器的數據推送。原則如下：

* 使用 ```react-websocket-flux``` 模組，這是一個簡單 Flux 實現
* 註冊事件函數到 ```react-websocket-flux``` 裡後，透過 ```onMessage``` 接收即時數據

元件的範例代碼位於 ```src/Component.jsx```，實現細節說明如如下。你可以根據以下的步驟，為現有的 React 元件加入 WebSocket 功能。

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

編譯好的文件位於 ```src/Component.js```。

### 元件使用

在 React 應用裡使用時，只要加入 ```server``` props 來指定 WebSocket 服務器 URI 即可。可以使用本專案提供的 ```wss://wot.city/object/testman/viewer``` 做測試。範例如下：

```
render(
    <MyComponent server="wss://wot.city/object/testman/viewer">
    </MyComponent>,
    document.getElementById('content')
);
```

完整的文件請參考 ```src/App.jsx```。

## License

The [MIT License](http://www.opensource.org/licenses/MIT) (MIT). See [LICENSE.md](LICENSE.md).
