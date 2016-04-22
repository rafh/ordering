/**
 * Created by rafaelheard on 3/24/16.
 */

angular.module('app').controller('MainController', ['$scope', '$http', function ($scope, $http) {
        var vm = this;
        var menuURL = 'http://in-info-web4.informatics.iupui.edu/~roheard/menu-ordering/connect.php';
        $http.get(menuURL)
            .success(function (data) {
                vm.menu = data;
            });

        vm.orders = [
            {
                id: 0,
                title: 'Select',
                key: 'type',
                reverse: false
            },
            {
                id: 1,
                title: 'Favorite',
                key: 'favorite',
                reverse: true
            },
            {
                id: 2,
                title: 'Title Ascending',
                key: 'title',
                reverse: false
            },
            {
                id: 3,
                title: 'Title Descending',
                key: 'title',
                reverse: true
            }
        ];

        vm.order = vm.orders[0];

        vm.title = 'Menu';
        vm.searchInput = '';
        vm.ordered = [];
        vm.Total = 0;


        vm.checkAmount = function() {
            if (vm.ordered.length > 1) { // your question said "more than one element"
                console.log('not empty');
                return true;

            }
            else {
                console.log('empty');
                return false;
            }
        };

        //remove object from checkout cart
        vm.remove = function(item) {
            var index = vm.ordered.indexOf(item);
            vm.ordered.splice(index, 1);
            item.quantity = '0';

            //if ordered array is empty close modal
            if(vm.ordered.length === 0){
                $('.modal').removeClass('modal-visible');
            }
        };

        //add item to cart
        vm.addToOrder = function (item) {

            //accesses object in array
            if (vm.ordered.indexOf(item) > -1) { 
                //nothing for now
            } else {

                vm.ordered.push(item);
                console.log(vm.ordered);

            }

        };

        vm.toggle = false;


        

}]).directive('stringToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return '' + value;
            });
            ngModel.$formatters.push(function(value) {
                return parseFloat(value, 10);
            });
        }
    };
}).filter('totalSumPriceQty', function () {
    return function (data, key1, key2) {
        if (angular.isUndefined(data) && angular.isUndefined(key1) && angular.isUndefined(key2))
            return 0;

        var sum = 0;
        angular.forEach(data, function (v, k) {
            sum = sum + (parseInt(v[key1]) * parseInt(v[key2]));
        });
        return sum;
    };
}).filter('sumOfValue', function () {
    return function (data, key) {
        if (angular.isUndefined(data) && angular.isUndefined(key))
            return 0;
        var sum = 0;

        angular.forEach(data, function (v, k) {
            sum = sum + parseInt(v[key]);
        });
        return sum;
    }
});

$(document).ready(function () {

    //checkout screen
    $('.checkout-init').click(function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('.checkout-view').addClass('is-visible');
        $('body').addClass('no-scroll');
        $('.modal').remove();
    });


    //modal functionality
    $('.modal-trigger').click(function(e){

        var $windowHeight = $(document).height();

        e.preventDefault();
        $('.modal').toggleClass('modal-visible');
        $('.modal').fadeIn();

        if( $('.modal-state' ).prop( "checked", true )){
            $('.modal').css('height', $windowHeight);
        }

        var top, left;

        top = Math.max($(window).height() - $(".modal-wrap").outerHeight(), 0) / 2;
        left = Math.max($(window).width() - $(".modal-wrap").outerWidth(), 0) / 2;

        $(".modal-wrap").css({

            top:top + $(window).scrollTop(),
            left:left + $(window).scrollLeft()

        });

    });

    $('.close').on('click', function () {
        $('.modal').toggleClass('modal-visible');
    });

    //equal height function
    equalheight = function(container){

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
        $(container).each(function() {

            $el = $(this);
            $($el).height('auto');
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    };


    //sets the height of div containing menu item details equal to its parent
    $(window).on('load resize', function () {

        setTimeout(function () {
            equalheight('.container .single-item');

            $('.details').each(function() {
                var calcH = $(this).parent().outerHeight( true );
                $(this).css('min-height', calcH);

            });
            
        }, 0);

    });

    $("select").change(function(){

        setTimeout(function () {
            equalheight('.container .single-item');

            $('.details').each(function() {
                var calcH = $(this).parent().outerHeight( true );
                $(this).css('min-height', calcH);

            });

        }, 200);

    });



});











