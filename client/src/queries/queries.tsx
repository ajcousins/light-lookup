import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  {
    products {
      name
      manufacturer {
        name
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query (
    $type: String
    $mounting: String
    $ipRating: String
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
      ip: $ipRating
      bodyColour: $bodyColour
      maxLength: $maxLength
      maxWidth: $maxWidth
      maxHeight: $maxHeight
      colourTemp: $colourTemp
      cri: $cri
      beamAngle: $beamAngle
    ) {
      name
      type
      manufacturer {
        name
      }
    }
  }
`;
