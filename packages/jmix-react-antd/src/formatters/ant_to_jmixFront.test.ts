import { ant_to_jmixFront } from "./ant_to_jmixFront";
import metadata from '../test/fixtures/metadata.json';

describe('ant_to_jmixFront', () => {
  it('should convert ant record to jmix front', () => {

    const item = {
      manufacturer: "Mercedes",
      model: "m06",
      regNumber: "tm006",
      purchaseDate: "2021-10-19T08:02:55.227Z",
      manufactureDate: "2021-10-07T08:02:58.706Z",
      wheelOnRight: true,
      carType: "SEDAN",
      ecoRank: null,
      maxPassengers: 5,
      price: "1000",
      mileage: 2000,
      garage: null,
      technicalCertificate: "20a9a497-15bf-40e0-c5df-a3ece9329f7c"
    };


    const result = ant_to_jmixFront(item, 'scr_Car', metadata as any);
    expect(result.manufacturer).toEqual('Mercedes');
    expect(result.purchaseDate).toEqual('2021-10-19T08:02:55.227Z');
    expect(result.manufactureDate).toEqual('2021-10-07T08:02:58.706Z');
    expect(result.wheelOnRight).toEqual(true);
    expect(result.carType).toEqual('SEDAN');
    expect(result.ecoRank).toBeNull();
    expect(result.maxPassengers).toEqual(5);
    expect(result.price).toEqual('1000');
    expect(result.mileage).toEqual(2000);
    expect(result.technicalCertificate).toEqual({id: '20a9a497-15bf-40e0-c5df-a3ece9329f7c'});
    expect(result.garage).toBeNull();
  })

  it('should fail on incorrect association entity id type', function () {
    const item = {
      technicalCertificate: 1000
    };

    expect(() => ant_to_jmixFront(item, 'scr_Car', metadata as any))
      .toThrow('Unexpected value type for to-one association property technicalCertificate. Expected string or null/undefined')
  });
});
