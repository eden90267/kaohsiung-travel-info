class Model {

  getData = (offset, limit, zone) => {
    let records;
    let total;
    $.ajax({
      url: `http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&offset=${offset}&limit=${limit}${zone && zone !== '' ? '&filters={"Zone":"' + zone + '"}' : ''}`,
      type: 'GET',
      async: false,
      dataType: 'json',
      success: data => {
        records = data.result.records;
        total = data.result.total;
      },
      error: () => {
        console.error('get data error!');
      }
    });
    return {
      records,
      total
    }
  };

  getZones = () => {
    let result;
    $.ajax({
      url: 'http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&fields=%22Zone%22&distinct=true&limit=1000',
      type: 'GET',
      async: false,
      dataType: 'json',
      success: data => {
        result = data.result.records.map(function (record) {
          return record.Zone;
        });
      },
      error: () => {
        console.error('get data error!');
      }
    });
    return result;
  };

}

const model = new Model();

export default model;