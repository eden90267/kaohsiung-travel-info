import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import 'app.sass';

import 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap.min';

import controller from 'controller';

controller.init();


if (module.hot) {
  // hack, 讓 html 能夠自動 reload
  require('!!raw-loader!../index.html');
  // css hot reload in dev mode
  window.addEventListener('message', (event) => {
    if (typeof event.data === 'string' && event.data.indexOf('webpackHotUpdate') === 0) {
      document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
        if (/localhost/g.test(link.href)) {
          link.href = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
        }
      });
    }
  });
}