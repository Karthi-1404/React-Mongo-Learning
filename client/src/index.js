import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './dist/output.module.css';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider} from 'antd'
import store from './redux/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
  store={store}
  > 
    <ConfigProvider
    theme={{
      components:{
      Button:{
        colorPrimary:'#FFA500',
        colorPrimaryHover:'#FFA500'
      }},
      token:{
        borderRadius:'0px',
        colorPrimary:'#FFA500',
      }
   } }>
    <App />
    </ConfigProvider>
    </Provider>
    

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
