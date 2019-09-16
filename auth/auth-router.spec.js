const request = require('supertest')

const server = require('../api/server.js')
const db = require('../database/dbConfig.js')

describe('SERVER', () => {
    
    
    describe('POST /register', () => {
        beforeEach(async () => {
            await db('users').truncate()
        })
        
        it('Returns status 201', () => {


            return request(server)
                .post('/api/auth/register')
                .send({ username: "test", password: "test"})
                // .set('Accept', 'application/json')
                .then(res => {
                    // console.log("what", res.error)
                    expect(res.status).toBe(201)
                })

        })

        // it('Returns the new user', () => {
        //     return request(server)
        //         .post('/register')
        //         .then(res => {
        //             expect(res.body).toEqual({
        //                 id: 1,
        //                 username: 'test'
        //             })
        //         })
        // })
    

    })


})