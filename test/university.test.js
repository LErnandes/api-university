require('dotenv').config();
const InitiateMongoServer = require("../config/db");
const universityService = require("../services/universityService");
const University = require("../model/University");


InitiateMongoServer();

const data = {
    "domains": [
        "claeh.edu.uy"
    ],
    "country": "Uruguay",
    "alpha_two_code": "UY",
    "web_pages": [
        "http://www.claeh.edu.uy/"
    ],
    "state-province": null,
    "name": "Insituto Universitario - Centro Latinoamericano de Economia Humana - IU Claeh"
};

const manyData = [
    {
		"domains": [
			"columbia.edu.py"
		],
		"country": "Paraguay",
		"alpha_two_code": "PY",
		"web_pages": [
			"http://www.columbia.edu.py/"
		],
		"state-province": null,
		"name": "Universidad Columbia del Paraguay"
	},
	{
		"domains": [
			"uaa.edu.py"
		],
		"country": "Paraguay",
		"alpha_two_code": "PY",
		"web_pages": [
			"http://www.uaa.edu.py/"
		],
		"state-province": null,
		"name": "Universidad Autónoma de Asunción"
	},
	{
		"domains": [
			"uamericana.edu.py"
		],
		"country": "Paraguay",
		"alpha_two_code": "PY",
		"web_pages": [
			"http://www.uamericana.edu.py/"
		],
		"state-province": null,
		"name": "Universidad Americana"
	},
	{
		"domains": [
			"uap.edu.py"
		],
		"country": "Paraguay",
		"alpha_two_code": "PY",
		"web_pages": [
			"http://www.uap.edu.py/"
		],
		"state-province": null,
		"name": "Universidad Autónoma del Paraguay"
	},
];


const university = universityService.create(data)


describe('university module', () => {
    test('create', async () => {
        expect(await university).toBeInstanceOf(University);
    });

    test('createBatch', async () => {
        expect(await universityService.createBatch(manyData)).toBe(undefined);
    });

    test('getById', async () => {
        expect(await universityService.getById((await university).id)).toBeInstanceOf(University);
    });

    test('update', async () => {
        const newName = "Universidade X"
        await universityService.update((await university).id, { name: newName })
        const newData = await universityService.getById((await university).id)
        expect(newData.name).toBe(newName);
    });

    test('delete', async () => {
        expect(await universityService.remove((await university).id)).toBe(undefined);
    });
});
