


document.addEventListener('DOMContentLoaded', function () {
    const cart = new Map();
    let addToCartButton = document.getElementById('add-to-cart');
    let itemSelect = document.getElementById('item');
    let quantityInput = document.getElementById('quantity');
    let cartTableBody = document.querySelector('#cart-table tbody');
    let totalValueElement = document.getElementById('total-value');




    function addItemToCart() {
        let selectedItem = itemSelect.options[itemSelect.selectedIndex];
        console.log(selectedItem)
        let itemName = selectedItem.value;
        console.log(itemName)
        let itemPrice = parseInt(selectedItem.getAttribute('data-price'));
        console.log(itemPrice)
        let quantity = parseInt(quantityInput.value);

        if (cart.has(itemName)) {
            let currentItem = cart.get(itemName);
            currentItem.quantity += quantity;
        } else {
            cart.set(itemName, { quantity: quantity, price: itemPrice });
        }

        updateCartTable();

    }

    addToCartButton.addEventListener('click', addItemToCart);


    function updateCartTable() {
        cartTableBody.innerHTML = '';
        let totalCartValue = 0;

        cart.forEach(function (item, name) {
            let itemTotalPrice = item.price * item.quantity;
            totalCartValue += itemTotalPrice;

            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${itemTotalPrice}</td>
                <td><button class="delete-item" data-item="${name}">Delete</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        totalValueElement.textContent = totalCartValue.toFixed(2);
    }





    function deleteItemFromCart(itemName) {
        if (cart.has(itemName)) {
            cart.delete(itemName);
            updateCartTable();
        }
    }


   

  
  
  
    cartTableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-item')) {
            let itemName = event.target.getAttribute('data-item');
            deleteItemFromCart(itemName);
        }
    });
});

