fetch("/messageslogfile.json",{
    headers: {
      'Cache-Control': 'no-cache'
    }
  })
.then(function(response){
   return response.json();
})
.then(function(messages){
   let placeholder = document.querySelector("#data-output");
   let out = "";
   for(let message of messages){
      out += `
         <tr>
            <td>${message.username}</td>
            <td>${message.datesend}</td>
            <td>${message.timesend}</td>
            <td>${message.notificationtype}</td>
            <td>${message.category}</td>
            <td>${message.messagedata}</td>
         </tr>
      `;
   }
   console.log(out);
   placeholder.innerHTML = out;

});