require('dotenv').config();
const InitiateMongoServer = require("../config/db");
const userService = require("../services/userService");
const User = require("../model/User");


InitiateMongoServer();
const email = 'luis78270@gmail.com';
const password = '123456';



describe('user module', () => {
    test('signup', async () => {
        expect(await userService.signup(email, password)).toBeInstanceOf(User);
    });


    test('login', async () => {
        const user = await userService.getByEmail(email)
        expect(await userService.verifyPassword(user, password)).toBeInstanceOf(User);
    });


    test('updatePassword', async () => {
        const user = await userService.getByEmail(email)
        expect(await userService.updatePassword(user.id, "923456")).toBeInstanceOf(User);
        await userService.updatePassword(user.id, password)
    });
});
