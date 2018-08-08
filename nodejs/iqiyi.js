  const http = require('http');
  const https = require('https');
  const urlMd = require('url');
  // module.exports = function(url, callback) {
  const fetch = function(url, callback) {
      let urlInfo = urlMd.parse(url);
      let fetcher = urlInfo.protocol === 'http:' ? http : https;
      let req = fetcher.request({
          hostname: urlInfo.hostname,
          path: urlInfo.path,
      }, (res) => {
          console.log(`状态码: ${res.statusCode}`);
          if (res.statusCode === 200) {
              let content = [];
              res.on('data', (chunk) => {
                  content.push(chunk);
              })
              res.on('end', () => {
                  let b = Buffer.concat(content);
                  callback && callback(null, b.toString());
              })
          } else {
              callback(new Error(`状态码:${res.statusCode}`));
          }
      })
      req.end();
      req.on('error', (err) => {
          callback(err);
      })
  }
  // index.js
  const util = require('util');
  // const fetch = util.promisify(require('./fetch.js'));
  const jsdom = require('jsdom');
  const {
      JSDOM
  } = jsdom;
  const fs = require('fs');
  //config.json
  // const config = require('./config.json');
  const config = {
          "pageMaxNum": "20",
          "parseURL": "http://vip.jlsprh.com/index.php?url="
      }
      (function() {
          Promise.all(fetchHandler()).then(d => parseHTML(d)).then(d => saveToFile(d));
      })()

  function fetchHandler() {
      let promiseList = [];
      for (let i = 1; i <= config.pageMaxNum; i++) {
          promiseList.push(fetch(getSourceURL(i)));
      }
      return promiseList;
  }

  function getSourceURL(index) {
      return `http://list.iqiyi.com/www/1/-------------11-${index}-1-iqiyi--.html`
  }

  function parseHTML(html) {
      const dom = new JSDOM(html);
      let aList = dom.window.document.querySelectorAll('div.site-piclist_pic > a');
      aList = Array.from(aList);
      return aList.map((a) => {
          return {
              source: a.href,
              title: a.title,
              url: `${config.parseURL}${a.href}`
          }
      });
  }

  function saveToFile(data) {
      let str = JSON.stringify(data);
      fs.writeFile('./data.json', str, {
          flag: 'w+'
      }, (err) => {
          if (err) console.log(err);
      })
  }