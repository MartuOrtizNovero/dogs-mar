require("dotenv").config();
const { API_KEY } = process.env
const axios = require('axios');
const { Router } = require("express");
const { Dog, Temperament } = require("../db")

//----------------------------------------------- CONTROLLERS-----------------------------------------------------------------------

const apiInfo = async () => {
    try {
        const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

        const dogsInfo = await api.data.map(el => {
            return {
                id: el.id,
                name: el.name,
                height: el.height.metric,
                weight: el.weight.metric,
                years: el.life_span,
                image: el.image.url,
                temperament: el.temperament ? el.temperament : "No temperament found",
                createdInDb: false
            }
        })

        return dogsInfo;

    } catch (error) {
        console.log(error)
    }
}



const dbInfo = async () => {
    try {
        const dbDog = await Dog.findAll({ include: [Temperament] });
        return dbDog;

    } catch (error) {
        console.log(error)
    }
}

const getAllInfo = async () => {
    try {
        const infoApi = await apiInfo();
        const infoDb = await dbInfo();
        if (infoDb) {
            const allInfo = await infoDb.concat(infoApi);
            return allInfo
        } else {
            return infoApi
        }

    } catch (error) {
        console.log(error)
    }
}

//----------------------------------------RUTAS--------------------------------------------------------------------------------------


const router = Router();

router.get("/dogs", async (req, res) => {

    try {
        const allInfo = await getAllInfo();
        const { name } = req.query;

        if (name) {
            let nameDog = allInfo.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
            nameDog.length ? res.status(200).json(nameDog) : res.status(404).send("Write the name correctly")
        } return res.status(250).json(allInfo)


    } catch (error) {
        console.log(error)
    }
})

router.get("/dogs/:id", async (req, res) => {
    // buscar primero en la bd y despues en la api
    try {
        let id = req.params.id;

        if (id.includes("-")) {
            const array = []
            array.push(await Dog.findByPk(id, {
                include: [Temperament],
            }))
            if (array) return res.status(200).send(array)
        } else {
            const dogApi = await apiInfo()
                .then((resp) => {
                    const filterDog = resp.filter(p => p.id == id)
                    res.send(filterDog)
                })
        }
    } catch (error) {
        console.log(error)
    }
});

router.post("/dog", async (req, res) => {
    try {
        let { name, height, weight, years, image, temperament, createdInDb } = req.body;
        if (!name || !height || !weight) {
            res.status(400).json({ msg: "Name , height and weigth are required" })
        }

        const newDog = await Dog.create({
            name,
            height,
            weight,
            years,
            image: image ? image : 'https://t2.ea.ltmcdn.com/es/posts/8/9/2/nombres_graciosos_para_perros_pequenos_23298_3_600.jpg',
            createdInDb
        })
        let tempDb = await Temperament.findAll({
            where: { name: temperament }
        })

        await newDog.addTemperament(tempDb)

        res.status(200).send("¡Dog created successfully!");

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;