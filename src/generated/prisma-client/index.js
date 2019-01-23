"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Article",
    embedded: false
  },
  {
    name: "ArticleSection",
    embedded: false
  },
  {
    name: "LANGUAGE",
    embedded: false
  },
  {
    name: "Playlist",
    embedded: false
  },
  {
    name: "PlaylistItem",
    embedded: false
  },
  {
    name: "SOURCE_TYPE",
    embedded: false
  },
  {
    name: "Service",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Video",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}}`
});
exports.prisma = new exports.Prisma();
