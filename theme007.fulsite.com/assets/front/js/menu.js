window.addEventListener('load', function () {



    var serverSyncing = $('#app_golbal_server_syncing_parameter').val();

    fetchData();

    /*if (isLocalStorageNameSupported()) {
        try {
            var localSyncing = localStorage.getItem('app_local_syncing');
            if (localSyncing != undefined && parseInt(serverSyncing) <= parseInt(localSyncing)) {
                var fetched = localStorage.getItem('fetched_categories');
                render(JSON.parse(fetched));
            } else {
                fetchData();
            }
        } catch (e) {
            fetchData();
        }
    } else {
        console.log('localStorage service is unsupported');
        fetchData();
    }*/

    function isLocalStorageNameSupported() {
        var testKey = 'test', storage = window.sessionStorage;
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    function fetchData() {
      
        localStorage.setItem('app_local_syncing', serverSyncing);
    }

    function render(data) {
        switch ($('#header_name_inp').val()) {
            case "header-17":
                header17Categories(JSON.parse(data.categories));
                header17MainCategories(JSON.parse(data.mainCats));
            break;

            case "header-8":
            case "header-9":
            case "header-10":
            case "header-11":
            case "header-13":
            case "header-14":
                renderCategories(JSON.parse(data.categories));
                renderMobileCategories(JSON.parse(data.categories));
                renderMainCategories(JSON.parse(data.mainCats));
                renderMobileMainCategories(JSON.parse(data.mainCats));
            break;
            default:
                renderCategories(JSON.parse(data.categories));
                renderMainCategories(JSON.parse(data.mainCats));
            break;
        }
        $('#menu-navbar-holder').css('opacity', '1');
        if (typeof initCanvasMenu === "function") {
            if ($('#header_name_inp').val() == 'header-10') {
                initCanvasMenu10();
            } else {
                initCanvasMenu();
            }
        }
    };

    function header17Categories(categories) {
        var sub_menu = $('#all-products-sub-menu, #mobile-categories-menu');
        categories.forEach(function (cat) {
            let li = `<li class="menu-item-has-children has-mega-menu"><a href="javascript:;"><i></i><span
            class="spr-option-textedit-link">${cat.category.name}</span></a>
            <div class="mega-menu light">
                <div class="mega-menu__column">
                    <h4><span class="spr-option-textedit-link">${cat.category.name}</span><span
                    class="sub-toggle"></span></h4>
                    <ul class="mega-menu__list">`;
            cat.products.forEach(function (product) {
                let url = Routing.generate('shop_simple_product', { slug: product.slug });
                if (product.customizable == true)
                    url = Routing.generate('shop_custom_product', { slug: product.slug });
                li += `<li><a href="${url}"><span class="spr-option-textedit-link">${product.name}</span></a></li>`;
            });
            li += '</ul></div></div></li>';
            sub_menu.append(li);
        });
    }

    function header17MainCategories(categories) {
        Object.values(categories).forEach(function (cat) {

            let li = `<li class="menu-item-has-children has-mega-menu"><a href="#">${cat.parent}</a>
                        <span class="sub-toggle"></span>
							<div class="mega-menu light">`;

            cat.categories.forEach(function (c) {
                let _li = `<div class="mega-menu__column column1">
									        <h4>${c.category.name}<span class="sub-toggle"></span></h4>
									        <ul class="mega-menu__list">`;
                c.products.forEach(function (product) {
                    let url = Routing.generate('shop_simple_product', { slug: product.slug });
                    if (product.customizable == true)
                        url = Routing.generate('shop_custom_product', { slug: product.slug });
                    _li += `<li><a href="${url}">${product.name}</a></li>`;
                });
                _li += '</ul></div>';
                li += _li;
            });

            li += '</div></li>';

            $('#main-categories-menu, #mobile-categories-main-menu').append(li);



        });
    };

    function renderCategories(categories) {
        if ($('#main-menu-all-products-sub-menu').length > 0) {
            var sub_menu = $('#main-menu-all-products-sub-menu');
            sub_menu.html('');
            categories.forEach(function (cat) {
                let li = `<li class="menu-item-has-children"><a href="#">${cat.category.name}</a>
                <div class="wrapper">
                <ul class="sub-menu">`;
                cat.products.forEach(function (product) {
                    let url = Routing.generate('shop_simple_product', { slug: product.slug });
                    if (product.customizable == true)
                        url = Routing.generate('shop_custom_product', { slug: product.slug });
                    li += `<li><a href="${url}"><span class="spr-option-textedit-link">${product.name}</span></a></li>`;
                });
                li += '</ul></div></li>';
                sub_menu.append(li);
            });
        } else if ($('#category-slider-area-categories-list').length > 0) {
            var sub_menu = $('#category-slider-area-categories-list');
            sub_menu.html('');
            categories.forEach(function (cat) {
                let li = `<li class="menu-item-has-children arrow-plus">
                    <a href="javascript:;">${cat.category.name}</a>
                        <div class="cat-left-drop-menu">
                            <div class="cat-left-drop-menu-left">
                                <a class="menu-item-heading" href="#"></a>
                                    <ul>`;
                cat.products.forEach(function (product) {
                    let url = Routing.generate('shop_simple_product', { slug: product.slug });
                    if (product.customizable == true)
                        url = Routing.generate('shop_custom_product', { slug: product.slug });
                    li += `<li><a href="${url}">${product.name}</a></li>`;
                });
                li += '</ul></div></div></li>';
                sub_menu.append(li);
            });
        }
    };

    function renderMobileCategories(categories) {
        var m_sub_menu = $('#m-main-menu-all-products-sub-menu');
        m_sub_menu.append('<li class="header hidden-md hidden-lg"><a href="#" class="back"></a></li>');
        categories.forEach(function (cat) {
            let li = `<li class="menu-item-has-children"><a href="#">${cat.category.name}</a><ul class="sub-menu"><li class="header hidden-md hidden-lg"><a href="#" class="back"></a></li>`;
            cat.products.forEach(function (product) {
                let url = Routing.generate('shop_simple_product', { slug: product.slug });
                if (product.customizable == true)
                    url = Routing.generate('shop_custom_product', { slug: product.slug });
                li += `<li><a href="${url}"><span class="spr-option-textedit-link">${product.name}</span></a></li>`;
            });
            li += '</ul></li>';
            m_sub_menu.append(li);
        });
    }

    function renderMainCategories(categories) {
        var element = $('#all-product-item-main-menu-1-li');
        element.nextAll('li.dropdown-items').remove();
        Object.values(categories).forEach(function (cat) {

            let li = `<li class="dropdown-items">
                        <a href="#" class="dropdown-link">
                            <span class="spr-option-textedit-link">${cat.parent}</span></a>
                            <div class="wrapper">    
                            <ul class="sub-menu">`;

            cat.categories.forEach(function (c) {
                let _li = `<li class="menu-item-has-children"><a href="#">${c.category.name}</a>
                    <div class="wrapper">
                        <ul class="sub-menu">`;
                c.products.forEach(function (product) {
                    let url = Routing.generate('shop_simple_product', { slug: product.slug });
                    if (product.customizable == true)
                        url = Routing.generate('shop_custom_product', { slug: product.slug });
                    _li += `<li><a href="${url}"><span class="spr-option-textedit-link">${product.name}</span></a></li>`;
                });
                _li += '</ul></div></li>';
                li += _li;
            });

            li += '</ul></div></li>';

            if (element.length > 0)
                element.after(li);
            else
                $('#menu-navbar-holder').prepend(li);

        });
    };

    function renderMobileMainCategories(categories) {
        var melement = $('#m-all-product-item-main-menu-1-li');
        Object.values(categories).forEach(function (cat) {
            let li = `<li class="dropdown-items menu-item-has-children">
                        <a href="#" class="dropdown-link">
                            <span class="spr-option-textedit-link">${cat.parent}</span></a>
                                <ul class="sub-menu"><li class="header hidden-md hidden-lg"><a href="#" class="back"></a></li>`;

            cat.categories.forEach(function (c) {
                let _li = `<li class='menu-item-has-children'><a href="#">${c.category.name}</a><ul class="sub-menu"><li class="header hidden-md hidden-lg"><a href="#" class="back"></a></li>`;
                c.products.forEach(function (product) {
                    let url = Routing.generate('shop_simple_product', { slug: product.slug });
                    if (product.customizable == true)
                        url = Routing.generate('shop_custom_product', { slug: product.slug });
                    _li += `<li><a href="${url}"><span class="spr-option-textedit-link">${product.name}</span></a></li>`;
                });
                _li += '</ul></li>';
                li += _li;
            });

            li += '</ul></li>';

            melement.after(li);

        });
    };

    // ---------------------------------------------------

    function renderCategories2(categories) {
        if ($('#main-menu-all-products-sub-menu').length > 0) {
            var sub_menu = $('#main-menu-all-products-sub-menu');
            sub_menu.html('');
            categories.forEach(function (cat) {
                let li = `<li class="menu-item-has-children">
                    <a href="#">${cat.category.name}</a>
                    <div class="wrapper">
                    <ul class="sub-menu">`;
                cat.products.forEach(function (product) {
                    let url = Routing.generate('shop_simple_product', { slug: product.slug });
                    if (product.customizable == true)
                        url = Routing.generate('shop_custom_product', { slug: product.slug });
                    li += `<li><a href="${url}"><span class="spr-option-textedit-link">${product.name}</span></a></li>`;
                });
                li += '</ul></div></li>';
                sub_menu.append(li);
            });
        } else if ($('#category-slider-area-categories-list').length > 0) {
            var sub_menu = $('#category-slider-area-categories-list');
            sub_menu.html('');
            categories.forEach(function (cat) {
                let li = `<li class="menu-item-has-children arrow-plus">
                    <a href="javascript:;">${cat.category.name}</a>
                        <div class="cat-left-drop-menu">
                            <div class="cat-left-drop-menu-left">
                                <a class="menu-item-heading" href="#"></a>
                                    <ul>`;
                cat.products.forEach(function (product) {
                    let url = Routing.generate('shop_simple_product', { slug: product.slug });
                    if (product.customizable == true)
                        url = Routing.generate('shop_custom_product', { slug: product.slug });
                    li += `<li><a href="${url}">${product.name}</a></li>`;
                });
                li += '</ul></div></div></li>';
                sub_menu.append(li);
            });
        }
    };
    
    function renderMainCategories2(categories) {
        var element = $('#all-product-item-main-menu-1-li');
        element.nextAll('li.dropdown-items').remove();
        Object.values(categories).forEach(function (cat) {

            let li = `<li class="dropdown-items">
                        <a href="#" class="dropdown-link">
                            <span class="spr-option-textedit-link">${cat.parent}</span></a>
                            <div class="wrapper">
                                <ul class="sub-menu">`;

            cat.categories.forEach(function (c) {
                let _li = `<li class="menu-item-has-children"><a href="#">${c.category.name}</a>
                <div class="wrapper">    
                <ul class="sub-menu">`;
                c.products.forEach(function (product) {
                    let url = Routing.generate('shop_simple_product', { slug: product.slug });
                    if (product.customizable == true)
                        url = Routing.generate('shop_custom_product', { slug: product.slug });
                    _li += `<li><a href="${url}"><span class="spr-option-textedit-link">${product.name}</span></a></li>`;
                });
                _li += '</ul></div></li>';
                li += _li;
            });

            li += '</ul></div></li>';

            if (element.length > 0)
                element.after(li);
            else
                $('#menu-navbar-holder').prepend(li);

        });
    };


});