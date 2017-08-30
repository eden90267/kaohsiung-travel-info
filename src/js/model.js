import axios from 'axios'

class Model {

  getData = async (offset, limit, zone) => {
    let response = await axios.get(`http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&offset=${offset}&limit=${limit}${zone && zone !== '' ? '&filters={"Zone":"' + zone + '"}' : ''}`);
    let {records, total} = response.data.result;
    return {
      records, total
    };
  };

  getZones = async () => {
    let response = await axios.get('http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&fields=%22Zone%22&distinct=true&limit=1000');
    return response.data.result.records.map(record => record.Zone);
  };

}

const model = new Model();

export default model;