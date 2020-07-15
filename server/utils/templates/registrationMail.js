function registrationCompletion(name, email, password) {
  let message = `<h1>Congrats ${name} </h1>
    <h2><pre>
    You have been registered Succesfully in this account.
    Your login details are:
    Email : ${email}
    Password : ${password}
    </pre></h2>`;
  return message;
}
module.exports = registrationCompletion;
