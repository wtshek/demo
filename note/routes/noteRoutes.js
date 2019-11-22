const mongoose = require("mongoose");
const Note = mongoose.model("note");

module.exports = (app) =>{
    app.get("/api/notes", (req,res)=>{
        Note.find(undefined,(err, doc)=>{
            return res.status(200).send(doc)
        });
    });

    app.get("/api/note/:id", async(req,res)=>{
        const {id} = req.params
        let note = await Note.findById(id);
        return res.status(200).send(note)
    })

    app.post("/api/note", async(req,res)=>{
        let note = await Note.create(req.body);
        return res.status(201).send({
            error: false,
            note
        });
    });

    app.put("/api/note/:id", async(req,res)=>{
        const {id} = req.params;
        let note = await Note.findByIdAndUpdate(id, req.body);
        return res.status(202).send({
            error: false,
            note
        });
    });

    app.delete("/api/note/:id", async(req,res)=>{
        const {id} = req.params
        let note = await Note.findOneAndDelete(id);
        return res.status(201).send({
            error: false,
            note
        });
    });
}