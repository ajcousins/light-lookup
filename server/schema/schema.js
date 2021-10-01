const graphql = require("graphql");
const _ = require("lodash");
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
    ipParticle: { type: new GraphQLList(GraphQLInt) },
    ipMoisture: { type: new GraphQLList(GraphQLInt) },
    bodyColour: { type: new GraphQLList(GraphQLString) },
    length: { type: GraphQLInt },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    diamater: { type: GraphQLInt },
    recessDepth: { type: GraphQLInt },
    beamAngles: { type: new GraphQLList(GraphQLInt) },
    colourTemp: { type: new GraphQLList(GraphQLInt) },
    cri: { type: new GraphQLList(GraphQLInt) },
    imgFilename: { type: GraphQLString },
    remoteUrl: { type: GraphQLString },
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
    imgFilename: { type: GraphQLString },
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
        ipParticle: { type: GraphQLInt },
        ipMoisture: { type: GraphQLInt },
        bodyColour: { type: GraphQLString },
        colourTemp: { type: GraphQLInt },
        cri: { type: GraphQLInt },
        beamAngle: { type: GraphQLInt },
        maxLength: { type: GraphQLInt },
        maxWidth: { type: GraphQLInt },
        maxHeight: { type: GraphQLInt },
      },
      resolve(parent, args) {
        console.log(args);
        let queryObj = { ...args };
        let keys = [...Object.keys(queryObj)];

        // Remove null values
        keys.forEach((key) => {
          if (!queryObj[key]) {
            delete queryObj[key];
          }
        });

        // Reassign keys after deleting null values
        keys = [...Object.keys(queryObj)];

        console.log("nulls removed:", queryObj);

        // Check if queryObj has beam size checks. If so, remove from object and add to beamChecks array.
        keys.forEach((key) => {
          if (key === "beamAngle") {
            queryObj.beamAngles = {
              $gte: args.beamAngle * 0.9,
              $lte: args.beamAngle * 1.1,
            };
            delete queryObj[key];
          }
        });

        keys.forEach((key) => {
          if (key === "cri") {
            delete queryObj[key];
            queryObj.cri = {
              $gte: args.cri,
            };
          }
        });

        keys.forEach((key) => {
          if (key === "ipParticle") {
            delete queryObj[key];
            queryObj.ipParticle = {
              $gte: args.ipParticle,
            };
          }
        });

        keys.forEach((key) => {
          if (key === "ipMoisture") {
            delete queryObj[key];
            queryObj.ipMoisture = {
              $gte: args.ipMoisture,
            };
          }
        });

        // Check if the queryObj has length AND width. If so, length should be the longer of the two.
        if (keys.includes("maxLength") && keys.includes("maxWidth")) {
          let a;
          let b;
          if (args.maxWidth > args.maxLength) {
            a = args.maxWidth;
            b = args.maxLength;
          } else {
            a = args.maxLength;
            b = args.maxWidth;
          }
          queryObj.length = { $lte: a };
          queryObj.width = { $lte: b };
          delete queryObj["maxLength"];
          delete queryObj["maxWidth"];
        }

        // Max height check
        if (keys.includes("maxHeight")) {
          queryObj.height = { $lte: args.maxHeight };
          delete queryObj["maxHeight"];
        }

        console.log("queryObj:", queryObj);
        return Product.find(queryObj);
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
        imgFilename: { type: GraphQLString },
      },
      resolve(parent, args) {
        let manufacturer = new Manufacturer({
          name: args.name,
          country: args.country,
          website: args.website,
          imgFilename: args.imgFilename,
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
        ipParticle: { type: new GraphQLList(GraphQLInt) },
        ipMoisture: { type: new GraphQLList(GraphQLInt) },
        bodyColour: { type: new GraphQLList(GraphQLString) },
        length: { type: GraphQLInt },
        width: { type: GraphQLInt },
        height: { type: GraphQLInt },
        diameter: { type: GraphQLInt },
        recessDepth: { type: GraphQLInt },
        beamAngles: { type: new GraphQLList(GraphQLInt) },
        colourTemp: { type: new GraphQLList(GraphQLInt) },
        cri: { type: new GraphQLList(GraphQLInt) },
        imgFilename: { type: GraphQLString },
        remoteUrl: { type: GraphQLString },
      },
      resolve(parent, args) {
        let product = new Product({
          name: args.name,
          manufacturerId: args.manufacturerId,
          type: args.type,
          mounting: args.mounting,
          ipParticle: args.ipParticle,
          ipMoisture: args.ipMoisture,
          bodyColour: args.bodyColour,
          length: args.length,
          width: args.width,
          height: args.height,
          diamater: args.diameter,
          recessDepth: args.recessDepth,
          beamAngles: args.beamAngles,
          colourTemp: args.colourTemp,
          cri: args.cri,
          imgFilename: args.imgFilename,
          remoteUrl: args.remoteUrl,
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
