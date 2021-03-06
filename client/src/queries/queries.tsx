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

export const SEARCH_PRODUCTS_FOR_COUNT = gql`
  query (
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
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query (
    $page: Int
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
      page: $page
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
      link
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
      remoteUrl
      id
      manufacturer {
        name
        country
        website
        imgFilename
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $manufacturerId: ID!
    $link: String!
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
    $remoteUrl: String
  ) {
    addProduct(
      name: $name
      manufacturerId: $manufacturerId
      link: $link
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
      remoteUrl: $remoteUrl
    ) {
      name
      mounting
      link
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
      remoteUrl
      id
      manufacturer {
        name
        country
        website
        imgFilename
      }
    }
  }
`;

export const ADD_MANUFACTURER = gql`
  mutation addManufacturer(
    $name: String!
    $country: String!
    $website: String
    $imgFilename: String
  ) {
    addManufacturer(
      name: $name
      country: $country
      website: $website
      imgFilename: $imgFilename
    ) {
      name
      country
      website
      imgFilename
    }
  }
`;
