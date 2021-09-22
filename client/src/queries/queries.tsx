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
      manufacturer {
        name
        country
        website
      }
    }
  }
`;
