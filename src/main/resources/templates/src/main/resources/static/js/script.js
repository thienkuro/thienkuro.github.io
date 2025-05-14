document.addEventListener("DOMContentLoaded", function () {
    const fakeApi = {
        getCart: () => Promise.resolve(JSON.parse(localStorage.getItem("cart") || "[]")),
        saveCart: (cart) => Promise.resolve(localStorage.setItem("cart", JSON.stringify(cart))),
        checkout: () => Promise.resolve(localStorage.setItem("cart", JSON.stringify([])) || { success: true, message: "Thanh toán thành công!" })
    };

    let cart = [];
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const elements = {
        productCards: $$(".product-card"),
        searchInput: $("#search-input"),
        sortPrice: $("#sort-price"),
        productList: $(".product-list"),
        cartCount: $("#cart-count"),
        prevPage: $("#prev-page"),
        nextPage: $("#next-page"),
        pageInfo: $("#page-info"),
        filterButtons: $$(".filters button"),
        cartBtn: $("#cart-btn"),
        cartPanel: $("#cart-panel"),
        cartPanelItems: $("#cart-panel-items"),
        cartTotal: $("#cart-total"),
        checkoutBtn: $("#checkout-btn"),
        loginBtn: $("#login-btn"),
        registerBtn: $("#register-btn"),
        modals: $$(".modal"),
        closeButtons: $$(".close-modal")
    };

    let currentPage = 1;
    const itemsPerPage = 6;

    // Hàm giảm giá giữ lại nếu sau này cần dùng
    function applyDiscount(card, price) {
        const discount = card.querySelector(".discount")?.textContent.match(/(\d+)%/)?.[1];
        if (discount) {
            return price * (1 - parseInt(discount) / 100);
        }
        return price;
    }

    // Tải giỏ hàng (không áp dụng giảm giá)
    async function loadCart() {
        cart = await fakeApi.getCart();
        cart = cart.map(item => {
            const productCard = [...elements.productCards].find(card => 
                card.querySelector(".title").textContent === item.name
            );
            if (productCard) {
                const price = parseInt(productCard.querySelector(".price span").textContent);
                return { ...item, price };
            }
            return item;
        });
        await fakeApi.saveCart(cart);
        updateCartUI();
    }

    // Lưu giỏ hàng
    async function saveCart() {
        await fakeApi.saveCart(cart);
        updateCartUI();
    }

    // Cập nhật giao diện giỏ hàng
    function updateCartUI() {
        elements.cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        const container = elements.cartPanelItems;
        container.innerHTML = cart.length ? "" : '<p style="text-align: center; color: #666;">Giỏ hàng trống</p>';

        cart.forEach((item, i) => {
            const el = document.createElement("div");
            el.className = "cart-item";
            el.innerHTML = `
                <div class="cart-item-info">
                    <div class="name">${item.name}</div>
                    <div class="price">Đơn giá: ${item.price.toLocaleString("vi-VN")} VNĐ</div>
                    <div class="price">Tổng: ${(item.price * item.quantity).toLocaleString("vi-VN")} VNĐ</div>
                    <div class="quantity-control">
                        <button class="decrease" data-i="${i}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase" data-i="${i}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-i="${i}">Xóa</button>`;
            container.appendChild(el);
        });

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        elements.cartTotal.textContent = total.toLocaleString("vi-VN") + " VNĐ";

        $$(".add-to-cart").forEach(btn => {
            const card = btn.closest(".product-card");
            const name = card.querySelector(".title").textContent;
            const item = cart.find(item => item.name === name);
            const quantity = item ? item.quantity : 0;
            let countSpan = btn.querySelector(".cart-item-count");
            if (!countSpan) {
                countSpan = document.createElement("span");
                countSpan.className = "cart-item-count";
                btn.appendChild(countSpan);
            }
            countSpan.textContent = quantity > 0 ? ` (${quantity})` : "";
        });

        container.querySelectorAll(".decrease").forEach(btn => btn.onclick = () => {
            const i = btn.dataset.i;
            if (cart[i].quantity > 1) cart[i].quantity--;
            saveCart();
        });

        container.querySelectorAll(".increase").forEach(btn => btn.onclick = () => {
            cart[btn.dataset.i].quantity++;
            saveCart();
        });

        container.querySelectorAll(".remove-item").forEach(btn => btn.onclick = () => {
            cart.splice(btn.dataset.i, 1);
            saveCart();
        });
    }

    // Thêm sản phẩm vào giỏ hàng (giá gốc)
    $$(".add-to-cart").forEach(btn => {
        btn.onclick = () => {
            const card = btn.closest(".product-card");
            const name = card.querySelector(".title").textContent;
            const price = parseInt(card.querySelector(".price span").textContent);
            const existing = cart.find(item => item.name === name);
            if (!existing) {
                cart.push({ name, price, quantity: 1 });
                saveCart();
                alert("Đã thêm sản phẩm vào giỏ hàng!");
            } else {
                alert("Sản phẩm đã có trong giỏ hàng! Vui lòng điều chỉnh số lượng trong giỏ.");
            }
        };
    });

    elements.cartBtn.onclick = () => elements.cartPanel.classList.toggle("active");

    elements.checkoutBtn.onclick = async () => {
        if (!cart.length) return alert("Giỏ hàng của bạn đang trống!");
        const res = await fakeApi.checkout(cart);
        if (res.success) {
            alert(res.message);
            cart = [];
            saveCart();
            elements.cartPanel.classList.remove("active");
        }
    };

    elements.loginBtn.onclick = () => {
        elements.modals.forEach(modal => modal.classList.add("hidden"));
        $("#login-modal").classList.remove("hidden");
    };

    elements.registerBtn.onclick = () => {
        elements.modals.forEach(modal => modal.classList.add("hidden"));
        $("#register-modal").classList.remove("hidden");
    };

    elements.modals.forEach(modal => {
        modal.onclick = (e) => {
            if (e.target === modal || e.target.classList.contains("close-modal")) modal.classList.add("hidden");
        };
    });

    elements.closeButtons.forEach(btn => btn.onclick = () => {
        elements.modals.forEach(m => m.classList.add("hidden"));
        elements.cartPanel.classList.remove("active");
    });

    function displayPage(page, cards) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        elements.productCards.forEach(c => c.style.display = "none");
        cards.slice(start, end).forEach(c => c.style.display = "block");
        elements.pageInfo.textContent = page;
        elements.prevPage.disabled = page === 1;
        elements.nextPage.disabled = end >= cards.length;
    }

    function filterProducts(category = "all", query = "") {
        return [...elements.productCards].filter(card => {
            const matchCat = category === "all" || card.dataset.category === category;
            const matchQuery = card.querySelector(".title").textContent.toLowerCase().includes(query);
            return matchCat && matchQuery;
        });
    }

    function applyFilterAndSort(filter = "newest") {
        const category = $("#category-list li.active").dataset.category;
        const query = elements.searchInput.value.trim().toLowerCase();
        let cards = filterProducts(category, query);

        if (filter === "popular") {
            cards.sort((a, b) => parseInt(b.querySelector(".rating").textContent) - parseInt(a.querySelector(".rating").textContent));
        } else if (filter === "newest") {
            cards.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
        } else if (filter === "bestseller") {
            cards.sort((a, b) => (b.querySelector(".rating").textContent.match(/⭐/g)?.length || 0) - (a.querySelector(".rating").textContent.match(/⭐/g)?.length || 0));
        }

        elements.productList.innerHTML = "";
        cards.forEach(c => elements.productList.appendChild(c));
        displayPage(currentPage, cards);
    }

    $$("#category-list li").forEach(item => {
        item.onclick = () => {
            $$("#category-list li").forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            currentPage = 1;
            applyFilterAndSort($(".filters button.active")?.dataset.filter || "newest");
        };
    });

    elements.filterButtons.forEach(btn => {
        btn.onclick = () => {
            elements.filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentPage = 1;
            applyFilterAndSort(btn.dataset.filter);
        };
    });

    elements.searchInput.addEventListener("keyup", e => {
        if (e.key === "Enter") {
            currentPage = 1;
            applyFilterAndSort($(".filters button.active")?.dataset.filter || "newest");
        }
    });

    elements.sortPrice.addEventListener("change", () => {
        const sortVal = elements.sortPrice.value;
        let cards = filterProducts($("#category-list li.active").dataset.category, elements.searchInput.value.trim().toLowerCase());
        cards.sort((a, b) => {
            const priceA = parseFloat(a.querySelector(".price span")?.textContent || 0);
            const priceB = parseFloat(b.querySelector(".price span")?.textContent || 0);
            return sortVal === "asc" ? priceA - priceB : priceB - priceA;
        });
        elements.productList.innerHTML = "";
        cards.forEach(c => elements.productList.appendChild(c));
        displayPage(currentPage, cards);
    });

    elements.prevPage.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            applyFilterAndSort($(".filters button.active")?.dataset.filter || "newest");
        }
    };

    elements.nextPage.onclick = () => {
        currentPage++;
        applyFilterAndSort($(".filters button.active")?.dataset.filter || "newest");
    };

    loadCart();
    applyFilterAndSort("newest");
});
