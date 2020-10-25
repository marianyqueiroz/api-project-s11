const series = require("../model/series.json");
const fs = require("fs");
const { deepStrictEqual } = require("assert");
const { cachedDataVersionTag } = require("v8");

const getAll =(req, res) => {
    console.log(req.url);
    res.status(200).send(series);
};

const getById = (req, res) => {
    const id = req.params.id;

    const serieFiltrada = series.find((series) => series.id == id);
    res.status(200).send(serieFiltrada);
};

const postSeries = (req, res) => {
    console.log(req.body);
    const { id, title, genre, synopsis, liked, seasons } = req.body;
    series.push({ id, title, genre, synopsis, liked, seasons });

    fs.writeFile("./src/model/series.json", JSON.stringify(series), function(err) {
        if(err){
            return res.status(424).send({ message: err });
        };
        console.log("O arquivo foi atualizado com sucesso!");
    });    

res.status(200).send(series);

};

const putSeries = (req, res) => {
    const id = req.params.id;
    const serieASerModificada = series. find((series) => series.id == id);
    console.log(serieASerModificada);

    const serieAtualizada = req.body;
    console.log(serieAtualizada);

    const index = series.indexOf(serieASerModificada);
    console.log(index);

    series.splice( index, 1, serieAtualizada );
    console.log(series);

    fs.writeFile("./src/model/series.json", JSON.stringify(series), function(err) {
        if (err) {
            return res.status(424).send({ message: err });
        };

        console.log("Arquivo Atualizado com sucesso!");

    });

    res.status(200).send(series);

};

const deleteSerie = (req, res) => {
    const id = req.params.id;
    const serieFiltrada = series.find((series) => series.id == id);
    const index = series.indexOf(serieFiltrada);
    series.splice( index, 1 );

    fs.writeFile("./src/model/series.json", JSON.stringify(series), function(err) {
        if (err) {
            return res.status(424).send({ message: err });
        };

        console.log("O arquivo foi atulaizado com sucesso!");

    });

    res.status(200).send(series);

};

const patchSeries = (req, res) => {
    try {
        const serieId = req.params.id;
        const liked = req.body.liked;

        const serieUpdate = series.find(series => series.id == serieId);
        const index = series.indexOf(serieUpdate);

        if (index >= 0) {
            serieUpdate.liked = liked;
            series.splice(index, 1, serieUpdate);

            fs.writeFile("./src/model/series.json", JSON.stringify(series), function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log("Arquivo de filme foi atualizado com sucesso!");
                    const serieUpdate = series.find(series => series.id == serieId);
                    res.status(200).send(serieUpdate);
                };
            });
        } else {
            res.status(400).send({message : "Série não encontrada para atualização."});
        };
    } catch (err) {
        console.log(err);
        res.status(500).send("Erro na api");
    };
};


const postNovaTemporada = (req, res) => {
    console.log(req.body);

    const serieId = req.params.id;
    const serieFiltrada = series.find((serie) => serie.id == serieId);

    const {id, code, episodes} = req.body;
    serieFiltrada.seasons.push({id, code, episodes});

    fs.writeFile("./src/model/series.json", JSON.stringify(series), function(err) {
        if(err) {
            return res.status(424).send({message: err});
        };

        console.log("O arquivo foi atualizado com sucesso!");
    });

    res.status(201).send(series);
};

const postNovoEpisodio = (req, res) => {
    const serieId = req.params.id;
    const serieFound = series.find((serie) => serie.id == serieId);

    const seasonId = req.params.seasonId;
    const seasonFound = serieFound.seasons.find(season => season.id == seasonId)
    console.log(seasonFound);
 
    const {id, code, name, watched} = req.body;
    console.log(req.body);
    seasonFound.episodes.push({id, code, name, watched});
    
    

    fs.writeFile("./src/model/series.json", JSON.stringify(series), function(err) {
        if(err) {
            return res.status(424).send({message: err});
        };

        console.log("O arquivo foi atualizado com sucesso!");
    });

    res.status(200).send(series);
};


module.exports = {
    getAll,
    getById,
    postSeries,
    putSeries,
    deleteSerie,
    patchSeries,
    postNovaTemporada,
    postNovoEpisodio
};