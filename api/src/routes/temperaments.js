const { Router } = require("express");
const { Temperament} = require("../db");
const axios = require('axios');
const { API_KEY } = process.env



const router = Router();

router.get("/temperament", async (req, res) =>{

    const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
    const tempDb = await Temperament.findAll();

    if (!tempDb.length){
        const tempApi = await apiInfo.data.map( d => d.temperament).join().split(",");// ["malo, bueno, chincudo, ,"]
        const tempTrim = tempApi.map( t => t.trim() )
        
        tempTrim.forEach( t => {
            if(t !== ""){
                Temperament.findOrCreate({// me devuelve un arreglo [temp, true/false]
                    where: {
                        name: t
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
        res.status(200).send(tempDb);
    } 
})


module.exports = router;


