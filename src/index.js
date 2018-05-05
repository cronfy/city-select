window.citySelect = function () {
    "use strict"

    return {
       attach: attach
   }

   function attach($e, selectedCallback) {
       var $citySelect = $e.find('[data-object=city-select]')
       var $input = $citySelect.find('[data-property=input]')
       var $found = $citySelect.find('[data-property=found]')
       var $nothing_found = $citySelect.find('[data-property=nothing-found]')
       var data = $citySelect.data('cities')

       var query = '';

       $found.on('click', 'a', function(e) {
           e.preventDefault()
           var cityId = $(this).parent().data('value')
           selectedCallback(cityId, {name: $(this).text()})
       });

       function many(qty, one, two, five) {
           var rem = qty % 100;
           if (rem >=10 && rem <= 20) return five;

           rem = qty % 10;
           if (rem == 1) return one;
           if (rem >= 2 && rem <= 4) return two;
           return five;
       }

       $.widget( "city.cityAutocomplete", $.ui.autocomplete, {
           _renderItem: function( ul, item ) {
               return $( "<div class='city " + (item.bold ? 'bold' : '') + "'><a href='#'>" + item.label +  "</a></div>" )
                   .attr( "data-value", item.id )
                   .appendTo( $found );
           },
           _renderMenu: function( ul, items ) {
               // нам не нужен ul по умолчанию
               ul.remove();

               $found.text('');
               var that = this;
               $.each( items, function( index, item ) {
                   that._renderItemData( ul, item );
               });

               if (!query) {
                   $("<div class='city small'>(всего " + data.length + ' ' + many(data.length, 'город', 'города', 'городов') + ")</div>")
                       .appendTo($found);
               }
           }
       });

       $input.cityAutocomplete({
           create: function (ui) {
               $input.cityAutocomplete("search");
           },
           source: function(request, response) {
               query = request.term;
               var filtered = [];
               if (!request.term) {
                   filtered = data.filter(function(item){
                       return item.default;
                   });
               } else {
                   var regex = new RegExp('^' + request.term, 'i');
                   filtered = data.filter(function(item){
                       return regex.test(item.value);
                   });
               }
               return response(filtered);
           },
           search: function (e) {
           },
           response: function(e, ui) {
               $found.toggle(ui.content.length > 0);
               $nothing_found.toggle(ui.content.length === 0);
           },
           minLength: 0,
           delay: 0,
       });

   }
}()