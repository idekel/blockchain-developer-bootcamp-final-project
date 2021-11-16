const POS = artifacts.require("POS");
const { catchRevert, tryCatch } = require('./exceptionsHelpers');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("POS", function (accounts) {
  const [_owner, bob, lucy] = accounts;

  let instance;

  const validProduct = {
    name: 'Some product',
    kind: '0',
    price: 1,
    quantity: 1,
    usdPrice: 100,
    upc: '12093',
    imageUrl: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
  };

  beforeEach(async () => {
    instance = await POS.new();
  });

  describe('properties', () => {

    it("should has owner property", () => {
      assert.equal(typeof instance.owner, 'function', 'the contract has no owner')
    });
  });

  describe('Invoice validations & Creation', () => {

    it("should error out when products is empty", async () => {
      await catchRevert(instance.createInvoice([], 0, bob, lucy));
    });

    it("should error out when owner is isqual to buyer", async () => {
      await catchRevert(instance.createInvoice([validProduct], 0, _owner, lucy), { from: _owner });
    });

    it("Should have a subtotal higher than 0(zero)", async () => {
      await catchRevert(instance.createInvoice([{ ...validProduct, price: 0 }], 0, bob, lucy));
    });

    it("Should have a total higher than 0(zero)", async () => {
      await catchRevert(instance.createInvoice([validProduct], 1, bob, lucy));
    });

    it("Invoice should have status pending when created", async () => {
      const ret = await instance.createInvoice([{ ...validProduct, price: 5, quantity: 2 }, validProduct], 0, bob, lucy);

      const invoice = await instance.getInvoiceById(ret.logs[0].args.id.toNumber())

      assert.equal(POS.Status.Pending, invoice.status);
    });

    it("Should have a subtotal equal to price * quantity", async () => {
      const ret = await instance.createInvoice([{ ...validProduct, price: 5, quantity: 2 }, validProduct], 0, bob, lucy);
      const invoice = await instance.getInvoiceById(ret.logs[0].args.id.toNumber())

      assert.equal(11, invoice.subtotal);
    });

    it("Should have a total equal to subtoal - discounts", async () => {
      const ret = await instance.createInvoice([{ ...validProduct, price: 5, quantity: 2 }, validProduct], 1, bob, lucy);
      const invoice = await instance.getInvoiceById(ret.logs[0].args.id.toNumber())

      assert.equal(10, invoice.total);
    });

    it("Should properly store products", async () => {
      const ret = await instance.createInvoice([validProduct], 0, bob, lucy);

      const products = await instance.getInvoiceProducts(ret.logs[0].args.id.toNumber());

      assert.equal(validProduct.price, products[0].price);
      assert.equal(validProduct.name, products[0].name);
      assert.equal(validProduct.kind, products[0].kind); // 15,033
      assert.equal(validProduct.usdPrice, products[0].usdPrice);
      assert.equal(validProduct.quantity, products[0].quantity);
    });

    it('Should return false when a product has invalid price', async () => {
      const ret = await instance.validateProducts([validProduct, { ...validProduct, price: 0 }]);

      assert.strictEqual(ret, false);
    });

    it('Should return false when a product has invalid usdPrice', async () => {
      const ret = await instance.validateProducts([validProduct, { ...validProduct, usdPrice: 0 }]);

      assert.strictEqual(ret, false);
    });

    it('Should return false when a product has invalid quanity', async () => {
      const ret = await instance.validateProducts([validProduct, { ...validProduct, quantity: 0 }]);

      assert.strictEqual(ret, false);
    });


    it('Should return false when a product has invalid upc', async () => {
      const ret = await instance.validateProducts([validProduct, { ...validProduct, upc: '' }]);

      assert.strictEqual(ret, false);
    });

    it('Should return false when a product has invalid imageUrl', async () => {
      const ret = await instance.validateProducts([validProduct, { ...validProduct, imageUrl: '' }]);

      assert.strictEqual(ret, false);
    });

    it("Should filter invoice by owner", async () => {
      await instance.createInvoice([{ ...validProduct, price: 5, quantity: 2 }, validProduct], 0, bob, lucy, { from: lucy });
      await instance.createInvoice([{ ...validProduct, price: 5, quantity: 2 }, validProduct], 0, bob, lucy, { from: _owner });

      const invoices = await instance.getInvoicesFor(_owner)

      assert.equal(1, invoices.length);
      assert.equal(invoices[0].owner == _owner, true);
    });

  });


  describe('Invoice operations', () => {

    it('Should mark invoice as deleted', async () => {
      const ret = await instance.createInvoice([{ ...validProduct, price: 5, quantity: 2 }, validProduct], 0, bob, lucy);
      const id = ret.logs[0].args.id;

      await instance.deleteInvoice(id);
      const invoice = await instance.getInvoiceById(id);

      assert.equal(invoice.status, POS.Status.Deleted)
    });

    it('Should revert. Only owner can delete invoice', async () => {
      const ret = await instance.createInvoice([{ ...validProduct, price: 5, quantity: 2 }, validProduct], 0, bob, _owner, { from: lucy });
      const id = ret.logs[0].args.id;

      await catchRevert(instance.deleteInvoice(id), { from: _owner });
    });

    it('Should revert. If owner tryies to pay', async () => {
      const ret = await instance.createInvoice([validProduct], 0, bob, _owner, { from: lucy });
      const id = ret.logs[0].args.id;

      await catchRevert(instance.payInvoice(id, { from: lucy, value: 1 }));
    });

    it('Should revert. If beneficiary tryies to pay', async () => {
      const ret = await instance.createInvoice([validProduct], 0, bob, _owner, { from: lucy });
      const id = ret.logs[0].args.id;

      await catchRevert(instance.payInvoice(id, { from: _owner, value: 1 }));
    });

    it('Should revert. If money sent is less than total', async () => {
      const ret = await instance.createInvoice([{ ...validProduct, quantity: 2 }], 0, bob, _owner, { from: lucy });
      const id = ret.logs[0].args.id;

      await catchRevert(instance.payInvoice(id, { from: bob, value: 1 }));
    });

    it('Should mark receive as paid', async () => {
      const ret = await instance.createInvoice([{ ...validProduct, quantity: 2 }], 0, bob, _owner, { from: lucy });
      const id = ret.logs[0].args.id;

      await instance.payInvoice(id, { from: bob, value: 2 });
      const invoice = await instance.getInvoiceById(id);

      assert.equal(invoice.status, POS.Status.Paid);
    });

    it('Should increase beneficiary balance', async () => {
      const ret = await instance.createInvoice([{ ...validProduct, quantity: 2 }], 0, bob, _owner, { from: lucy });
      const id = ret.logs[0].args.id;

      await instance.payInvoice(id, { from: bob, value: 2 });
      const invoice = await instance.getInvoiceById(id);

      assert.equal((await instance.getBalanceOf(_owner)).toNumber(), 2);
    });

  });

  describe('Withdraw', () => {

    it('Should withdraw all beneficiary balance', async () => {
      const ret = await instance.createInvoice([{ ...validProduct, quantity: 10000 }], 0, bob, _owner, { from: lucy });
      const id = ret.logs[0].args.id;
      await instance.payInvoice(id, { from: bob, value: 10000 });
      const balance = (await instance.getBalanceOf(_owner)).toNumber();

      await instance.withdraw({from: _owner})

      assert.equal(balance, 10000)
      assert.equal((await instance.getBalanceOf(_owner)).toNumber(), 0)
    });

    it('Owner Shouldn\'t be able to withdraw beneficiary balance', async () => {
      const ret = await instance.createInvoice([{ ...validProduct, quantity: 10000 }], 0, bob, _owner, { from: lucy });
      const id = ret.logs[0].args.id;
      await instance.payInvoice(id, { from: bob, value: 10000 });

      await tryCatch(instance.withdraw({from: lucy}), 'revert 10,000 is the minimun required to withdraw')

      assert.equal((await instance.getBalanceOf(_owner)).toNumber(), 10000)
      assert.equal((await instance.getBalanceOf(lucy)).toNumber(), 0)
    });

  })

});
