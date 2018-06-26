$( function() {
	    var alertWindow, reservationDialog, reservationForm, reservationConfirm,
	 
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
	        updateTips( "Number of characters of " + n + " has to be between " +
	          min + " and " + max + "." );
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
	      valid = valid && checkLength( description, "description", 1, 585 );
	 
	      if ( valid ) {
	        $( "#users tbody" ).append( "<tr>" +
	          "<td>" + begin.val() + "</td>" +
	          "<td>" + end.val() + "</td>" +
	          "<td>" + description.val() + "</td>" +
	        "</tr>" );
	        
	      }
	      reservationDialog.dialog( "close" );
	      reservationConfirm.dialog( "open" );

	      return valid;
	    }

	    alertWindow = $( "#dialog-confirm" ).dialog({
	      autoOpen: false,
	      resizable: false,
	      height: "auto",
	      width: 400,
	      modal: true,
	      buttons: {
	        "Continue": function() {
	          $( this ).dialog( "close" );
	          reservationDialog.dialog( "open" );
	        },
	        Cancel: function() {
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

	    reservationConfirm = $( "#reservation-confirm" ).dialog({
	    	autoOpen: false,
	      	resizable: false,
		    height: "auto",
		    width: "auto",
		    modal: true,
		    buttons: {
		    	"Confirm": function() {
		        	$( this ).dialog( "close" );
		        }
		    }
	    }),
	 
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