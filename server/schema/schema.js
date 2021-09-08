const graphql = require("graphql");
const _ = require("lodash");
const { products, manufacturers } = require("./dummyData");

// grab type classes from graphql package
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull, // for required fields
  GraphQLBoolean,
} = graphql;

console.log({ products });

// Define product type
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    manufacturer: {
      type: ManufacturerType,
      resolve(parent, args) {
        return _.find(manufacturers, { id: parent.manufacturerId });
      },
    },
    physical: {
      type: new GraphQLObjectType({
        name: "physical",
        fields: {
          mounting: { type: GraphQLString },
          ip: { type: new GraphQLList(GraphQLString) },
          bodyColor: { type: new GraphQLList(GraphQLInt) },
        },
      }),
    },
    dimensions: {
      type: new GraphQLObjectType({
        name: "dimensions",
        fields: {
          totalLength: { type: GraphQLInt },
          totalWidth: { type: GraphQLInt },
          totalHeight: { type: GraphQLInt },
          diamater: { type: GraphQLInt },
          recessDepth: { type: GraphQLInt },
        },
      }),
    },
    optical: {
      type: new GraphQLObjectType({
        name: "optical",
        fields: {
          diffuse: { type: GraphQLBoolean },
          asymmetrical: { type: GraphQLBoolean },
          beamAngle: { type: new GraphQLList(GraphQLInt) },
          beamAngleAsym: { type: new GraphQLList(GraphQLString) },
          adjustable: { type: new GraphQLList(GraphQLBoolean) },
        },
      }),
    },
    lamp: {
      type: new GraphQLObjectType({
        name: "lamp",
        fields: {
          manufacturer: {
            type: ManufacturerType,
            resolve(parent, args) {
              return _.find(manufacturers, { id: parent.manufacturerId });
            },
          },
          type: { type: new GraphQLList(GraphQLString) },
          colourTemp: { type: new GraphQLList(GraphQLInt) },
          cri: { type: new GraphQLList(GraphQLInt) },
        },
      }),
    },
    electrical: {
      type: new GraphQLObjectType({
        name: "electrical",
        fields: {
          wattage: { type: new GraphQLList(GraphQLFloat) },
        },
      }),
    },
  }),
});

// Define manufacturer type
const ManufacturerType = new GraphQLObjectType({
  name: "Manufacturer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    website: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return _.filter(products, { manufacturerId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(products, { id: args.id });
      },
    },
    manufacturer: {
      type: ManufacturerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(manufacturers, { id: args.id });
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return products;
      },
    },
    manufacturers: {
      type: new GraphQLList(ManufacturerType),
      resolve(parent, args) {
        return manufacturers;
      },
    },
    mounting: {
      type: new GraphQLList(ProductType),
      args: { mounting: { type: GraphQLString } },
      resolve(parent, args) {
        return _.filter(products, (o) => o.physical.mounting === args.mounting);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  //   mutation: Mutation,
});
