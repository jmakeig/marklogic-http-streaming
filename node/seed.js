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

const marklogic = require("marklogic");
const uuid = require('node-uuid');

const conn = {
  database: "Documents",
  host: "localhost",
  port: 8000,
  user: "admin",
  password: "********",
  authType: "digest"
};

const db = marklogic.createDatabaseClient(conn);

function createDescriptor(doc) {
  return {
    uri: "/" + (doc._id || doc.id || doc.guid || uuid.v4()) + ".json",
    contentType: "application/json",
    collections: ["fake data"],
    content: doc
  }
}

function generateDummyDocumentDescriptors(count, example) {
  let descriptors = [];
  for(let i = 0; i < (count || 1000); i++) {
    descriptors.push(createDescriptor(
      {
        id: uuid.v4(),
        dummy: 'This is a string',
        isEven: (0 === i % 2)
      }
    ));
  }
  return descriptors;
}

// UGLY: This probably doesn't do what I think it does.
for(let batch = 0; batch < 20; batch++) {
  db.documents.write(
    generateDummyDocumentDescriptors()
  ).
    result(function(response){
      //console.dir(JSON.stringify(response))
      console.log('wrote batch');
    });
}
