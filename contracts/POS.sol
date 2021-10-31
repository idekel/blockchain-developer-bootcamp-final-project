// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.9.0;
pragma experimental ABIEncoderV2;

contract POS {
    address public owner = msg.sender;

    //Beneficiaris' balances
    mapping(address => uint256) private balances;

    Invoice[] private invoices;

    mapping(uint => Product[]) private invoicesProducts;

    //Events
    event newInvoice(address indexed buyer, uint256 indexed id);
    event invoicePaid(address indexed owner, uint256 indexed id);

    // Types

    enum Type {
        Good,
        Service
    }

    enum Status {
        Pending,
        Paid,
        Deleted
    }

    struct Product {
        string name;
        Type kind;
        uint256 price;
        uint256 usdPrice;
        uint256 quantity;
        string upc;
        string imageUrl;
    }

    struct Invoice {
        uint256 id;
        Status status;
        uint256 subtotal;
        uint256 discounts;
        uint256 total;
        address owner;
        address beneficiary;
        address buyer;
    }


    // Modifiers
    modifier validInvoiceId(uint id ){
        require(invoices.length >= id);
        Invoice memory invoice = invoices[id - 1];
        require(invoice.id == id);
        _;
    }

    modifier invoiceOwner(uint id) {
        Invoice memory invoice = getInvoiceById(id);
        require(invoice.owner == msg.sender);
        _;
    }


    function createInvoice(
        Product[] memory products,
        uint256 discounts,
        address buyer,
        address beneficiary
    ) public returns (uint) {
        //validations
        require(validateProducts(products));
        require(buyer != msg.sender);

        uint subtotal = getSubTotal(products);
        require(subtotal > 0);
        uint total = subtotal - discounts;
        require(total > 0);

        uint id = getNextInvoceId();
        Invoice memory invoice = Invoice({
            id: id,
            status: Status.Pending,
            subtotal: subtotal,
            discounts: discounts,
            total: total,
            owner: msg.sender,
            buyer: buyer,
            beneficiary: beneficiary
        });
        invoices.push(invoice);

        Product[] storage container = invoicesProducts[id]; 
        for (uint i; i < products.length; i++){
            container.push(products[i]);
        }

        emit newInvoice(buyer, 1);

        return id;
    }

    function getNextInvoceId() private view returns (uint256) {
        if (invoices.length == 0){
            return 1;
        }
        return invoices.length;
    }

    function getSubTotal(Product[] memory products)
        public
        pure
        returns (uint256 subtotal)
    {
        for (uint256 i; i < products.length; i++) {
            subtotal += products[i].price * products[i].quantity;
        }
    }

    function getInvoiceById(uint256 id) public view returns (Invoice memory) {
        require(invoices.length >= id);
        require(id > 0);
        return invoices[id - 1];
    }

    function getInvoiceProducts(uint id) public view returns(Product[] memory) {
        Invoice memory invoice = getInvoiceById(id);
        require(invoice.id == id, "IDs don't match");
        return invoicesProducts[id];
    }

    function validateProducts(Product[] memory products) public pure returns(bool) {
        for (uint i; i < products.length; i++){
            Product memory product = products[i];
            if (product.usdPrice == 0 || product.price == 0) return false;
            if (bytes(product.imageUrl).length == 0) return false;
            if (bytes(product.upc).length == 0) return false;
            if (product.quantity == 0) return false;

        }
        return products.length > 0;
    }

    function deleteInvoice(uint id) public validInvoiceId(id) invoiceOwner(id) returns(uint) {
        Invoice storage invoice = invoices[id - 1];
        require(invoice.status != Status.Paid);
        invoice.status = Status.Deleted;
        return invoice.id; 
    }

    function payInvoice(uint id) public payable validInvoiceId(id) {
        Invoice storage invoice = invoices[id  - 1];
        require(invoice.owner != msg.sender);
        require(invoice.beneficiary != msg.sender);
        require(msg.value >= invoice.total);

        invoice.status = Status.Paid;
        balances[invoice.beneficiary] += msg.value;

        emit invoicePaid(invoice.owner, id);
    }

    function getBalanceOf(address beneficiary) public view returns(uint) {
        return balances[beneficiary];
    }
}
