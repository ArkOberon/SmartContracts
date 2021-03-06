const assert = require('assert');
const Web3 = require('web3')

const provider = new Web3.providers.HttpProvider("Http://127.0.0.1:7545");
const web3 = new Web3(provider);

const {interface, bytecode } = require('../scripts/compile');

let accounts;
let usersContract;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();
    usersContract = await new web3.eth.contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000'  });
});

describe('The UsersContract', async() => {

    it('should deploy', () => {
        console.log(usersContract.options.address);
        assert.ok(usersContract.options.address);
    });
})

