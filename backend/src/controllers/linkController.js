const {Link} = require('../models');
const { request, response } = require('express');

module.exports = {
    async create(request, response) {
        const {label, url, image, social} = request.body;
        const {accountId} = request;

        const link = await Link.create({
            label,
            url,
            image,
            social,
            accountId:accountId
        });

        return response.jsonOK(link, 'Link created successfully!');

    },

    async list(request, response) {
        
        const {accountId} = request;
        const links = await Link.findAll({where: {accountId:accountId}});
        
        return response.jsonOK(links);
    },

    async listOne(request, response) {
        const {accountId} = request;
        const {id} = request.params;
        const link = await Link.findOne({where:{id:id, accountId:accountId}}); 
        if(!link) return response.jsonNotFound(null, 'Link not found!');  
       
        return response.jsonOK(link);
    },

    async edit(request, response) {
        const {accountId, body} = request;
        const {id} = request.params;
        const fields = ['label', 'url', 'image', 'social'];

        const link = await Link.findOne({where:{id:id, accountId:accountId}}); 

        if(!link) return response.jsonNotFound(null, 'Link not found!');

        fields.map(fieldName => {
            const newValue = body[fieldName];
            if(newValue!=undefined) link[fieldName] = newValue;
        });

        await link.save();

        return response.jsonOK(link);
    },

    async delete(request, response) {
        const {accountId} = request;
        const {id} = request.params;
        const link = await Link.findOne({where:{id:id, accountId:accountId}}); 
        if(!link) return response.jsonNotFound(null, 'Link not found!');
        await link.destroy();

        return response.jsonOK(null);
    }

}