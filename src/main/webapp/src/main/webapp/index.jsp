<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GYM SHOP - Dụng Cụ Tập Thể Hình</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<header class="header">
    <div class="container">
        <div class="header-top">
            <div class="header-links">
                <a href="#" class="connect-link"><i class="fas fa-link"></i> Kết nối</a>
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
            <div class="header-actions">
                <a href="#" id="help-btn"><i class="fas fa-question-circle"></i> Trợ giúp</a>
                <a href="#" id="register-btn"><i class="fas fa-user-plus"></i> Đăng ký</a>
                <a href="#" id="login-btn"><i class="fas fa-sign-in-alt"></i> Đăng nhập</a>
                <a href="#" id="cart-btn" class="cart">🛒 <span id="cart-count">0</span></a>
                <button class="menu-toggle" aria-label="Toggle menu"><i class="fas fa-bars"></i></button>
            </div>
        </div>
        <div class="header-main">
            <div class="logo">
                <span class="logo-text">GYM SHOP</span>
            </div>
            <div class="search-box">
                <input type="text" id="search-input" placeholder="Tìm kiếm sản phẩm...">
                <button onclick="searchProducts()" aria-label="Search">🔍</button>
            </div>
        </div>
    </div>
    <!-- Cart Panel -->
    <div id="cart-panel" class="cart-panel hidden">
        <div class="cart-panel-header">
            <h3>Giỏ hàng của bạn</h3>
            <button id="close-cart-panel" class="close-cart-panel">✖</button>
        </div>
        <div class="cart-panel-items" id="cart-panel-items">
            <!-- Danh sách sản phẩm sẽ được thêm bằng JavaScript -->
        </div>
        <div class="cart-panel-footer">
            <div class="cart-panel-total">
                <span>Tổng cộng:</span>
                <span id="cart-total">0 VNĐ</span>
            </div>
            <button id="checkout-btn" class="checkout-btn">Thanh toán</button>
        </div>
    </div>
</header>

<main class="main">
    <aside class="sidebar">
        <h3>Danh mục</h3>
        <ul id="category-list">
            <li data-category="all" class="active">Tất cả</li>
            <li data-category="dungcutapta">Dụng cụ tập tạ</li>
            <li data-category="cardio">Máy tập cardio</li>
            <li data-category="toanthan">Dụng cụ tập toàn thân</li>
            <li data-category="phukien">Phụ kiện tập luyện</li>
            <li data-category="phuchoihotro">Dụng cụ hỗ trợ phục hồi</li>
            <li data-category="thucphambosung">Thực phẩm bổ sung</li>
            <li data-category="doiluong">Dụng cụ đo lường sức khỏe</li>
        </ul>
    </aside>

    <section class="products">
        <div class="filters">
            <button data-filter="popular">Phổ biến</button>
            <button data-filter="newest" class="active">Mới nhất</button>
            <button data-filter="bestseller">Bán chạy</button>
            <select id="sort-price">
                <option value="">Sắp xếp theo giá</option>
                <option value="asc">Giá: Thấp đến Cao</option>
                <option value="desc">Giá: Cao đến Thấp</option>
            </select>
        </div>

        <div class="product-list">
            <div class="product-card" data-category="dungcutapta" data-date="2025-05-01">
                <span class="badge">Yêu thích</span>
                <img src="images/tay-10kg.jpg" alt="Tạ tay 10kg">
                <p class="title">Tạ tay 10kg</p>
                <p class="price"><span>1300000</span></p>
                <p class="rating">⭐⭐⭐⭐⭐ 230 đã bán</p>
                <p class="origin">Việt Nam</p>
                <button class="add-to-cart" data-title="Tạ tay 10kg" data-price="1300000">Thêm vào giỏ</button>
            </div>

            <div class="product-card" data-category="cardio" data-date="2025-04-15">
                <span class="badge">Hot</span>
                <img src="images/may-chay-bo.jpg" alt="Máy chạy bộ">
                <p class="title">Máy chạy bộ</p>
                <p class="price"><span>5500000</span></p>
                <p class="rating">⭐⭐⭐⭐⭐ 150 đã bán</p>
                <p class="origin">Hàn Quốc</p>
                <button class="add-to-cart" data-title="Máy chạy bộ" data-price="5500000">Thêm vào giỏ</button>
            </div>
            
            <div class="product-card" data-category="cardio" data-date="2025-04-15">
                <span class="badge">Hot</span>
                <img src="images/may-chay-bo.jpg" alt="Máy chạy bộ">
                <p class="title">Máy chạy bộ</p>
                <p class="price"><span>5500000</span></p>
                <p class="rating">⭐⭐⭐⭐ 150 đã bán</p>
                <p class="origin">Hàn Quốc</p>
                <button class="add-to-cart" data-title="Máy chạy bộ" data-price="5500000">Thêm vào giỏ</button>
            </div>
            
            <div class="product-card" data-category="cardio" data-date="2025-04-15">
                <span class="badge">Hot</span>
                <img src="images/may-chay-bo.jpg" alt="Máy chạy bộ">
                <p class="title">Máy chạy bộ</p>
                <p class="price"><span>5500000</span></p>
                <p class="rating">⭐⭐⭐⭐ 150 đã bán</p>
                <p class="origin">Hàn Quốc</p>
                <button class="add-to-cart" data-title="Máy chạy bộ" data-price="5500000">Thêm vào giỏ</button>
            </div>
        </div>

        <div class="pagination">
            <button id="prev-page" disabled>Trước</button>
            <span id="page-info">1</span>
            <button id="next-page">Sau</button>
        </div>
    </section>
</main>

<!-- Modal Giỏ hàng -->
<div id="cart-modal" class="modal hidden">
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Giỏ hàng của bạn</h2>
        <ul id="cart-items"></ul>
        <p>Tổng tiền: <span id="total-price">0</span> đ</p>
    </div>
</div>

<!-- Modal Đăng nhập -->
<div id="login-modal" class="modal hidden">
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Đăng nhập</h2>
        <input type="text" placeholder="Tên đăng nhập">
        <input type="password" placeholder="Mật khẩu">
        <button>Đăng nhập</button>
    </div>
</div>

<!-- Modal Đăng ký -->
<div id="register-modal" class="modal hidden">
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Đăng ký</h2>
        <input type="text" placeholder="Tên đăng nhập">
        <input type="email" placeholder="Email">
        <input type="password" placeholder="Mật khẩu">
        <button>Đăng ký</button>
    </div>
</div>

<script src="src\main\webapp\script.js"></script>
</body>
</html>
