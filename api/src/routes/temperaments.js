const { Router } = require("express");
const { Temperament} = require("../db");
const axios = require('axios');
const { API_KEY } = process.env



const router = Router();

router.get("/temperament", async (req, res) =>{

    const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);// aca me traigo toda la info de la api
    

    const tempDb = await Temperament.findAll();

    if (!tempDb.length){
        const tempApi = await apiInfo.data.map( d => d.temperament).join().split(",");// ["malo,bueno,chincudo"]
        const tempTrim = tempApi.map( t => t.trim() )
        
        tempTrim.forEach( t => {
            if(t !== ""){// hay perros que no tienen temperamentos, aca pregunto si es que si tengo temp me lo crea
                Temperament.findOrCreate({
                    where: {
                        name: t// aca pone el temperamento
                    }
                })
            }
        })

        const consulta = await Temperament.findAll();
    
        if(consulta){
            res.status(200).send(consulta)
        } else{
            res.status(404).send("ERROR")
        }


    } else {
        res.status(200).send(tempDb);// sino me muestra todos los temperamentos que tengo
    } 
})

module.exports = router;


