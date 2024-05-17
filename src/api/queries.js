import { gql } from "@apollo/client";

export const GET_WEATHER = gql`
  query GetWeather($location: String!) {
    getWeather(location: $location) {
      coord {
        lon
        lat
      }
      weather {
        id
        main
        description
        icon
      }
      base
      main {
        temp
        feels_like
        temp_min
        temp_max
        pressure
        humidity
      }
      visibility
      wind {
        speed
        deg
      }
      clouds {
        all
      }
      dt
      sys {
        type
        id
        country
        sunrise
        sunset
      }
      timezone
      id
      name
      cod
      temperature
      description
      icon
      date
    }
  }
`;

export const GET_FORECAST = gql`
  query GetForecast($location: String!) {
    getForecast(location: $location) {
      cod
      message
      cnt
      list {
        dt
        main {
          temp
          feels_like
          temp_min
          temp_max
          pressure
          humidity
        }
        weather {
          id
          main
          description
          icon
        }
        clouds {
          all
        }
        wind {
          speed
          deg
        }
        visibility
        pop
        sys {
          type
          id
          country
          sunrise
          sunset
        }
        dt_txt
        temperature
        description
        icon
        date
      }
      city {
        id
        name
        coord {
          lon
          lat
        }
        country
        population
        timezone
        sunrise
        sunset
      }
    }
  }
`;

export const GET_CITIES = gql`
  {
    getCities {
      value
      label
      lat
      lon
    }
  }
`;
