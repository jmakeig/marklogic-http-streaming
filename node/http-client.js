/*
 * Copyright 2015 MarkLogic Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const http = require('http');
const options = {
  hostname: 'localhost',
  port: 9875,
  path: '/stream.sjs',
  method: 'GET'
};

let chunks = 0;
const req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    chunks++;
    if(22 === chunks) {
      console.log(chunk);
    }
  });
  res.on('end', function() {
    console.log('Received %d chunks', chunks);
  })
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();
