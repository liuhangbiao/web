import dva from 'dva';
import './index.css';
// 1. Initialize
// const app = dva();
const app = dva({
    initialState: {
        products: [
            { name: 'dva', id: 1 },
            { name: 'antd', id: 2 },
        ],
    },
});

app.model(require("./models/products"));

app.model(require("./models/plmns"));

app.model(require("./models/disturb"));

app.model(require("./models/alarn"));

app.model(require("./models/signal"));

app.model(require("./models/wave"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');