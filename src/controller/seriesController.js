const series = require("../model/series.json");
const fs = require("fs");
const { deepStrictEqual } = require("assert");

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
    const id = req.params.id;
    const atualizacao = req.body;
    console.log(atualizacao);

    try {
        const serieASerModificada = serie.find((series) => series.id == id);

        Object.keys(atualizacao).forEach((chave) => {
            serieASerModificada[chave] = atualizacao[chave];
        });
    
        fs.writeFile("./src/model/series.json", JSON.stringify(series), function(err) {
            if(err) {
                return res.status(424).send({message:err});
            };

            console.log("Arquivo atualizado com sucesso!");
        });

        return res.status(200).send(series);
    } catch(err) {
        return res.status(424).send({message: err});
    };
};

module.exports = {
    getAll,
    getById,
    postSeries,
    putSeries,
    deleteSerie,
    patchSeries
};