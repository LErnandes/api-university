const validationService = require("../services/validationService");
const universityService = require("../services/universityService");


async function getAll(req, res) {
    validationService.validation(req, res);
    let { page, country } = req.query;
    page = page ? Number(page) : 0 
    
    try {
        const universities = await universityService.getAll(country, page);
        const count = await universityService.count();
        
        if (!universities) {
            return res.status(404).json({
                message: "Nenhuma Universidade encontrada",
            });
        }

        return res.status(200).json({ page, pageCount: count/20, universities });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erro ao buscar Universidade",
        });
    }
 }


async function getById(req, res) {
    validationService.validation(req, res);
    const { id } = req.params;

    try {
        const university = await universityService.getById(id);
        
        if (!university) {
            return res.status(404).json({
                message: "Universidade não encontrada",
            });
        }

        return res.status(200).json(university);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erro ao buscar Universidade",
        });
    }
}


async function create(req, res) {
    validationService.validation(req, res);
    const { domains, country, name, stateProvince, webPages, alpha_two_code } = req.body;

    try {
        const universityExists = await universityService.checkIfExists(country, name, stateProvince);
        
        if (universityExists) {
            return res.status(404).json({
                message: "Universidade já existe",
            });
        }
        
        const university = await universityService.create({ domains, country, name, stateProvince, webPages, alpha_two_code })

        return res.status(200).json(university);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erro ao criar Universidade",
        });
    }
}


async function update(req, res) {
    validationService.validation(req, res);
    const { id } = req.params;
    const { domains, name, webPages } = req.body;
    const data = validationService.optionalfields({ domains, name, webPages })

    try {
        let university = await universityService.getById(id);
        
        if (!university) {
            return res.status(404).json({
                message: "Universidade não encontrada",
            });
        }

        await universityService.update(id, data)

        university = await universityService.getById(id);

        return res.status(200).json(university);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erro ao atualizar Universidade",
        });
    }
}


async function remove(req, res) {
    validationService.validation(req, res);
    const { id } = req.params;

    try {
        const university = universityService.getById(id);
        
        if (!university) {
            return res.status(404).json({
                message: "Universidade não encontrada",
            });
        }

        universityService.remove(university.id)
        return res.send()
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erro ao remover Universidade",
        });
    }
}

module.exports = { getAll, getById, create, remove, update };
