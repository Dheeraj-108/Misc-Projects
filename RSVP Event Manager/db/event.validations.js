import Joi from 'joi';

export const eventSchema = Joi.object({
    eventname: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required()
})