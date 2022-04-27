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
                temperament: el.temperament,
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
        return await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        })

    } catch (error) {
        console.log(error)
    }
}

const getAllInfo = async () => {
    try {
        const infoApi = await apiInfo();
        const infoDb = await dbInfo();
        if (infoDb) {
            const allInfo = await infoApi.concat(infoDb);
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
        console.log(allInfo)
        const { name } = req.query;

        if (name) {
            let nameDog = allInfo.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
            nameDog.length ? res.status(200).json(nameDog) : res.status(404).send("write the name correctly")
        } return res.status(250).json(allInfo)


    } catch (error) {
        console.log(error)
    }
})

router.get("/dogs/:id", async (req, res) => {

    try {
        let { id } = req.params;
        const allInfo = await getAllInfo();
        const filtrado = allInfo.find(d => d.id == id)
        if (filtrado) {
            res.status(200).send(filtrado)
        } else {
            res.status(404).send("There is no dog with that ID")
        }
    } catch (error) {
        console.log(error)
    }
});

router.post("/dog", async (req, res) => {
    try {
        let { name, height, weight, years, image, temperament, createdInDb } = req.body;
        const newDog = await Dog.create({
            name,
            height,
            weight,
            years,
            image,
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