import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import dataJson from ".././data/8887694282.json";
import bcrypt from "bcryptjs";
const jsonfile = require("jsonfile");
// import bcrypt from "bcrypt";
function Login() {
  const navigate = useNavigate();
  const [phoneNumberLogin, setPhoneNumberLogin] = useState();
  const [password, setPassword] = useState();
  const checkInputforLogin = () => {
    const regNumber = /^[0]?[56789]\d{9}$/;
    if (phoneNumberLogin == "") return alert("Please enter phone number");
    if (regNumber.test(phoneNumberLogin) === false)
      return alert("Please enter valid phone number");
    if (password == "") return alert("Please enter password");

    if (dataJson.phoneNumber === phoneNumberLogin) {
      return alert("you are already register login ");
    }
    LogInValidation();
  };
  const LogInValidation = async () => {
    /**
       bcrypt: bcrypt is a popular library for hashing passwords. It is designed to be slow and computationally expensive, making it difficult for attackers to crack the hashed passwords.
      crypto: The built-in crypto module in Node.js provides several hash functions that can be used to encrypt passwords. The crypto.pbkdf2() method can be used to generate a key from a password and a salt.
      scrypt: scrypt is a memory-hard key derivation function that is designed to be more resistant to brute-force attacks than other password-hashing algorithms. It is similar to bcrypt in that it is computationally expensive, but it is also designed to use a large amount of memory.
       Argon2: Argon2 is a password-hashing algorithm that was the winner of the Password Hashing Competition in 2015. It is designed to be resistant to both GPU and ASIC attacks and provides a high level of security.
  
       .. also perform the condition of  encruption and compare the hash of password for security but 
       recently is not workin in my laptop 
     */

    const valuu = await bcrypt.compareSync(password, dataJson.password);
    console.log("hashedPassword phoneNumberLogin", valuu, phoneNumberLogin);
    if (phoneNumberLogin === dataJson.phoneNumber && valuu) {
      alert("sucessfullly login ....");
      navigate("/update");
    } else {
      alert("you are not register");
      navigate("/registration");
    }
  };

  return (
    <div>
      <>
        <div className="LoginAuth">
          <div>
            <div className="logininputforotp">
              <h3 className="test-sign">LogIn</h3>
              <dev>
                <h2 className="authsingnin">Phone Number</h2>
                <input
                  className="inputText"
                  onChange={(e) => setPhoneNumberLogin(e.target.value)}
                  placeholder="Enter Phone Number"
                  placeholderh2Color={"#828282"}
                  value={phoneNumberLogin}
                  keyboardType="numeric"
                />
                <h2 className="authsingnin">Password</h2>
                <input
                  className="inputText"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  placeholderh2Color={"#828282"}
                  value={password}
                  keyboardType="numeric"
                />

                <div className="modelmarginleft">
                  <Button
                    className="btnsl"
                    onClick={() => {
                      checkInputforLogin();
                    }}
                  >
                    <h1 className="authsingnin-btn-login">LOGIN </h1>
                  </Button>

                  <Button className="btnsl" onClick={() => {}}>
                    <h1 className="authsingnin-btn-sign">SIGN UP</h1>
                  </Button>

                  <h2 className="authsingninotp">
                    Don't have an account? Please Sign Up
                  </h2>
                </div>
              </dev>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Login;
