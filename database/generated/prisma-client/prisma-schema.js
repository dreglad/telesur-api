module.exports = {
        typeDefs: /* GraphQL */ `type AggregateArticle {
  count: Int!
}

type AggregateArticleSection {
  count: Int!
}

type AggregateService {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Article {
  id: ID!
  url: String!
  headline: String!
  description: String
  datePublished: DateTime!
  body: String!
  bodyMarkdown: String
  author: String
  tags: [String!]!
  images: [String!]!
  section: ArticleSection
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
  body: String!
  bodyMarkdown: String
  author: String
  tags: ArticleCreatetagsInput
  images: ArticleCreateimagesInput
  section: ArticleSectionCreateOneWithoutArticlesInput
  service: ServiceCreateOneWithoutArticlesInput!
}

input ArticleCreateManyWithoutSectionInput {
  create: [ArticleCreateWithoutSectionInput!]
  connect: [ArticleWhereUniqueInput!]
}

input ArticleCreateManyWithoutServiceInput {
  create: [ArticleCreateWithoutServiceInput!]
  connect: [ArticleWhereUniqueInput!]
}

input ArticleCreatetagsInput {
  set: [String!]
}

input ArticleCreateWithoutSectionInput {
  url: String!
  headline: String!
  description: String
  datePublished: DateTime!
  body: String!
  bodyMarkdown: String
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
  body: String!
  bodyMarkdown: String
  author: String
  tags: ArticleCreatetagsInput
  images: ArticleCreateimagesInput
  section: ArticleSectionCreateOneWithoutArticlesInput
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
  headline_ASC
  headline_DESC
  description_ASC
  description_DESC
  datePublished_ASC
  datePublished_DESC
  body_ASC
  body_DESC
  bodyMarkdown_ASC
  bodyMarkdown_DESC
  author_ASC
  author_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ArticlePreviousValues {
  id: ID!
  url: String!
  headline: String!
  description: String
  datePublished: DateTime!
  body: String!
  bodyMarkdown: String
  author: String
  tags: [String!]!
  images: [String!]!
}

type ArticleSection {
  id: ID!
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
  articles: ArticleCreateManyWithoutSectionInput
}

input ArticleSectionCreateOneWithoutArticlesInput {
  create: ArticleSectionCreateWithoutArticlesInput
  connect: ArticleSectionWhereUniqueInput
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
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ArticleSectionPreviousValues {
  id: ID!
  name: String!
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
  articles: ArticleUpdateManyWithoutSectionInput
}

input ArticleSectionUpdateManyMutationInput {
  name: String
}

input ArticleSectionUpdateOneWithoutArticlesInput {
  create: ArticleSectionCreateWithoutArticlesInput
  update: ArticleSectionUpdateWithoutArticlesDataInput
  upsert: ArticleSectionUpsertWithoutArticlesInput
  delete: Boolean
  disconnect: Boolean
  connect: ArticleSectionWhereUniqueInput
}

input ArticleSectionUpdateWithoutArticlesDataInput {
  name: String
}

input ArticleSectionUpsertWithoutArticlesInput {
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
  body: String
  bodyMarkdown: String
  author: String
  tags: ArticleUpdatetagsInput
  images: ArticleUpdateimagesInput
  section: ArticleSectionUpdateOneWithoutArticlesInput
  service: ServiceUpdateOneRequiredWithoutArticlesInput
}

input ArticleUpdateManyMutationInput {
  url: String
  headline: String
  description: String
  datePublished: DateTime
  body: String
  bodyMarkdown: String
  author: String
  tags: ArticleUpdatetagsInput
  images: ArticleUpdateimagesInput
}

input ArticleUpdateManyWithoutSectionInput {
  create: [ArticleCreateWithoutSectionInput!]
  delete: [ArticleWhereUniqueInput!]
  connect: [ArticleWhereUniqueInput!]
  disconnect: [ArticleWhereUniqueInput!]
  update: [ArticleUpdateWithWhereUniqueWithoutSectionInput!]
  upsert: [ArticleUpsertWithWhereUniqueWithoutSectionInput!]
}

input ArticleUpdateManyWithoutServiceInput {
  create: [ArticleCreateWithoutServiceInput!]
  delete: [ArticleWhereUniqueInput!]
  connect: [ArticleWhereUniqueInput!]
  disconnect: [ArticleWhereUniqueInput!]
  update: [ArticleUpdateWithWhereUniqueWithoutServiceInput!]
  upsert: [ArticleUpsertWithWhereUniqueWithoutServiceInput!]
}

input ArticleUpdatetagsInput {
  set: [String!]
}

input ArticleUpdateWithoutSectionDataInput {
  url: String
  headline: String
  description: String
  datePublished: DateTime
  body: String
  bodyMarkdown: String
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
  body: String
  bodyMarkdown: String
  author: String
  tags: ArticleUpdatetagsInput
  images: ArticleUpdateimagesInput
  section: ArticleSectionUpdateOneWithoutArticlesInput
}

input ArticleUpdateWithWhereUniqueWithoutSectionInput {
  where: ArticleWhereUniqueInput!
  data: ArticleUpdateWithoutSectionDataInput!
}

input ArticleUpdateWithWhereUniqueWithoutServiceInput {
  where: ArticleWhereUniqueInput!
  data: ArticleUpdateWithoutServiceDataInput!
}

input ArticleUpsertWithWhereUniqueWithoutSectionInput {
  where: ArticleWhereUniqueInput!
  update: ArticleUpdateWithoutSectionDataInput!
  create: ArticleCreateWithoutSectionInput!
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
  bodyMarkdown: String
  bodyMarkdown_not: String
  bodyMarkdown_in: [String!]
  bodyMarkdown_not_in: [String!]
  bodyMarkdown_lt: String
  bodyMarkdown_lte: String
  bodyMarkdown_gt: String
  bodyMarkdown_gte: String
  bodyMarkdown_contains: String
  bodyMarkdown_not_contains: String
  bodyMarkdown_starts_with: String
  bodyMarkdown_not_starts_with: String
  bodyMarkdown_ends_with: String
  bodyMarkdown_not_ends_with: String
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
  section: ArticleSectionWhereInput
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

type Query {
  article(where: ArticleWhereUniqueInput!): Article
  articles(where: ArticleWhereInput, orderBy: ArticleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Article]!
  articlesConnection(where: ArticleWhereInput, orderBy: ArticleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ArticleConnection!
  articleSection(where: ArticleSectionWhereUniqueInput!): ArticleSection
  articleSections(where: ArticleSectionWhereInput, orderBy: ArticleSectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ArticleSection]!
  articleSectionsConnection(where: ArticleSectionWhereInput, orderBy: ArticleSectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ArticleSectionConnection!
  service(where: ServiceWhereUniqueInput!): Service
  services(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Service]!
  servicesConnection(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ServiceConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Service {
  id: ID!
  name: ID!
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles(where: ArticleWhereInput, orderBy: ArticleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Article!]
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
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
}

input ServiceCreateManyWithoutUsersInput {
  create: [ServiceCreateWithoutUsersInput!]
  connect: [ServiceWhereUniqueInput!]
}

input ServiceCreateOneWithoutArticlesInput {
  create: ServiceCreateWithoutArticlesInput
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
}

input ServiceCreateWithoutUsersInput {
  name: ID!
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles: ArticleCreateManyWithoutServiceInput
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
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ServicePreviousValues {
  id: ID!
  name: ID!
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
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

input ServiceUpdateInput {
  name: ID
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles: ArticleUpdateManyWithoutServiceInput
  users: UserUpdateManyWithoutServicesInput
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
}

input ServiceUpdateOneRequiredWithoutArticlesInput {
  create: ServiceCreateWithoutArticlesInput
  update: ServiceUpdateWithoutArticlesDataInput
  upsert: ServiceUpsertWithoutArticlesInput
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
}

input ServiceUpdateWithoutUsersDataInput {
  name: ID
  language: LANGUAGE
  url: String
  liveUrl: String
  videoUrl: String
  videoRestUrl: String
  articles: ArticleUpdateManyWithoutServiceInput
}

input ServiceUpdateWithWhereUniqueWithoutUsersInput {
  where: ServiceWhereUniqueInput!
  data: ServiceUpdateWithoutUsersDataInput!
}

input ServiceUpsertWithoutArticlesInput {
  update: ServiceUpdateWithoutArticlesDataInput!
  create: ServiceCreateWithoutArticlesInput!
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
  AND: [ServiceWhereInput!]
  OR: [ServiceWhereInput!]
  NOT: [ServiceWhereInput!]
}

input ServiceWhereUniqueInput {
  id: ID
  name: ID
}

type Subscription {
  article(where: ArticleSubscriptionWhereInput): ArticleSubscriptionPayload
  articleSection(where: ArticleSectionSubscriptionWhereInput): ArticleSectionSubscriptionPayload
  service(where: ServiceSubscriptionWhereInput): ServiceSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  name: String
  services(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Service!]
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
}

input UserCreateManyWithoutServicesInput {
  create: [UserCreateWithoutServicesInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateWithoutServicesInput {
  email: String!
  name: String
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
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  name: String
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
}

input UserUpdateWithoutServicesDataInput {
  email: String
  name: String
}

input UserUpdateWithWhereUniqueWithoutServicesInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutServicesDataInput!
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
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    