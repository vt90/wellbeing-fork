import axios from 'axios';
import * as functions from 'firebase-functions';
import {environment} from '../environment';

export const getCoordinatesFromAddress = async (address: string): Promise<Object> => {
  let coordinates = {};

  try {
    const {
      data: {
        results: [
          { geometry: { location } }
        ]
      }
    } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${environment.apiKey}`);

    coordinates = location;
  }
  catch (e) {
    functions.logger.error('Failed to extract geoloaction from: ', address)
  }

  return coordinates;
};
