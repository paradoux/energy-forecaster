// Modules imports
import "babel-polyfill"
import request from "supertest"
import nock from "nock"

// App imports
import app from "../index"

describe("Api Routes tests", () => {
  describe("GET /api/pgis-data", () => {
    test("Should return computed result", async () => {
      // Create a mock pgis api response
      const apiMockResponseData =
        "Latitude (decimal degrees):\t49.249\r\nLongitude (decimal degrees):\t5.951\r\nRadiation database:\tPVGIS-CMSAF\r\nNominal power of the PV system (Unknown type) (kWp):\t4\r\nSystem losses(%):\t14\r\nFixed slope of modules (deg.):\t0\r\nOrientation (azimuth) of modules:\t0\r\n\r\n\t\tFixed angle\t\t\t\t\t\t\t\t\r\nMonth\t\tEd\t\tEm\t\tHd\t\tHm\t\tSDm\r\n1\t\t2.10\t\t65.3\t\t0.73\t\t22.6\t\t12.9\r\n2\t\t4.16\t\t116\t\t1.42\t\t39.7\t\t16.5\r\n3\t\t8.46\t\t262\t\t2.85\t\t88.3\t\t39.5\r\n4\t\t13.40\t\t401\t\t4.45\t\t134\t\t66.5\r\n5\t\t14.70\t\t455\t\t4.87\t\t151\t\t65.0\r\n6\t\t16.10\t\t482\t\t5.34\t\t160\t\t50.3\r\n7\t\t15.80\t\t491\t\t5.26\t\t163\t\t42.6\r\n8\t\t13.50\t\t419\t\t4.50\t\t139\t\t40.9\r\n9\t\t10.20\t\t305\t\t3.40\t\t102\t\t21.7\r\n10\t\t5.55\t\t172\t\t1.88\t\t58.4\t\t11.7\r\n11\t\t2.55\t\t76.4\t\t0.88\t\t26.2\t\t7.65\r\n12\t\t1.65\t\t51.1\t\t0.58\t\t17.9\t\t9.75\r\nYear\t\t9.03\t\t275\t\t3.02\t\t91.9\t\t9.14\r\n\tAOI loss (%)\t	Spectral effects (%)\t	Temperature and low irradiance loss (%)\t	Combined losses (%)\r\nFixed system:\t4.1\t	?(0)\t8.0\t25.2\r\n\r\nEd: Average daily energy production from the given system (kWh)\r\nEm: Average monthly energy production from the given system (kWh)\r\nHd: Average daily sum of global irradiation per square meter received by the modules of the given system (kWh/m2)\r\nHm: Average monthly sum of global irradiation per square meter received by the modules of the given system (kWh/m2)\r\nSDm: Standard deviation of the monthly energy production due to year-to-year variation (kWh)\r\n\r\n\r\nPVGIS (c) European Communities, 2001-2016"

      // Intercept external api calls and mock response
      nock("http://re.jrc.ec.europa.eu/pvgis5/PVcalc.php")
        .defaultReplyHeaders({"access-control-allow-origin": "*"})
        .get(`?lat=49.249&lon=5.951&peakpower=4&loss=14`)
        .reply(200, apiMockResponseData)

      // Check response from server is the same as expected response
      const res = await request(app)
        .get("/api/pgis-data?lat=49.249&lng=5.951&pannelArea=30")
        .set("Accept", "application/json")

      expect(res.status).toBe(200)
      expect(res.body).toEqual({totalYearlyEnergy: 3295.8})
    })
    test("Should return No data available for the provided infos", async () => {
      // Intercept external api calls and mock error response
      nock("http://re.jrc.ec.europa.eu/pvgis5/PVcalc.php")
        .defaultReplyHeaders({"access-control-allow-origin": "*"})
        .get(`?lat=undefined&lon=undefined&peakpower=4&loss=14`)
        .reply(500)

      // Check response from server is the same as expected response
      const res = await request(app)
        .get("/api/pgis-data?lat=undefined&lng=undefined&pannelArea=30")
        .set("Accept", "application/json")

      expect(res.status).toBe(500)
      expect(res.body).toEqual({
        err: {
          message: "Error when retrieving data from the API",
          status: 500
        }
      })
    })
  })
})
