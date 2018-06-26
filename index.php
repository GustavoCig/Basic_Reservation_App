<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>JQuery Modal Test</title>
  <link rel="stylesheet" href="jquery-ui-1.12.1.custom/jquery-ui.min.css"></link>
  <link rel="stylesheet" href="css/style.css"></link>
  <link rel="stylesheet" href="css/jquery.timepicker.css">
	<script src='scripts/jquery-3.3.1.js'></script>
  <script src="jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
  <script src="scripts/jquery.timepicker.js"></script>
  <script src="scripts/script.js"></script>
  
</head>
<body>

<div id="dialog-confirm" title="Special requisitions alert">
  <p>Requisition for special cases or those not serviceable by the options found in the reservation system, is inheritenly slower, being avaluated by a moderation group, which can, eventualy, deny the requisition.</p>
  <p>All results regarding the status of your requisition are going to be forwarded through e-mail.</p>
  <p>Also, any and all requisitions made through this special menu that could be fulfilled through the options found in the regular system, are going to be denied by default</p>
  <p>Would you like to continue?</p>


<!-- Above warning message, but in portuguese

  <p>O requerimento de reservas para casos especiais ou não contemplados pelas opções dispostas no sistema, é um requerimento mais lento, que passará pela avaliação de um grupo moderador, podendo ser, inclusive, eventualmente negada.</p><p>Qualquer resultado a cerca do requerimento será repassado ao usuário cadastrante através de e-mail.</p><p>Ademais, qualquer requisição formalizada através deste requerimento especial cuja qual pudesse ser contemplada por opções já presentes no sistema será negada.</p><p>Deseja continuar com cadastro?</p>
  -->

</div>

<div id="dialog-form" title="Criar requisição especial">
  <p class="validateTips">Fill all fields</p>
 
  <form>
    <fieldset>
      <label for="timeBegin">Begins</label>
      <input type="text" name="timeBegin" id="timeBegin" class="text ui-widget-content ui-corner-all" readonly>
      <label for="timeEnd">Ends</label>
      <input type="text" name="timeEnd" id="timeEnd" class="text ui-widget-content ui-corner-all" readonly>
      <label for="description">Description</label>
      <textarea type="textarea" name="description" id="description" rows="8" cols="70" maxlength="585" required placeholder='Describe your requisition in the most complete and detailed way you can. Example: "I would like to reserve Room X in the specified timeslot above every first monday of each month.' class="text ui-widget-content ui-corner-all"></textarea>

      <!-- Above textarea element, but with it's placeholder/description in portuguese

      <textarea type="textarea" name="description" id="description" rows="8" cols="70" maxlength="585" required placeholder='Descreva sua requisição da forma mais completa e detalhada possível. Exemplo: "Desejo reservar a Sala X na hora especificada acima toda a primeira segunda-feira de cada mês."'></textarea>

      -->
      
      <!-- Allow form submission with keyboard without duplicating the dialog button -->
      <input type="Enviar requisição" tabindex="-1" style="position:absolute; top:-1000px">
    </fieldset>
  </form>
</div>

<div id="reservation-confirm" title="Reservation requisition sent">
  <p>Requisition sent for analysis, confirmation or denial will be sent through e-mail.</p>
  <?php 

    $message = 'Line 1\r\nLine 2\r\nLine 3';
    $message = wordwrap($message, 70, "\r\n");

    if(mail('gustavocignachi@hotmail.com', 'test PHP', $message)){
        echo "The email was successfully sent.";
    } else {
        echo "The email was NOT sent.";
    } ?>
</div>
 
<div id="users-contain" class="ui-widget">
  <h1>Registered Reservations:</h1>
  <table id="users" class="ui-widget ui-widget-content">
    <thead>
      <tr class="ui-widget-header ">
        <th>Beginning at</th>
        <th>Ending at</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      </tr>
    </tbody>
  </table>
</div>
<button id="special-cases">Register a special reservation</button>


</body>
</html>