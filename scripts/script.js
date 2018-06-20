$( function() {
	    var alertWindow, reservationDialog, reservationForm,
	 
	      begin = $( "#timeBegin" ),
	      end = $( "#timeEnd" ),
	      description = $( "#description" ),
	      allFields = $( [] ).add( begin ).add( end ).add( description ),
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

	    function checkDates( begin, end ) {
	    	if( begin.val() === "" || end.val() === "" ) {
	    		begin.addClass( "ui-state-error" );
	    		end.addClass( "ui-state-error" );
	    		updateTips( "One of the time fields has been left empty." );
	    		return false;
	    	} else if( begin.val() >= end.val() ) {
	    		begin.addClass( "ui-state-error" );
	    		end.addClass( "ui-state-error" );
	    		updateTips( "Beginning time is bigger or equal to ending time." );
	    		return false;
	    	} else {
	    		return true;
	    	}
	    }
	 
	    function finishReservation() {
	      var valid = true;
	      allFields.removeClass( "ui-state-error" );
	 
	      valid = valid && checkDates( begin, end );
	      valid = valid && checkLength( description, "descrição", 1, 585 );
	 
	      if ( valid ) {
	        $( "#users tbody" ).append( "<tr>" +
	          "<td>" + begin.val() + "</td>" +
	          "<td>" + end.val() + "</td>" +
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
	  } );