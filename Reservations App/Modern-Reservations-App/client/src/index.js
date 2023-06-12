import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {SearchcontextProvider} from './context/searchcontext'
import { AuthcontextProvider } from './context/authcontext';
import { RegContextProvider } from './context/regcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


      <RegContextProvider>

        <AuthcontextProvider>

              <SearchcontextProvider>

                    <App />

              </SearchcontextProvider>

        </AuthcontextProvider>

      </RegContextProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

