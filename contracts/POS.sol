// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/// @title A Point of Sale
/// @author Idekel A. Santana 
contract POS {
    using SafeMath for uint;

    /// The deployer of the contract
    address public owner = msg.sender;

    /// Beneficiaris' balances
    mapping(address => uint256) private balances;
    
    Invoice[] private invoices;

    /// @notice Because solidty limitations is simpler to keep invoice products apart
    mapping(uint => Product[]) private invoicesProducts;

    //Events
    event NewInvoice(address indexed buyer, uint256 indexed id);
    event InvoicePaid(address indexed owner, uint256 indexed id);

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


    /// @notice Create an invoice. Emits NewInvoice
    /// @param products The list of products this invoice will contain. It can't be an empyt list
    /// @param discounts Can be 0
    /// @param buyer the buyer cuould be the default address(0). It could change when the invoice is paid
    /// @param beneficiary The account that will receive the funds after the invoice is paid. Could be the same as invoice owner
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
        uint total = subtotal.sub(discounts);
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

        emit NewInvoice(buyer, 1);

        return id;
    }


    function getNextInvoceId() private view returns (uint256) {
        if (invoices.length == 0){
            return 1;
        }
        return invoices.length + 1;
    }

    /// @dev subtotal is the sum of each (product * quantity)
    function getSubTotal(Product[] memory products)
        public
        pure
        returns (uint256 subtotal)
    {
        for (uint256 i; i < products.length; i++) {
            subtotal = subtotal.add(products[i].price.mul(products[i].quantity));
        }
    }

    /// @notice Gets an invoice by its ID. It does not return invoce's products
    function getInvoiceById(uint256 id) public view returns (Invoice memory) {
        require(invoices.length >= id);
        require(id > 0);
        return invoices[id - 1];
    }

    /// @notice Get a list of invoces by its Owner. Notice that owner may not be the same as the beneificary
    /// @dev Is it better to use a mapping to simulate an array and avoid the two loops?
    function getInvoicesFor(address ownerA) public view returns(Invoice[] memory){
        uint len = 0;
        uint MAX_ITEMS = 100;
        for (uint i = 0; i < invoices.length; i++){
            if (invoices[i].owner == ownerA){
                len++;
                if (len == MAX_ITEMS) break;
            }
        }
        Invoice[] memory ownerInvoices = new Invoice[](len);
        uint currentIndex = 0;
        for (uint i = 0; i < invoices.length; i++){
            if (invoices[i].owner == ownerA){
                ownerInvoices[currentIndex] = invoices[i];
                currentIndex++;
                if (currentIndex == MAX_ITEMS) break;
            }
        }

        return ownerInvoices;
    }

    /// @notice return the list of product for an invoice
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

    /// @notice Marks an invoice as deleted
    function deleteInvoice(uint id) public validInvoiceId(id) invoiceOwner(id) returns(uint) {
        Invoice storage invoice = invoices[id - 1];
        require(invoice.status != Status.Paid);
        invoice.status = Status.Deleted;
        return invoice.id; 
    }

    /// @notice Marks the invoice as paid and set the payer to the current account
    function payInvoice(uint id) public payable validInvoiceId(id) {
        Invoice storage invoice = invoices[id  - 1];
        require(invoice.owner != msg.sender);
        require(invoice.beneficiary != msg.sender);
        require(msg.value >= invoice.total);

        invoice.status = Status.Paid;
        invoice.buyer = msg.sender;
        balances[invoice.beneficiary] += msg.value;

        emit InvoicePaid(invoice.owner, id);
    }

    /// @notice Gets the balance of a beneficiary
    function getBalanceOf(address beneficiary) public view returns(uint) {
        return balances[beneficiary];
    }
}
