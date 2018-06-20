$( function() {
	    var alertWindow, reservationDialog, reservationForm,
	 
	      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
	      time = $( "#time" ),
	      description = $( "#description" ),
	      allFields = $( [] ).add( time ).add( description ),
	      tips = $( ".validateTips" );
	 
	    function updateTips( t ) {
	      tips
	        .text( t )
	        .addClass( "ui-state-highlight" );
	      setTimeout(function() {
	        tips.removeClass( "ui-state-highlight", 1500 );
	      }, 500 );
	    }
	 
	    function checkLength( o, n, min, max ) {
	      if ( o.val().length > max || o.val().length < min ) {
	        o.addClass( "ui-state-error" );
	        updateTips( "Quantidade de caracteres da " + n + " deve estar entre " +
	          min + " e " + max + "." );
	        return false;
	      } else {
	        return true;
	      }
	    }
	 
	    function finishReservation() {
	      var valid = true;
	      allFields.removeClass( "ui-state-error" );
	 
	      valid = valid && checkLength( time, "username", 3, 16 );
	      valid = valid && checkLength( description, "descrição", 1, 585 );
	 
	      if ( valid ) {
	        $( "#users tbody" ).append( "<tr>" +
	          "<td>" + time.val() + "</td>" +
	          "<td>" + description.val() + "</td>" +
	        "</tr>" );
	        reservationDialog.dialog( "close" );
	      }
	      return valid;
	    }

	    alertWindow = $( "#dialog-confirm" ).dialog({
	      autoOpen: false,
	      resizable: false,
	      height: "auto",
	      width: 400,
	      modal: true,
	      buttons: {
	        "Continuar": function() {
	          $( this ).dialog( "close" );
	          reservationDialog.dialog( "open" );
	        },
	        Cancelar: function() {
	          $( this ).dialog( "close" );
	        }
	      }
	    });
	 
	    reservationDialog = $( "#dialog-form" ).dialog({
	      autoOpen: false,
	      resizable: false,
	      height: "auto",
	      width: 700,
	      modal: true,
	      buttons: {
	        "Send requisition": finishReservation,
	        Cancelar: function() {
	          	reservationDialog.dialog( "close" );
	        }
	      },
	      close: function() {
	        form[ 0 ].reset();
	        allFields.removeClass( "ui-state-error" );
	      }
	    });
	 
	    form = reservationDialog.find( "form" ).on( "submit", function( event ) {
	      event.preventDefault();
	      finishReservation();
	    });
	 
	    $( "#special-cases" ).button().on( "click", function() {
	      alertWindow.dialog( "open" );
	    });

	    $( "#timeBegin" ).timepicker({
	    	timeFormat: 'HH:mm',
		    interval: 60,
		    minTime: '06:00',
		    maxTime: '23:00',
		    dynamic: false,
		    dropdown: true,
		    scrollbar: true,
		    zindex: 1000
	    });
	    $(document).ready(function(){
		    $('#timeEnd').timepicker({
		        timeFormat: 'HH:mm',
			    interval: 60,
			    minTime: '06:00',
			    maxTime: '23:00',
			    dynamic: false,
			    dropdown: true,
			    scrollbar: true,
		        zindex: 1000
		    });
		});
	  } );