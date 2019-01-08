module.exports = {
        typeDefs: /* GraphQL */ `type AggregateArticle {
  count: Int!
}

type AggregateArticleSection {
  count: Int!
}

type AggregatePlaylist {
  count: Int!
}

type AggregatePlaylistItem {
  count: Int!
}

type AggregateService {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideo {
  count: Int!
}

type Article {
  id: ID!
  url: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  headline: String!
  description: String
  datePublished: DateTime!
  dateModified: DateTime
  body: String!
  author: String
  tags: [String!]!
  images: [String!]!
  sections(where: ArticleSectionWhereInput, orderBy: ArticleSectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ArticleSection!]
  service: Service!
}

type ArticleConnection {
  pageInfo: PageInfo!
  edges: [ArticleEdge]!
  aggregate: AggregateArticle!
}

input ArticleCreateimagesInput {
  set: [String!]
}

input ArticleCreateInput {
  url: String!
  headline: String!
  description: String
  datePublished: DateTime!
  dateModified: DateTime
  body: String!
  author: String
  tags: ArticleCreatetagsInput
  images: ArticleCreateimagesInput
  sections: ArticleSectionCreateManyWithoutArticlesInput
  service: ServiceCreateOneWithoutArticlesInput!
}

input ArticleCreateManyWithoutSectionsInput {
  create: [ArticleCreateWithoutSectionsInput!]
  connect: [ArticleWhereUniqueInput!]
}

input ArticleCreateManyWithoutServiceInput {
  create: [ArticleCreateWithoutServiceInput!]
  connect: [ArticleWhereUniqueInput!]
}

input ArticleCreatetagsInput {
  set: [String!]
}

input ArticleCreateWithoutSectionsInput {
  url: String!
  headline: String!
  description: String
  datePublished: DateTime!
  dateModified: DateTime
  body: String!
  author: String
  tags: ArticleCreatetagsInput
  images: ArticleCreateimagesInput
  service: ServiceCreateOneWithoutArticlesInput!
}

input ArticleCreateWithoutServiceInput {
  url: String!
  headline: String!
  description: String
  datePublished: DateTime!
  dateModified: DateTime
  body: String!
  author: String
  tags: ArticleCreatetagsInput
  images: ArticleCreateimagesInput
  sections: ArticleSectionCreateManyWithoutArticlesInput
}

type ArticleEdge {
  node: Article!
  cursor: String!
}

enum ArticleOrderByInput {
  id_ASC
  id_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  headline_ASC
  headline_DESC
  description_ASC
  description_DESC
  datePublished_ASC
  datePublished_DESC
  dateModified_ASC
  dateModified_DESC
  body_ASC
  body_DESC
  author_ASC
  author_DESC
}

type ArticlePreviousValues {
  id: ID!
  url: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  headline: String!
  description: String
  datePublished: DateTime!
  dateModified: DateTime
  body: String!
  author: String
  tags: [String!]!
  images: [String!]!
}

input ArticleScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  headline: String
  headline_not: String
  headline_in: [String!]
  headline_not_in: [String!]
  headline_lt: String
  headline_lte: String
  headline_gt: String
  headline_gte: String
  headline_contains: String
  headline_not_contains: String
  headline_starts_with: String
  headline_not_starts_with: String
  headline_ends_with: String
  headline_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  datePublished: DateTime
  datePublished_not: DateTime
  datePublished_in: [DateTime!]
  datePublished_not_in: [DateTime!]
  datePublished_lt: DateTime
  datePublished_lte: DateTime
  datePublished_gt: DateTime
  datePublished_gte: DateTime
  dateModified: DateTime
  dateModified_not: DateTime
  dateModified_in: [DateTime!]
  dateModified_not_in: [DateTime!]
  dateModified_lt: DateTime
  dateModified_lte: DateTime
  dateModified_gt: DateTime
  dateModified_gte: DateTime
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  author: String
  author_not: String
  author_in: [String!]
  author_not_in: [String!]
  author_lt: String
  author_lte: String
  author_gt: String
  author_gte: String
  author_contains: String
  author_not_contains: String
  author_starts_with: String
  author_not_starts_with: String
  author_ends_with: String
  author_not_ends_with: String
  AND: [ArticleScalarWhereInput!]
  OR: [ArticleScalarWhereInput!]
  NOT: [ArticleScalarWhereInput!]
}

type ArticleSection {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  articles(where: ArticleWhereInput, orderBy: ArticleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Article!]
}

type ArticleSectionConnection {
  pageInfo: PageInfo!
  edges: [ArticleSectionEdge]!
  aggregate: AggregateArticleSection!
}

input ArticleSectionCreateInput {
  name: String!
  articles: ArticleCreateManyWithoutSectionsInput
}

input ArticleSectionCreateManyWithoutArticlesInput {
  create: [ArticleSectionCreateWithoutArticlesInput!]
  connect: [ArticleSectionWhereUniqueInput!]
}

input ArticleSectionCreateWithoutArticlesInput {
  name: String!
}

type ArticleSectionEdge {
  node: ArticleSection!
  cursor: String!
}

enum ArticleSectionOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
}

type ArticleSectionPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}

input ArticleSectionScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [ArticleSectionScalarWhereInput!]
  OR: [ArticleSectionScalarWhereInput!]
  NOT: [ArticleSectionScalarWhereInput!]
}

type ArticleSectionSubscriptionPayload {
  mutation: MutationType!
  node: ArticleSection
  updatedFields: [String!]
  previousValues: ArticleSectionPreviousValues
}

input ArticleSectionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ArticleSectionWhereInput
  AND: [ArticleSectionSubscriptionWhereInput!]
  OR: [ArticleSectionSubscriptionWhereInput!]
  NOT: [ArticleSectionSubscriptionWhereInput!]
}

input ArticleSectionUpdateInput {
  name: String
  articles: ArticleUpdateManyWithoutSectionsInput
}

input ArticleSectionUpdateManyDataInput {
  name: String
}

input ArticleSectionUpdateManyMutationInput {
  name: String
}

input ArticleSectionUpdateManyWithoutArticlesInput {
  create: [ArticleSectionCreateWithoutArticlesInput!]
  delete: [ArticleSectionWhereUniqueInput!]
  connect: [ArticleSectionWhereUniqueInput!]
  disconnect: [ArticleSectionWhereUniqueInput!]
  update: [ArticleSectionUpdateWithWhereUniqueWithoutArticlesInput!]
  upsert: [ArticleSectionUpsertWithWhereUniqueWithoutArticlesInput!]
  deleteMany: [ArticleSectionScalarWhereInput!]
  updateMany: [ArticleSectionUpdateManyWithWhereNestedInput!]
}

input ArticleSectionUpdateManyWithWhereNestedInput {
  where: ArticleSectionScalarWhereInput!
  data: ArticleSectionUpdateManyDataInput!
}

input ArticleSectionUpdateWithoutArticlesDataInput {
  name: String
}

input ArticleSectionUpdateWithWhereUniqueWithoutArticlesInput {
  where: ArticleSectionWhereUniqueInput!
  data: ArticleSectionUpdateWithoutArticlesDataInput!
}

input ArticleSectionUpsertWithWhereUniqueWithoutArticlesInput {
  where: ArticleSectionWhereUniqueInput!
  update: ArticleSectionUpdateWithoutArticlesDataInput!
  create: ArticleSectionCreateWithoutArticlesInput!
}

input ArticleSectionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  articles_every: ArticleWhereInput
  articles_some: ArticleWhereInput
  articles_none: ArticleWhereInput
  AND: [ArticleSectionWhereInput!]
  OR: [ArticleSectionWhereInput!]
  NOT: [ArticleSectionWhereInput!]
}

input ArticleSectionWhereUniqueInput {
  id: ID
  name: String
}

type ArticleSubscriptionPayload {
  mutation: MutationType!
  node: Article
  updatedFields: [String!]
  previousValues: ArticlePreviousValues
}

input ArticleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ArticleWhereInput
  AND: [ArticleSubscriptionWhereInput!]
  OR: [ArticleSubscriptionWhereInput!]
  NOT: [ArticleSubscriptionWhereInput!]
}

input ArticleUpdateimagesInput {
  set: [String!]
}

input ArticleUpdateInput {
  url: String
  headline: String
  description: String
  datePublished: DateTime
  dateModified: DateTime
  body: String
  author: String
  tags: ArticleUpdatetagsInput
  images: ArticleUpdateimagesInput
  sections: ArticleSectionUpdateManyWithoutArticlesInput
  service: ServiceUpdateOneRequiredWithoutArticlesInput
}

input ArticleUpdateManyDataInput {
  url: String
  headline: String
  description: String
  datePublished: DateTime
  dateModified: DateTime
  body: String
  author: String
  tags: ArticleUpdatetagsInput
  images: ArticleUpdateimagesInput
}

input ArticleUpdateManyMutationInput {
  url: String
  headline: String
  description: String
  datePublished: DateTime
  dateModified: DateTime
  body: String
  author: String
  tags: ArticleUpdatetagsInput
  images: ArticleUpdateimagesInput
}

input ArticleUpdateManyWithoutSectionsInput {
  create: [ArticleCreateWithoutSectionsInput!]
  delete: [ArticleWhereUniqueInput!]
  connect: [ArticleWhereUniqueInput!]
  disconnect: [ArticleWhereUniqueInput!]
  update: [ArticleUpdateWithWhereUniqueWithoutSectionsInput!]
  upsert: [ArticleUpsertWithWhereUniqueWithoutSectionsInput!]
  deleteMany: [ArticleScalarWhereInput!]
  updateMany: [ArticleUpdateManyWithWhereNestedInput!]
}

input ArticleUpdateManyWithoutServiceInput {
  create: [ArticleCreateWithoutServiceInput!]
  delete: [ArticleWhereUniqueInput!]
  connect: [ArticleWhereUniqueInput!]
  disconnect: [ArticleWhereUniqueInput!]
  update: [ArticleUpdateWithWhereUniqueWithoutServiceInput!]
  upsert: [ArticleUpsertWithWhereUniqueWithoutServiceInput!]
  deleteMany: [ArticleScalarWhereInput!]
  updateMany: [ArticleUpdateManyWithWhereNestedInput!]
}

input ArticleUpdateManyWithWhereNestedInput {
  where: ArticleScalarWhereInput!
  data: ArticleUpdateManyDataInput!
}

input ArticleUpdatetagsInput {
  set: [String!]
}

input ArticleUpdateWithoutSectionsDataInput {
  url: String
  headline: String
  description: String
  datePublished: DateTime
  dateModified: DateTime
  body: String
  author: String
  tags: ArticleUpdatetagsInput
  images: ArticleUpdateimagesInput
  service: ServiceUpdateOneRequiredWithoutArticlesInput
}

input ArticleUpdateWithoutServiceDataInput {
  url: String
  headline: String
  description: String
  datePublished: DateTime
  dateModified: DateTime
  body: String
  author: String
  tags: ArticleUpdatetagsInput
  images: ArticleUpdateimagesInput
  sections: ArticleSectionUpdateManyWithoutArticlesInput
}

input ArticleUpdateWithWhereUniqueWithoutSectionsInput {
  where: ArticleWhereUniqueInput!
  data: ArticleUpdateWithoutSectionsDataInput!
}

input ArticleUpdateWithWhereUniqueWithoutServiceInput {
  where: ArticleWhereUniqueInput!
  data: ArticleUpdateWithoutServiceDataInput!
}

input ArticleUpsertWithWhereUniqueWithoutSectionsInput {
  where: ArticleWhereUniqueInput!
  update: ArticleUpdateWithoutSectionsDataInput!
  create: ArticleCreateWithoutSectionsInput!
}

input ArticleUpsertWithWhereUniqueWithoutServiceInput {
  where: ArticleWhereUniqueInput!
  update: ArticleUpdateWithoutServiceDataInput!
  create: ArticleCreateWithoutServiceInput!
}

input ArticleWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  headline: String
  headline_not: String
  headline_in: [String!]
  headline_not_in: [String!]
  headline_lt: String
  headline_lte: String
  headline_gt: String
  headline_gte: String
  headline_contains: String
  headline_not_contains: String
  headline_starts_with: String
  headline_not_starts_with: String
  headline_ends_with: String
  headline_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  datePublished: DateTime
  datePublished_not: DateTime
  datePublished_in: [DateTime!]
  datePublished_not_in: [DateTime!]
  datePublished_lt: DateTime
  datePublished_lte: DateTime
  datePublished_gt: DateTime
  datePublished_gte: DateTime
  dateModified: DateTime
  dateModified_not: DateTime
  dateModified_in: [DateTime!]
  dateModified_not_in: [DateTime!]
  dateModified_lt: DateTime
  dateModified_lte: DateTime
  dateModified_gt: DateTime
  dateModified_gte: DateTime
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  author: String
  author_not: String
  author_in: [String!]
  author_not_in: [String!]
  author_lt: String
  author_lte: String
  author_gt: String
  author_gte: String
  author_contains: String
  author_not_contains: String
  author_starts_with: String
  author_not_starts_with: String
  author_ends_with: String
  author_not_ends_with: String
  sections_every: ArticleSectionWhereInput
  sections_some: ArticleSectionWhereInput
  sections_none: ArticleSectionWhereInput
  service: ServiceWhereInput
  AND: [ArticleWhereInput!]
  OR: [ArticleWhereInput!]
  NOT: [ArticleWhereInput!]
}

input ArticleWhereUniqueInput {
  id: ID
  url: String
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Json

enum LANGUAGE {
  ES
  EN
}

scalar Long

type Mutation {
  createArticle(data: ArticleCreateInput!): Article!
  updateArticle(data: ArticleUpdateInput!, where: ArticleWhereUniqueInput!): Article
  updateManyArticles(data: ArticleUpdateManyMutationInput!, where: ArticleWhereInput): BatchPayload!
  upsertArticle(where: ArticleWhereUniqueInput!, create: ArticleCreateInput!, update: ArticleUpdateInput!): Article!
  deleteArticle(where: ArticleWhereUniqueInput!): Article
  deleteManyArticles(where: ArticleWhereInput): BatchPayload!
  createArticleSection(data: ArticleSectionCreateInput!): ArticleSection!
  updateArticleSection(data: ArticleSectionUpdateInput!, where: ArticleSectionWhereUniqueInput!): ArticleSection
  updateManyArticleSections(data: ArticleSectionUpdateManyMutationInput!, where: ArticleSectionWhereInput): BatchPayload!
  upsertArticleSection(where: ArticleSectionWhereUniqueInput!, create: ArticleSectionCreateInput!, update: ArticleSectionUpdateInput!): ArticleSection!
  deleteArticleSection(where: ArticleSectionWhereUniqueInput!): ArticleSection
  deleteManyArticleSections(where: ArticleSectionWhereInput): BatchPayload!
  createPlaylist(data: PlaylistCreateInput!): Playlist!
  updatePlaylist(data: PlaylistUpdateInput!, where: PlaylistWhereUniqueInput!): Playlist
  updateManyPlaylists(data: PlaylistUpdateManyMutationInput!, where: PlaylistWhereInput): BatchPayload!
  upsertPlaylist(where: PlaylistWhereUniqueInput!, create: PlaylistCreateInput!, update: PlaylistUpdateInput!): Playlist!
  deletePlaylist(where: PlaylistWhereUniqueInput!): Playlist
  deleteManyPlaylists(where: PlaylistWhereInput): BatchPayload!
  createPlaylistItem(data: PlaylistItemCreateInput!): PlaylistItem!
  updatePlaylistItem(data: PlaylistItemUpdateInput!, where: PlaylistItemWhereUniqueInput!): PlaylistItem
  updateManyPlaylistItems(data: PlaylistItemUpdateManyMutationInput!, where: PlaylistItemWhereInput): BatchPayload!
  upsertPlaylistItem(where: PlaylistItemWhereUniqueInput!, create: PlaylistItemCreateInput!, update: PlaylistItemUpdateInput!): PlaylistItem!
  deletePlaylistItem(where: PlaylistItemWhereUniqueInput!): PlaylistItem
  deleteManyPlaylistItems(where: PlaylistItemWhereInput): BatchPayload!
  createService(data: ServiceCreateInput!): Service!
  updateService(data: ServiceUpdateInput!, where: ServiceWhereUniqueInput!): Service
  updateManyServices(data: ServiceUpdateManyMutationInput!, where: ServiceWhereInput): BatchPayload!
  upsertService(where: ServiceWhereUniqueInput!, create: ServiceCreateInput!, update: ServiceUpdateInput!): Service!
  deleteService(where: ServiceWhereUniqueInput!): Service
  deleteManyServices(where: ServiceWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVideo(data: VideoCreateInput!): Video!
  updateVideo(data: VideoUpdateInput!, where: VideoWhereUniqueInput!): Video
  updateManyVideos(data: VideoUpdateManyMutationInput!, where: VideoWhereInput): BatchPayload!
  upsertVideo(where: VideoWhereUniqueInput!, create: VideoCreateInput!, update: VideoUpdateInput!): Video!
  deleteVideo(where: VideoWhereUniqueInput!): Video
  deleteManyVideos(where: VideoWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Playlist {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  childrenName: String
  description: String
  metadata: Json!
  parent: Playlist
  children(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist!]
  items(where: PlaylistItemWhereInput, orderBy: PlaylistItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PlaylistItem!]
  user: User
  service: Service!
}

type PlaylistConnection {
  pageInfo: PageInfo!
  edges: [PlaylistEdge]!
  aggregate: AggregatePlaylist!
}

input PlaylistCreateInput {
  name: String!
  childrenName: String
  description: String
  metadata: Json
  parent: PlaylistCreateOneWithoutChildrenInput
  children: PlaylistCreateManyWithoutParentInput
  items: PlaylistItemCreateManyWithoutPlayListInput
  user: UserCreateOneWithoutPlaylistsInput
  service: ServiceCreateOneInput!
}

input PlaylistCreateManyWithoutParentInput {
  create: [PlaylistCreateWithoutParentInput!]
  connect: [PlaylistWhereUniqueInput!]
}

input PlaylistCreateManyWithoutUserInput {
  create: [PlaylistCreateWithoutUserInput!]
  connect: [PlaylistWhereUniqueInput!]
}

input PlaylistCreateOneWithoutChildrenInput {
  create: PlaylistCreateWithoutChildrenInput
  connect: PlaylistWhereUniqueInput
}

input PlaylistCreateOneWithoutItemsInput {
  create: PlaylistCreateWithoutItemsInput
  connect: PlaylistWhereUniqueInput
}

input PlaylistCreateWithoutChildrenInput {
  name: String!
  childrenName: String
  description: String
  metadata: Json
  parent: PlaylistCreateOneWithoutChildrenInput
  items: PlaylistItemCreateManyWithoutPlayListInput
  user: UserCreateOneWithoutPlaylistsInput
  service: ServiceCreateOneInput!
}

input PlaylistCreateWithoutItemsInput {
  name: String!
  childrenName: String
  description: String
  metadata: Json
  parent: PlaylistCreateOneWithoutChildrenInput
  children: PlaylistCreateManyWithoutParentInput
  user: UserCreateOneWithoutPlaylistsInput
  service: ServiceCreateOneInput!
}

input PlaylistCreateWithoutParentInput {
  name: String!
  childrenName: String
  description: String
  metadata: Json
  children: PlaylistCreateManyWithoutParentInput
  items: PlaylistItemCreateManyWithoutPlayListInput
  user: UserCreateOneWithoutPlaylistsInput
  service: ServiceCreateOneInput!
}

input PlaylistCreateWithoutUserInput {
  name: String!
  childrenName: String
  description: String
  metadata: Json
  parent: PlaylistCreateOneWithoutChildrenInput
  children: PlaylistCreateManyWithoutParentInput
  items: PlaylistItemCreateManyWithoutPlayListInput
  service: ServiceCreateOneInput!
}

type PlaylistEdge {
  node: Playlist!
  cursor: String!
}

type PlaylistItem {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  metadata: Json!
  playList: Playlist!
  video: Video!
}

type PlaylistItemConnection {
  pageInfo: PageInfo!
  edges: [PlaylistItemEdge]!
  aggregate: AggregatePlaylistItem!
}

input PlaylistItemCreateInput {
  metadata: Json
  playList: PlaylistCreateOneWithoutItemsInput!
  video: VideoCreateOneWithoutPlayListItemsInput!
}

input PlaylistItemCreateManyWithoutPlayListInput {
  create: [PlaylistItemCreateWithoutPlayListInput!]
  connect: [PlaylistItemWhereUniqueInput!]
}

input PlaylistItemCreateManyWithoutVideoInput {
  create: [PlaylistItemCreateWithoutVideoInput!]
  connect: [PlaylistItemWhereUniqueInput!]
}

input PlaylistItemCreateWithoutPlayListInput {
  metadata: Json
  video: VideoCreateOneWithoutPlayListItemsInput!
}

input PlaylistItemCreateWithoutVideoInput {
  metadata: Json
  playList: PlaylistCreateOneWithoutItemsInput!
}

type PlaylistItemEdge {
  node: PlaylistItem!
  cursor: String!
}

enum PlaylistItemOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  metadata_ASC
  metadata_DESC
}

type PlaylistItemPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  metadata: Json!
}

input PlaylistItemScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [PlaylistItemScalarWhereInput!]
  OR: [PlaylistItemScalarWhereInput!]
  NOT: [PlaylistItemScalarWhereInput!]
}

type PlaylistItemSubscriptionPayload {
  mutation: MutationType!
  node: PlaylistItem
  updatedFields: [String!]
  previousValues: PlaylistItemPreviousValues
}

input PlaylistItemSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PlaylistItemWhereInput
  AND: [PlaylistItemSubscriptionWhereInput!]
  OR: [PlaylistItemSubscriptionWhereInput!]
  NOT: [PlaylistItemSubscriptionWhereInput!]
}

input PlaylistItemUpdateInput {
  metadata: Json
  playList: PlaylistUpdateOneRequiredWithoutItemsInput
  video: VideoUpdateOneRequiredWithoutPlayListItemsInput
}

input PlaylistItemUpdateManyDataInput {
  metadata: Json
}

input PlaylistItemUpdateManyMutationInput {
  metadata: Json
}

input PlaylistItemUpdateManyWithoutPlayListInput {
  create: [PlaylistItemCreateWithoutPlayListInput!]
  delete: [PlaylistItemWhereUniqueInput!]
  connect: [PlaylistItemWhereUniqueInput!]
  disconnect: [PlaylistItemWhereUniqueInput!]
  update: [PlaylistItemUpdateWithWhereUniqueWithoutPlayListInput!]
  upsert: [PlaylistItemUpsertWithWhereUniqueWithoutPlayListInput!]
  deleteMany: [PlaylistItemScalarWhereInput!]
  updateMany: [PlaylistItemUpdateManyWithWhereNestedInput!]
}

input PlaylistItemUpdateManyWithoutVideoInput {
  create: [PlaylistItemCreateWithoutVideoInput!]
  delete: [PlaylistItemWhereUniqueInput!]
  connect: [PlaylistItemWhereUniqueInput!]
  disconnect: [PlaylistItemWhereUniqueInput!]
  update: [PlaylistItemUpdateWithWhereUniqueWithoutVideoInput!]
  upsert: [PlaylistItemUpsertWithWhereUniqueWithoutVideoInput!]
  deleteMany: [PlaylistItemScalarWhereInput!]
  updateMany: [PlaylistItemUpdateManyWithWhereNestedInput!]
}

input PlaylistItemUpdateManyWithWhereNestedInput {
  where: PlaylistItemScalarWhereInput!
  data: PlaylistItemUpdateManyDataInput!
}

input PlaylistItemUpdateWithoutPlayListDataInput {
  metadata: Json
  video: VideoUpdateOneRequiredWithoutPlayListItemsInput
}

input PlaylistItemUpdateWithoutVideoDataInput {
  metadata: Json
  playList: PlaylistUpdateOneRequiredWithoutItemsInput
}

input PlaylistItemUpdateWithWhereUniqueWithoutPlayListInput {
  where: PlaylistItemWhereUniqueInput!
  data: PlaylistItemUpdateWithoutPlayListDataInput!
}

input PlaylistItemUpdateWithWhereUniqueWithoutVideoInput {
  where: PlaylistItemWhereUniqueInput!
  data: PlaylistItemUpdateWithoutVideoDataInput!
}

input PlaylistItemUpsertWithWhereUniqueWithoutPlayListInput {
  where: PlaylistItemWhereUniqueInput!
  update: PlaylistItemUpdateWithoutPlayListDataInput!
  create: PlaylistItemCreateWithoutPlayListInput!
}

input PlaylistItemUpsertWithWhereUniqueWithoutVideoInput {
  where: PlaylistItemWhereUniqueInput!
  update: PlaylistItemUpdateWithoutVideoDataInput!
  create: PlaylistItemCreateWithoutVideoInput!
}

input PlaylistItemWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  playList: PlaylistWhereInput
  video: VideoWhereInput
  AND: [PlaylistItemWhereInput!]
  OR: [PlaylistItemWhereInput!]
  NOT: [PlaylistItemWhereInput!]
}

input PlaylistItemWhereUniqueInput {
  id: ID
}

enum PlaylistOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  childrenName_ASC
  childrenName_DESC
  description_ASC
  description_DESC
  metadata_ASC
  metadata_DESC
}

type PlaylistPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  childrenName: String
  description: String
  metadata: Json!
}

input PlaylistScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  childrenName: String
  childrenName_not: String
  childrenName_in: [String!]
  childrenName_not_in: [String!]
  childrenName_lt: String
  childrenName_lte: String
  childrenName_gt: String
  childrenName_gte: String
  childrenName_contains: String
  childrenName_not_contains: String
  childrenName_starts_with: String
  childrenName_not_starts_with: String
  childrenName_ends_with: String
  childrenName_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [PlaylistScalarWhereInput!]
  OR: [PlaylistScalarWhereInput!]
  NOT: [PlaylistScalarWhereInput!]
}

type PlaylistSubscriptionPayload {
  mutation: MutationType!
  node: Playlist
  updatedFields: [String!]
  previousValues: PlaylistPreviousValues
}

input PlaylistSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PlaylistWhereInput
  AND: [PlaylistSubscriptionWhereInput!]
  OR: [PlaylistSubscriptionWhereInput!]
  NOT: [PlaylistSubscriptionWhereInput!]
}

input PlaylistUpdateInput {
  name: String
  childrenName: String
  description: String
  metadata: Json
  parent: PlaylistUpdateOneWithoutChildrenInput
  children: PlaylistUpdateManyWithoutParentInput
  items: PlaylistItemUpdateManyWithoutPlayListInput
  user: UserUpdateOneWithoutPlaylistsInput
  service: ServiceUpdateOneRequiredInput
}

input PlaylistUpdateManyDataInput {
  name: String
  childrenName: String
  description: String
  metadata: Json
}

input PlaylistUpdateManyMutationInput {
  name: String
  childrenName: String
  description: String
  metadata: Json
}

input PlaylistUpdateManyWithoutParentInput {
  create: [PlaylistCreateWithoutParentInput!]
  delete: [PlaylistWhereUniqueInput!]
  connect: [PlaylistWhereUniqueInput!]
  disconnect: [PlaylistWhereUniqueInput!]
  update: [PlaylistUpdateWithWhereUniqueWithoutParentInput!]
  upsert: [PlaylistUpsertWithWhereUniqueWithoutParentInput!]
  deleteMany: [PlaylistScalarWhereInput!]
  updateMany: [PlaylistUpdateManyWithWhereNestedInput!]
}

input PlaylistUpdateManyWithoutUserInput {
  create: [PlaylistCreateWithoutUserInput!]
  delete: [PlaylistWhereUniqueInput!]
  connect: [PlaylistWhereUniqueInput!]
  disconnect: [PlaylistWhereUniqueInput!]
  update: [PlaylistUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [PlaylistUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [PlaylistScalarWhereInput!]
  updateMany: [PlaylistUpdateManyWithWhereNestedInput!]
}

input PlaylistUpdateManyWithWhereNestedInput {
  where: PlaylistScalarWhereInput!
  data: PlaylistUpdateManyDataInput!
}

input PlaylistUpdateOneRequiredWithoutItemsInput {
  create: PlaylistCreateWithoutItemsInput
  update: PlaylistUpdateWithoutItemsDataInput
  upsert: PlaylistUpsertWithoutItemsInput
  connect: PlaylistWhereUniqueInput
}

input PlaylistUpdateOneWithoutChildrenInput {
  create: PlaylistCreateWithoutChildrenInput
  update: PlaylistUpdateWithoutChildrenDataInput
  upsert: PlaylistUpsertWithoutChildrenInput
  delete: Boolean
  disconnect: Boolean
  connect: PlaylistWhereUniqueInput
}

input PlaylistUpdateWithoutChildrenDataInput {
  name: String
  childrenName: String
  description: String
  metadata: Json
  parent: PlaylistUpdateOneWithoutChildrenInput
  items: PlaylistItemUpdateManyWithoutPlayListInput
  user: UserUpdateOneWithoutPlaylistsInput
  service: ServiceUpdateOneRequiredInput
}

input PlaylistUpdateWithoutItemsDataInput {
  name: String
  childrenName: String
  description: String
  metadata: Json
  parent: PlaylistUpdateOneWithoutChildrenInput
  children: PlaylistUpdateManyWithoutParentInput
  user: UserUpdateOneWithoutPlaylistsInput
  service: ServiceUpdateOneRequiredInput
}

input PlaylistUpdateWithoutParentDataInput {
  name: String
  childrenName: String
  description: String
  metadata: Json
  children: PlaylistUpdateManyWithoutParentInput
  items: PlaylistItemUpdateManyWithoutPlayListInput
  user: UserUpdateOneWithoutPlaylistsInput
  service: ServiceUpdateOneRequiredInput
}

input PlaylistUpdateWithoutUserDataInput {
  name: String
  childrenName: String
  description: String
  metadata: Json
  parent: PlaylistUpdateOneWithoutChildrenInput
  children: PlaylistUpdateManyWithoutParentInput
  items: PlaylistItemUpdateManyWithoutPlayListInput
  service: ServiceUpdateOneRequiredInput
}

input PlaylistUpdateWithWhereUniqueWithoutParentInput {
  where: PlaylistWhereUniqueInput!
  data: PlaylistUpdateWithoutParentDataInput!
}

input PlaylistUpdateWithWhereUniqueWithoutUserInput {
  where: PlaylistWhereUniqueInput!
  data: PlaylistUpdateWithoutUserDataInput!
}

input PlaylistUpsertWithoutChildrenInput {
  update: PlaylistUpdateWithoutChildrenDataInput!
  create: PlaylistCreateWithoutChildrenInput!
}

input PlaylistUpsertWithoutItemsInput {
  update: PlaylistUpdateWithoutItemsDataInput!
  create: PlaylistCreateWithoutItemsInput!
}

input PlaylistUpsertWithWhereUniqueWithoutParentInput {
  where: PlaylistWhereUniqueInput!
  update: PlaylistUpdateWithoutParentDataInput!
  create: PlaylistCreateWithoutParentInput!
}

input PlaylistUpsertWithWhereUniqueWithoutUserInput {
  where: PlaylistWhereUniqueInput!
  update: PlaylistUpdateWithoutUserDataInput!
  create: PlaylistCreateWithoutUserInput!
}

input PlaylistWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  childrenName: String
  childrenName_not: String
  childrenName_in: [String!]
  childrenName_not_in: [String!]
  childrenName_lt: String
  childrenName_lte: String
  childrenName_gt: String
  childrenName_gte: String
  childrenName_contains: String
  childrenName_not_contains: String
  childrenName_starts_with: String
  childrenName_not_starts_with: String
  childrenName_ends_with: String
  childrenName_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  parent: PlaylistWhereInput
  children_every: PlaylistWhereInput
  children_some: PlaylistWhereInput
  children_none: PlaylistWhereInput
  items_every: PlaylistItemWhereInput
  items_some: PlaylistItemWhereInput
  items_none: PlaylistItemWhereInput
  user: UserWhereInput
  service: ServiceWhereInput
  AND: [PlaylistWhereInput!]
  OR: [PlaylistWhereInput!]
  NOT: [PlaylistWhereInput!]
}

input PlaylistWhereUniqueInput {
  id: ID
}

type Query {
  article(where: ArticleWhereUniqueInput!): Article
  articles(where: ArticleWhereInput, orderBy: ArticleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Article]!
  articlesConnection(where: ArticleWhereInput, orderBy: ArticleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ArticleConnection!
  articleSection(where: ArticleSectionWhereUniqueInput!): ArticleSection
  articleSections(where: ArticleSectionWhereInput, orderBy: ArticleSectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ArticleSection]!
  articleSectionsConnection(where: ArticleSectionWhereInput, orderBy: ArticleSectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ArticleSectionConnection!
  playlist(where: PlaylistWhereUniqueInput!): Playlist
  playlists(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist]!
  playlistsConnection(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PlaylistConnection!
  playlistItem(where: PlaylistItemWhereUniqueInput!): PlaylistItem
  playlistItems(where: PlaylistItemWhereInput, orderBy: PlaylistItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PlaylistItem]!
  playlistItemsConnection(where: PlaylistItemWhereInput, orderBy: PlaylistItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PlaylistItemConnection!
  service(where: ServiceWhereUniqueInput!): Service
  services(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Service]!
  servicesConnection(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ServiceConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  video(where: VideoWhereUniqueInput!): Video
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video]!
  videosConnection(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConnection!
  node(id: ID!): Node
}

type Service {
  id: ID!
  name: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles(where: ArticleWhereInput, orderBy: ArticleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Article!]
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
}

type ServiceConnection {
  pageInfo: PageInfo!
  edges: [ServiceEdge]!
  aggregate: AggregateService!
}

input ServiceCreateInput {
  name: ID!
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles: ArticleCreateManyWithoutServiceInput
  users: UserCreateManyWithoutServicesInput
  videos: VideoCreateManyWithoutServiceInput
}

input ServiceCreateManyWithoutUsersInput {
  create: [ServiceCreateWithoutUsersInput!]
  connect: [ServiceWhereUniqueInput!]
}

input ServiceCreateOneInput {
  create: ServiceCreateInput
  connect: ServiceWhereUniqueInput
}

input ServiceCreateOneWithoutArticlesInput {
  create: ServiceCreateWithoutArticlesInput
  connect: ServiceWhereUniqueInput
}

input ServiceCreateOneWithoutVideosInput {
  create: ServiceCreateWithoutVideosInput
  connect: ServiceWhereUniqueInput
}

input ServiceCreateWithoutArticlesInput {
  name: ID!
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  users: UserCreateManyWithoutServicesInput
  videos: VideoCreateManyWithoutServiceInput
}

input ServiceCreateWithoutUsersInput {
  name: ID!
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles: ArticleCreateManyWithoutServiceInput
  videos: VideoCreateManyWithoutServiceInput
}

input ServiceCreateWithoutVideosInput {
  name: ID!
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles: ArticleCreateManyWithoutServiceInput
  users: UserCreateManyWithoutServicesInput
}

type ServiceEdge {
  node: Service!
  cursor: String!
}

enum ServiceOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  language_ASC
  language_DESC
  url_ASC
  url_DESC
  liveUrl_ASC
  liveUrl_DESC
  videoUrl_ASC
  videoUrl_DESC
  videoRestUrl_ASC
  videoRestUrl_DESC
}

type ServicePreviousValues {
  id: ID!
  name: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
}

input ServiceScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: ID
  name_not: ID
  name_in: [ID!]
  name_not_in: [ID!]
  name_lt: ID
  name_lte: ID
  name_gt: ID
  name_gte: ID
  name_contains: ID
  name_not_contains: ID
  name_starts_with: ID
  name_not_starts_with: ID
  name_ends_with: ID
  name_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  language: LANGUAGE
  language_not: LANGUAGE
  language_in: [LANGUAGE!]
  language_not_in: [LANGUAGE!]
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  liveUrl: String
  liveUrl_not: String
  liveUrl_in: [String!]
  liveUrl_not_in: [String!]
  liveUrl_lt: String
  liveUrl_lte: String
  liveUrl_gt: String
  liveUrl_gte: String
  liveUrl_contains: String
  liveUrl_not_contains: String
  liveUrl_starts_with: String
  liveUrl_not_starts_with: String
  liveUrl_ends_with: String
  liveUrl_not_ends_with: String
  videoUrl: String
  videoUrl_not: String
  videoUrl_in: [String!]
  videoUrl_not_in: [String!]
  videoUrl_lt: String
  videoUrl_lte: String
  videoUrl_gt: String
  videoUrl_gte: String
  videoUrl_contains: String
  videoUrl_not_contains: String
  videoUrl_starts_with: String
  videoUrl_not_starts_with: String
  videoUrl_ends_with: String
  videoUrl_not_ends_with: String
  videoRestUrl: String
  videoRestUrl_not: String
  videoRestUrl_in: [String!]
  videoRestUrl_not_in: [String!]
  videoRestUrl_lt: String
  videoRestUrl_lte: String
  videoRestUrl_gt: String
  videoRestUrl_gte: String
  videoRestUrl_contains: String
  videoRestUrl_not_contains: String
  videoRestUrl_starts_with: String
  videoRestUrl_not_starts_with: String
  videoRestUrl_ends_with: String
  videoRestUrl_not_ends_with: String
  AND: [ServiceScalarWhereInput!]
  OR: [ServiceScalarWhereInput!]
  NOT: [ServiceScalarWhereInput!]
}

type ServiceSubscriptionPayload {
  mutation: MutationType!
  node: Service
  updatedFields: [String!]
  previousValues: ServicePreviousValues
}

input ServiceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ServiceWhereInput
  AND: [ServiceSubscriptionWhereInput!]
  OR: [ServiceSubscriptionWhereInput!]
  NOT: [ServiceSubscriptionWhereInput!]
}

input ServiceUpdateDataInput {
  name: ID
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles: ArticleUpdateManyWithoutServiceInput
  users: UserUpdateManyWithoutServicesInput
  videos: VideoUpdateManyWithoutServiceInput
}

input ServiceUpdateInput {
  name: ID
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles: ArticleUpdateManyWithoutServiceInput
  users: UserUpdateManyWithoutServicesInput
  videos: VideoUpdateManyWithoutServiceInput
}

input ServiceUpdateManyDataInput {
  name: ID
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
}

input ServiceUpdateManyMutationInput {
  name: ID
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
}

input ServiceUpdateManyWithoutUsersInput {
  create: [ServiceCreateWithoutUsersInput!]
  delete: [ServiceWhereUniqueInput!]
  connect: [ServiceWhereUniqueInput!]
  disconnect: [ServiceWhereUniqueInput!]
  update: [ServiceUpdateWithWhereUniqueWithoutUsersInput!]
  upsert: [ServiceUpsertWithWhereUniqueWithoutUsersInput!]
  deleteMany: [ServiceScalarWhereInput!]
  updateMany: [ServiceUpdateManyWithWhereNestedInput!]
}

input ServiceUpdateManyWithWhereNestedInput {
  where: ServiceScalarWhereInput!
  data: ServiceUpdateManyDataInput!
}

input ServiceUpdateOneRequiredInput {
  create: ServiceCreateInput
  update: ServiceUpdateDataInput
  upsert: ServiceUpsertNestedInput
  connect: ServiceWhereUniqueInput
}

input ServiceUpdateOneRequiredWithoutArticlesInput {
  create: ServiceCreateWithoutArticlesInput
  update: ServiceUpdateWithoutArticlesDataInput
  upsert: ServiceUpsertWithoutArticlesInput
  connect: ServiceWhereUniqueInput
}

input ServiceUpdateOneRequiredWithoutVideosInput {
  create: ServiceCreateWithoutVideosInput
  update: ServiceUpdateWithoutVideosDataInput
  upsert: ServiceUpsertWithoutVideosInput
  connect: ServiceWhereUniqueInput
}

input ServiceUpdateWithoutArticlesDataInput {
  name: ID
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  users: UserUpdateManyWithoutServicesInput
  videos: VideoUpdateManyWithoutServiceInput
}

input ServiceUpdateWithoutUsersDataInput {
  name: ID
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles: ArticleUpdateManyWithoutServiceInput
  videos: VideoUpdateManyWithoutServiceInput
}

input ServiceUpdateWithoutVideosDataInput {
  name: ID
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles: ArticleUpdateManyWithoutServiceInput
  users: UserUpdateManyWithoutServicesInput
}

input ServiceUpdateWithWhereUniqueWithoutUsersInput {
  where: ServiceWhereUniqueInput!
  data: ServiceUpdateWithoutUsersDataInput!
}

input ServiceUpsertNestedInput {
  update: ServiceUpdateDataInput!
  create: ServiceCreateInput!
}

input ServiceUpsertWithoutArticlesInput {
  update: ServiceUpdateWithoutArticlesDataInput!
  create: ServiceCreateWithoutArticlesInput!
}

input ServiceUpsertWithoutVideosInput {
  update: ServiceUpdateWithoutVideosDataInput!
  create: ServiceCreateWithoutVideosInput!
}

input ServiceUpsertWithWhereUniqueWithoutUsersInput {
  where: ServiceWhereUniqueInput!
  update: ServiceUpdateWithoutUsersDataInput!
  create: ServiceCreateWithoutUsersInput!
}

input ServiceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: ID
  name_not: ID
  name_in: [ID!]
  name_not_in: [ID!]
  name_lt: ID
  name_lte: ID
  name_gt: ID
  name_gte: ID
  name_contains: ID
  name_not_contains: ID
  name_starts_with: ID
  name_not_starts_with: ID
  name_ends_with: ID
  name_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  language: LANGUAGE
  language_not: LANGUAGE
  language_in: [LANGUAGE!]
  language_not_in: [LANGUAGE!]
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  liveUrl: String
  liveUrl_not: String
  liveUrl_in: [String!]
  liveUrl_not_in: [String!]
  liveUrl_lt: String
  liveUrl_lte: String
  liveUrl_gt: String
  liveUrl_gte: String
  liveUrl_contains: String
  liveUrl_not_contains: String
  liveUrl_starts_with: String
  liveUrl_not_starts_with: String
  liveUrl_ends_with: String
  liveUrl_not_ends_with: String
  videoUrl: String
  videoUrl_not: String
  videoUrl_in: [String!]
  videoUrl_not_in: [String!]
  videoUrl_lt: String
  videoUrl_lte: String
  videoUrl_gt: String
  videoUrl_gte: String
  videoUrl_contains: String
  videoUrl_not_contains: String
  videoUrl_starts_with: String
  videoUrl_not_starts_with: String
  videoUrl_ends_with: String
  videoUrl_not_ends_with: String
  videoRestUrl: String
  videoRestUrl_not: String
  videoRestUrl_in: [String!]
  videoRestUrl_not_in: [String!]
  videoRestUrl_lt: String
  videoRestUrl_lte: String
  videoRestUrl_gt: String
  videoRestUrl_gte: String
  videoRestUrl_contains: String
  videoRestUrl_not_contains: String
  videoRestUrl_starts_with: String
  videoRestUrl_not_starts_with: String
  videoRestUrl_ends_with: String
  videoRestUrl_not_ends_with: String
  articles_every: ArticleWhereInput
  articles_some: ArticleWhereInput
  articles_none: ArticleWhereInput
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
  videos_every: VideoWhereInput
  videos_some: VideoWhereInput
  videos_none: VideoWhereInput
  AND: [ServiceWhereInput!]
  OR: [ServiceWhereInput!]
  NOT: [ServiceWhereInput!]
}

input ServiceWhereUniqueInput {
  id: ID
  name: ID
}

enum SOURCE_TYPE {
  CLIPS
  MEDIAFNS
  YOUTUBE
}

type Subscription {
  article(where: ArticleSubscriptionWhereInput): ArticleSubscriptionPayload
  articleSection(where: ArticleSectionSubscriptionWhereInput): ArticleSectionSubscriptionPayload
  playlist(where: PlaylistSubscriptionWhereInput): PlaylistSubscriptionPayload
  playlistItem(where: PlaylistItemSubscriptionWhereInput): PlaylistItemSubscriptionPayload
  service(where: ServiceSubscriptionWhereInput): ServiceSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  video(where: VideoSubscriptionWhereInput): VideoSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
  services(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Service!]
  playlists(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  name: String
  services: ServiceCreateManyWithoutUsersInput
  playlists: PlaylistCreateManyWithoutUserInput
}

input UserCreateManyWithoutServicesInput {
  create: [UserCreateWithoutServicesInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutPlaylistsInput {
  create: UserCreateWithoutPlaylistsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutPlaylistsInput {
  email: String!
  name: String
  services: ServiceCreateManyWithoutUsersInput
}

input UserCreateWithoutServicesInput {
  email: String!
  name: String
  playlists: PlaylistCreateManyWithoutUserInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  name: String
  services: ServiceUpdateManyWithoutUsersInput
  playlists: PlaylistUpdateManyWithoutUserInput
}

input UserUpdateManyDataInput {
  email: String
  name: String
}

input UserUpdateManyMutationInput {
  email: String
  name: String
}

input UserUpdateManyWithoutServicesInput {
  create: [UserCreateWithoutServicesInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutServicesInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutServicesInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneWithoutPlaylistsInput {
  create: UserCreateWithoutPlaylistsInput
  update: UserUpdateWithoutPlaylistsDataInput
  upsert: UserUpsertWithoutPlaylistsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutPlaylistsDataInput {
  email: String
  name: String
  services: ServiceUpdateManyWithoutUsersInput
}

input UserUpdateWithoutServicesDataInput {
  email: String
  name: String
  playlists: PlaylistUpdateManyWithoutUserInput
}

input UserUpdateWithWhereUniqueWithoutServicesInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutServicesDataInput!
}

input UserUpsertWithoutPlaylistsInput {
  update: UserUpdateWithoutPlaylistsDataInput!
  create: UserCreateWithoutPlaylistsInput!
}

input UserUpsertWithWhereUniqueWithoutServicesInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutServicesDataInput!
  create: UserCreateWithoutServicesInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  services_every: ServiceWhereInput
  services_some: ServiceWhereInput
  services_none: ServiceWhereInput
  playlists_every: PlaylistWhereInput
  playlists_some: PlaylistWhereInput
  playlists_none: PlaylistWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Video {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  description: String
  datePublished: DateTime
  dateFirstPublished: DateTime
  paid: Boolean!
  sourceId: String!
  sourceType: SOURCE_TYPE!
  tags: [String!]!
  metadata: Json!
  playListItems(where: PlaylistItemWhereInput, orderBy: PlaylistItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PlaylistItem!]
  service: Service!
}

type VideoConnection {
  pageInfo: PageInfo!
  edges: [VideoEdge]!
  aggregate: AggregateVideo!
}

input VideoCreateInput {
  name: String!
  description: String
  datePublished: DateTime
  dateFirstPublished: DateTime
  paid: Boolean
  sourceId: String!
  sourceType: SOURCE_TYPE!
  tags: VideoCreatetagsInput
  metadata: Json
  playListItems: PlaylistItemCreateManyWithoutVideoInput
  service: ServiceCreateOneWithoutVideosInput!
}

input VideoCreateManyWithoutServiceInput {
  create: [VideoCreateWithoutServiceInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateOneWithoutPlayListItemsInput {
  create: VideoCreateWithoutPlayListItemsInput
  connect: VideoWhereUniqueInput
}

input VideoCreatetagsInput {
  set: [String!]
}

input VideoCreateWithoutPlayListItemsInput {
  name: String!
  description: String
  datePublished: DateTime
  dateFirstPublished: DateTime
  paid: Boolean
  sourceId: String!
  sourceType: SOURCE_TYPE!
  tags: VideoCreatetagsInput
  metadata: Json
  service: ServiceCreateOneWithoutVideosInput!
}

input VideoCreateWithoutServiceInput {
  name: String!
  description: String
  datePublished: DateTime
  dateFirstPublished: DateTime
  paid: Boolean
  sourceId: String!
  sourceType: SOURCE_TYPE!
  tags: VideoCreatetagsInput
  metadata: Json
  playListItems: PlaylistItemCreateManyWithoutVideoInput
}

type VideoEdge {
  node: Video!
  cursor: String!
}

enum VideoOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  datePublished_ASC
  datePublished_DESC
  dateFirstPublished_ASC
  dateFirstPublished_DESC
  paid_ASC
  paid_DESC
  sourceId_ASC
  sourceId_DESC
  sourceType_ASC
  sourceType_DESC
  metadata_ASC
  metadata_DESC
}

type VideoPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  description: String
  datePublished: DateTime
  dateFirstPublished: DateTime
  paid: Boolean!
  sourceId: String!
  sourceType: SOURCE_TYPE!
  tags: [String!]!
  metadata: Json!
}

input VideoScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  datePublished: DateTime
  datePublished_not: DateTime
  datePublished_in: [DateTime!]
  datePublished_not_in: [DateTime!]
  datePublished_lt: DateTime
  datePublished_lte: DateTime
  datePublished_gt: DateTime
  datePublished_gte: DateTime
  dateFirstPublished: DateTime
  dateFirstPublished_not: DateTime
  dateFirstPublished_in: [DateTime!]
  dateFirstPublished_not_in: [DateTime!]
  dateFirstPublished_lt: DateTime
  dateFirstPublished_lte: DateTime
  dateFirstPublished_gt: DateTime
  dateFirstPublished_gte: DateTime
  paid: Boolean
  paid_not: Boolean
  sourceId: String
  sourceId_not: String
  sourceId_in: [String!]
  sourceId_not_in: [String!]
  sourceId_lt: String
  sourceId_lte: String
  sourceId_gt: String
  sourceId_gte: String
  sourceId_contains: String
  sourceId_not_contains: String
  sourceId_starts_with: String
  sourceId_not_starts_with: String
  sourceId_ends_with: String
  sourceId_not_ends_with: String
  sourceType: SOURCE_TYPE
  sourceType_not: SOURCE_TYPE
  sourceType_in: [SOURCE_TYPE!]
  sourceType_not_in: [SOURCE_TYPE!]
  AND: [VideoScalarWhereInput!]
  OR: [VideoScalarWhereInput!]
  NOT: [VideoScalarWhereInput!]
}

type VideoSubscriptionPayload {
  mutation: MutationType!
  node: Video
  updatedFields: [String!]
  previousValues: VideoPreviousValues
}

input VideoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoWhereInput
  AND: [VideoSubscriptionWhereInput!]
  OR: [VideoSubscriptionWhereInput!]
  NOT: [VideoSubscriptionWhereInput!]
}

input VideoUpdateInput {
  name: String
  description: String
  datePublished: DateTime
  dateFirstPublished: DateTime
  paid: Boolean
  sourceId: String
  sourceType: SOURCE_TYPE
  tags: VideoUpdatetagsInput
  metadata: Json
  playListItems: PlaylistItemUpdateManyWithoutVideoInput
  service: ServiceUpdateOneRequiredWithoutVideosInput
}

input VideoUpdateManyDataInput {
  name: String
  description: String
  datePublished: DateTime
  dateFirstPublished: DateTime
  paid: Boolean
  sourceId: String
  sourceType: SOURCE_TYPE
  tags: VideoUpdatetagsInput
  metadata: Json
}

input VideoUpdateManyMutationInput {
  name: String
  description: String
  datePublished: DateTime
  dateFirstPublished: DateTime
  paid: Boolean
  sourceId: String
  sourceType: SOURCE_TYPE
  tags: VideoUpdatetagsInput
  metadata: Json
}

input VideoUpdateManyWithoutServiceInput {
  create: [VideoCreateWithoutServiceInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutServiceInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutServiceInput!]
  deleteMany: [VideoScalarWhereInput!]
  updateMany: [VideoUpdateManyWithWhereNestedInput!]
}

input VideoUpdateManyWithWhereNestedInput {
  where: VideoScalarWhereInput!
  data: VideoUpdateManyDataInput!
}

input VideoUpdateOneRequiredWithoutPlayListItemsInput {
  create: VideoCreateWithoutPlayListItemsInput
  update: VideoUpdateWithoutPlayListItemsDataInput
  upsert: VideoUpsertWithoutPlayListItemsInput
  connect: VideoWhereUniqueInput
}

input VideoUpdatetagsInput {
  set: [String!]
}

input VideoUpdateWithoutPlayListItemsDataInput {
  name: String
  description: String
  datePublished: DateTime
  dateFirstPublished: DateTime
  paid: Boolean
  sourceId: String
  sourceType: SOURCE_TYPE
  tags: VideoUpdatetagsInput
  metadata: Json
  service: ServiceUpdateOneRequiredWithoutVideosInput
}

input VideoUpdateWithoutServiceDataInput {
  name: String
  description: String
  datePublished: DateTime
  dateFirstPublished: DateTime
  paid: Boolean
  sourceId: String
  sourceType: SOURCE_TYPE
  tags: VideoUpdatetagsInput
  metadata: Json
  playListItems: PlaylistItemUpdateManyWithoutVideoInput
}

input VideoUpdateWithWhereUniqueWithoutServiceInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutServiceDataInput!
}

input VideoUpsertWithoutPlayListItemsInput {
  update: VideoUpdateWithoutPlayListItemsDataInput!
  create: VideoCreateWithoutPlayListItemsInput!
}

input VideoUpsertWithWhereUniqueWithoutServiceInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateWithoutServiceDataInput!
  create: VideoCreateWithoutServiceInput!
}

input VideoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  datePublished: DateTime
  datePublished_not: DateTime
  datePublished_in: [DateTime!]
  datePublished_not_in: [DateTime!]
  datePublished_lt: DateTime
  datePublished_lte: DateTime
  datePublished_gt: DateTime
  datePublished_gte: DateTime
  dateFirstPublished: DateTime
  dateFirstPublished_not: DateTime
  dateFirstPublished_in: [DateTime!]
  dateFirstPublished_not_in: [DateTime!]
  dateFirstPublished_lt: DateTime
  dateFirstPublished_lte: DateTime
  dateFirstPublished_gt: DateTime
  dateFirstPublished_gte: DateTime
  paid: Boolean
  paid_not: Boolean
  sourceId: String
  sourceId_not: String
  sourceId_in: [String!]
  sourceId_not_in: [String!]
  sourceId_lt: String
  sourceId_lte: String
  sourceId_gt: String
  sourceId_gte: String
  sourceId_contains: String
  sourceId_not_contains: String
  sourceId_starts_with: String
  sourceId_not_starts_with: String
  sourceId_ends_with: String
  sourceId_not_ends_with: String
  sourceType: SOURCE_TYPE
  sourceType_not: SOURCE_TYPE
  sourceType_in: [SOURCE_TYPE!]
  sourceType_not_in: [SOURCE_TYPE!]
  playListItems_every: PlaylistItemWhereInput
  playListItems_some: PlaylistItemWhereInput
  playListItems_none: PlaylistItemWhereInput
  service: ServiceWhereInput
  AND: [VideoWhereInput!]
  OR: [VideoWhereInput!]
  NOT: [VideoWhereInput!]
}

input VideoWhereUniqueInput {
  id: ID
  sourceId: String
}
`
      }
    