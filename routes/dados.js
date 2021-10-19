const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const Dado = require('../models/dados')




/**
 * @swagger
 * /dados:
 *   get:
 *     description: Todos os usuarios
 *     responses:
 *       200:
 *         description: Devolve todos os usuarios
 */
router.get('/', async (req, res) => {
  try {
    const dados = await Dado.find()
    res.json(dados)
  } catch (err) {
    res.status(500).json({ message: err.message })

  }
});

/**
* @swagger
* /dados:
*   post:
*     parameters:
*      - in: body
*        name: dados
*        description: Novos dados
*        schema:
*          type: object
*          properties:
*            nome:
*              type: string
*            sobrenome:
*              type: string
*            cpf:
*              type: integer
*            endereco:
*              type: string
*            plano:
*              type: string
*     responses:
*       201:
*         description: Created
*/

router.post('/', async (req, res) => {
  const dado = new Dado({
    nome : req.body.nome,
    sobrenome : req.body.sobrenome,
    endereco : req.body.endereco,
    cpf : req.body.cpf, 
    plano : req.body.plano
  })

  try {
    const newDado = await dado.save()
    res.status(201).json(newDado)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

/**
 * @swagger
 * /dados/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description:  ID de usuario.
 *     description: Obter usuario por id
 *     responses:
 *       200:
 *         description: Returns the requested user
 */

router.get('/:id', getDado, (req, res) => {
  res.json(res.dado)
});

/**
 * @swagger
 * /dados/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description:  ID de usuario.
 *      - in: body
 *        name: dado
 *        description: Update dados
 *        schema:
 *          type: object
 *          properties:
 *            nome:
 *              type: string
 *            sobrenome:
 *              type: string
 *            cpf:
 *              type: integer
 *            endereco:
 *              type: string
 *            plano:
 *              type: string 
 *     responses:
 *       201:
 *         description: Created
 */
router.put('/:id', getDado, async (req, res) => {
  if (req.body.nome != null) {
    res.dado.nome = req.body.nome
  }

  if (req.body.sobrenome != null) {
    res.dado.sobrenome = req.body.sobrenome
  }
  if (req.body.cpf != null) {
    res.dado.cpf = req.body.cpf
  }
  if (req.body.endereco != null) {
    res.dado.endereco = req.body.endereco
  }
  if (req.body.plano != null) {
    res.dado.plano = req.body.plano
  }
  try {
    const updatedDado = await res.dado.save()
    res.json(updatedDado)
  } catch {
    res.status(400).json({ message: err.message })
  }

});
/**
 * @swagger
 * /dados/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description:  ID de usuario.
 *     description: Apagar usuario por id
 *     responses:
 *       200:
 *         description: Returns the requested user
 */
router.delete('/:id', getDado, async (req, res) => {
  try {
    await res.dado.remove()
    res.json({ message: 'Usuario Apagado' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
});

// Middleware function para obter usuario por id
async function getDado(req, res, next) {
  try {
    dado = await Dado.findById(req.params.id)
    if (dado == null) {
      return res.status(404).json({ message: 'Usuario nao encontrado'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
  
  res.dado = dado
  next()
}

module.exports = router 
