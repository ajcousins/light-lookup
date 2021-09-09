const graphql = require("graphql");
const _ = require("lodash");
const { products, manufacturers } = require("./dummyData");
const Product = require("../models/product");
const Manufacturer = require("../models/manufacturer");

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
        // return _.find(manufacturers, { id: parent.manufacturerId });
        return Manufacturer.findById(parent.manufacturerId);
      },
    },
    name: { type: GraphQLString },
    type: { type: new GraphQLList(GraphQLString) },
    mounting: { type: new GraphQLList(GraphQLString) },
    ip: { type: new GraphQLList(GraphQLString) },
    bodyColour: { type: new GraphQLList(GraphQLString) },
    length: { type: GraphQLInt },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    diamater: { type: GraphQLInt },
    recessDepth: { type: GraphQLInt },
    beamAngles: { type: new GraphQLList(GraphQLInt) },
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
        // return _.filter(products, { manufacturerId: parent.id });
        return Product.find({ manufacturerId: parent.id });
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
        // return _.find(products, { id: args.id });
        return Product.findById(args.id);
      },
    },
    manufacturer: {
      type: ManufacturerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(manufacturers, { id: args.id });
        return Manufacturer.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        // return products;
        return Product.find({});
      },
    },
    manufacturers: {
      type: new GraphQLList(ManufacturerType),
      resolve(parent, args) {
        // return manufacturers;
        return Manufacturer.find({});
      },
    },
    multiple: {
      type: new GraphQLList(ProductType),
      args: {
        type: { type: GraphQLString },
        mounting: { type: GraphQLString },
        ip: { type: GraphQLString },
        bodyColour: { type: GraphQLString },
        colourTemp: { type: GraphQLInt },
        cri: { type: GraphQLInt },
        maxBeamAngle: { type: GraphQLInt },
        minBeamAngle: { type: GraphQLInt },
        maxLength: { type: GraphQLInt },
        maxWidth: { type: GraphQLInt },
        maxHeight: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const keys = [...Object.keys(args)];
        const beamChecks = [];
        const sizeChecks = [];
        const staticChecks = keys.filter((key) => {
          if (key === "maxBeamAngle" || key === "minBeamAngle") {
            beamChecks.push(key);
            return false;
          } else if (
            key === "maxLength" ||
            key === "maxWidth" ||
            key === "maxHeight"
          ) {
            sizeChecks.push(key);
            return false;
          } else {
            return true;
          }
        });
        let productsCopy = [...products];

        return productsCopy
          .filter((product) =>
            // filter products that meet static checks
            staticChecks.every((key) => product[key].includes(args[key]))
          )
          .filter((product) => {
            // filter products that meet beam conditions
            if (
              beamChecks.includes("maxBeamAngle") &&
              beamChecks.includes("minBeamAngle")
            )
              return product.beamAngles.some(
                (beam) => beam <= args.maxBeamAngle && beam >= args.minBeamAngle
              );
            else if (beamChecks.includes("maxBeamAngle"))
              return product.beamAngles.some(
                (beam) => beam <= args.maxBeamAngle
              );
            else if (beamChecks.includes("minBeamAngle"))
              return product.beamAngles.some(
                (beam) => beam >= args.minBeamAngle
              );
            return true;
          })
          .filter((product) => {
            // filter products by size
            // both length and width must be included together
            if (
              (sizeChecks.includes("maxLength") &&
                !sizeChecks.includes("maxWidth")) ||
              (sizeChecks.includes("maxWidth") &&
                !sizeChecks.includes("maxLength"))
            ) {
              return false;
            }

            if (
              sizeChecks.includes("maxLength") &&
              sizeChecks.includes("maxWidth")
            ) {
              if (
                product.length > args.maxLength ||
                product.width > args.maxWidth
              ) {
                // rotate values
                if (
                  product.width > args.maxLength ||
                  product.length > args.maxWidth
                )
                  return false;
              }
            }

            if (sizeChecks.includes("maxHeight")) {
              if (product.height > args.maxHeight) return false;
            }

            return true;
          });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addManufacturer: {
      type: ManufacturerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: GraphQLString },
        website: { type: GraphQLString },
      },
      resolve(parent, args) {
        let manufacturer = new Manufacturer({
          name: args.name,
          country: args.country,
          website: args.website,
        });
        return manufacturer.save();
      },
    },
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        manufacturerId: { type: new GraphQLNonNull(GraphQLID) },
        type: { type: new GraphQLList(GraphQLString) },
        mounting: { type: new GraphQLList(GraphQLString) },
        ip: { type: new GraphQLList(GraphQLString) },
        bodyColour: { type: new GraphQLList(GraphQLString) },
        length: { type: GraphQLInt },
        width: { type: GraphQLInt },
        height: { type: GraphQLInt },
        diameter: { type: GraphQLInt },
        recessDepth: { type: GraphQLInt },
        beamAngles: { type: new GraphQLList(GraphQLInt) },
        colourTemp: { type: new GraphQLList(GraphQLInt) },
        cri: { type: new GraphQLList(GraphQLInt) },
      },
      resolve(parent, args) {
        let product = new Product({
          name: args.name,
          manufacturerId: args.manufacturerId,
          type: args.type,
          mounting: args.mounting,
          ip: args.ip,
          bodyColour: args.bodyColour,
          length: args.length,
          width: args.width,
          height: args.height,
          diamater: args.diameter,
          recessDepth: args.recessDepth,
          beamAngles: args.beamAngles,
          colourTemp: args.colourTemp,
          cri: args.cri,
        });
        return product.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
