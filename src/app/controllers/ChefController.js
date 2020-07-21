const Chef = require('../models/Chef')
const File = require('../models/File')

module.exports = {
    create (req, res) {

        return res.render("chefs/create")
    },
    async edit (req, res) {

        let results = await Chef.find(req.params.id)
        const chef = results.rows[0]

        if (!chef) return res.send ('Chef not found!')

        results = await Chef.file(chef.file_id)
        const chefFile = results.rows[0]
        
        chefFile.src = `${req.protocol}://${req.headers.host}${chefFile.path.replace("public", "")}`
        
        return res.render ("chefs/edit", { chef, file: chefFile })
    },
    async post (req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }
        
        if(req.files.length == 0 )
            return res.send('Please, send at least one image')

        let results = await File.create(req.files[0])
        const fileId = results.rows[0].id
        
        results = await Chef.create(req.body, fileId)
        const chefId = results.rows[0].id
                
        return res.redirect(`/chefs/${chefId}/edit`)
    },
    async put (req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send('Please, fill all fields!')
            }
        }

        let fileId = ""

        if (req.files.length != 0) {

            fileId = await File.create(req.files[0])
            results = await Chef.update(req.body, fileId.rows[0].id)

        } else {
                            
            results = await Chef.update(req.body, req.body.file_id)
        }    

        if (req.body.removed_files) {
            let removedFiles = req.body.removed_files.split(",")

            removedFiles = parseInt(removedFiles)

            await File.delete(removedFiles)
        }


        return res.redirect(`/chefs/${req.body.id}/edit`)
    },
    async delete (req, res) {

        await Chef.delete(req.body.id)

        await File.delete(req.body.file_id)

        return res.redirect('/chefs/create')

    }
}