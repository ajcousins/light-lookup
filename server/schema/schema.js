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
    manufacturer: {
      type: ManufacturerType,
      resolve(parent, args) {
        return _.find(manufacturers, { id: parent.manufacturerId });
      },
    },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    mounting: { type: GraphQLString },
    ip: { type: new GraphQLList(GraphQLString) },
    bodyColour: { type: new GraphQLList(GraphQLString) },
    length: { type: GraphQLInt },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    diamater: { type: GraphQLInt },
    recessDepth: { type: GraphQLInt },
    beamAngle: { type: new GraphQLList(GraphQLInt) },
    colourTemp: { type: new GraphQLList(GraphQLInt) },
    cri: { type: new GraphQLList(GraphQLInt) },
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
    colourTemp: {
      type: new GraphQLList(ProductType),
      args: { colourTemp: { type: GraphQLInt } },
      resolve(parent, args) {
        let productsCopy = [...products];
        return productsCopy.filter((product) =>
          product.colourTemp.some((val) => val === args.colourTemp)
        );
      },
    },
    multiple: {
      type: new GraphQLList(ProductType),
      args: {
        colourTemp: { type: GraphQLInt },
        cri: { type: GraphQLInt },
        bodyColour: { type: GraphQLString },
      },
      resolve(parent, args) {
        // console.log("args:", args);
        const keys = Object.keys(args);
        // console.log("keys:", keys);
        let productsCopy = [...products];
        return productsCopy.filter(
          (product) =>
            keys.every(
              (key) => product[key].includes(args[key])
              // return true;
            )
          // console.log(`Product ${product.name} passes.`);
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  //   mutation: Mutation,
});
