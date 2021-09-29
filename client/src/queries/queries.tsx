import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  {
    products {
      name
      ipParticle
      ipMoisture
      manufacturer {
        name
      }
    }
  }
`;

export const MANUFACTURERS = gql`
  {
    manufacturers {
      name
      id
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query (
    $type: String
    $mounting: String
    $ipParticle: Int
    $ipMoisture: Int
    $bodyColour: String
    $maxLength: Int
    $maxWidth: Int
    $maxHeight: Int
    $colourTemp: Int
    $cri: Int
    $beamAngle: Int
  ) {
    multiple(
      type: $type
      mounting: $mounting
      ipParticle: $ipParticle
      ipMoisture: $ipMoisture
      bodyColour: $bodyColour
      maxLength: $maxLength
      maxWidth: $maxWidth
      maxHeight: $maxHeight
      colourTemp: $colourTemp
      cri: $cri
      beamAngle: $beamAngle
    ) {
      name
      mounting
      bodyColour
      ipParticle
      ipMoisture
      colourTemp
      cri
      beamAngles
      length
      width
      height
      imgFilename
      manufacturer {
        name
        country
        website
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $manufacturerId: ID!
    $mounting: [String]
    $bodyColour: [String]
    $ipParticle: [Int]
    $ipMoisture: [Int]
    $colourTemp: [Int]
    $cri: [Int]
    $beamAngles: [Int]
    $length: Int
    $width: Int
    $height: Int
    $imgFilename: String
  ) {
    addProduct(
      name: $name
      manufacturerId: $manufacturerId
      mounting: $mounting
      bodyColour: $bodyColour
      ipParticle: $ipParticle
      ipMoisture: $ipMoisture
      colourTemp: $colourTemp
      cri: $cri
      beamAngles: $beamAngles
      length: $length
      width: $width
      height: $height
      imgFilename: $imgFilename
    ) {
      name
      mounting
      bodyColour
      ipParticle
      ipMoisture
      colourTemp
      cri
      beamAngles
      length
      width
      height
      imgFilename
      manufacturer {
        name
        country
        website
      }
    }
  }
`;
