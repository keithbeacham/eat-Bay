import axios from "axios";

const mapSearchAPI = axios.create({
  baseURL: "http://dev.virtualearth.net/REST/v1",
});

const BingMapsKey =
  "Ao_pAep-NK4WJkm4K3H_kQKdDjVAw2LnvQIO4cQGKhhEJldlzbFGeAVukR8KiqJk";

export function getLocation(searchString) {
  const params = {
    params: {
      query: searchString,
      userRegion: "GB",
      key: BingMapsKey,
    },
  };

  return mapSearchAPI.get("/Locations", params);
}
