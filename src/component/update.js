import React, { useEffect, useState } from "react";

import { saveAs } from "file-saver";
// import bcrypt from "bcryptjs";
import dataJson from ".././data/8887694282.json";
import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: "AKIA3KZVK3RM64X6YWWI",
  secretAccessKey: "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",
});

function Update() {
  const [firstName, setFirstName] = useState(dataJson.firstName);
  const [lastName, setlastName] = useState(dataJson.lastName);
  const [phoneNumber, setPhoneNumber] = useState(dataJson.phoneNumber);
  const [password, setPassword] = useState(dataJson.password);
  const [url, setUrl] = useState(dataJson.url);
  const [imageArrayUrl, setImageArrayUrl] = useState(null);
  const checkInput = () => {
    const regNumber = /^[0]?[56789]\d{9}$/;

    if (firstName == "") return alert("Please enter firstName");
    if (lastName == "") return alert("Please enter lastName");
    if (phoneNumber == "") return alert("Please enter phone number");
    if (regNumber.test(phoneNumber) === false)
      return alert("Please enter valid phone number");

    if (password == "") return alert("Please enter password");

    update();
  };
  // const hashedPassword = hashPassword(password);
  const update = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: password,
      url: url,
    };
    const jsonData = JSON.stringify(data);

    // Create a new Blob with the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });

    // Use the saveAs() function from the FileSaver.js library to download the JSON file
    saveAs(blob, `${phoneNumber}.json`);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    var tempUri = await uploadImageToS3(file);
    console.log("tempUri", tempUri);
  };

  const uploadImageToS3 = async (e) => {
    try {
      const configSettings = {
        bucketName: "equip9-testing",
        dirName: "yashvendra",
        region: "ap-south-1",
        accessKeyId: "AKIA3KZVK3RM64X6YWWI",
        secretAccessKey: "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",
      };

      var tempUri = [];

      var fileName = `${Date.now()}-${e.name}` + ".jpeg";
      var S3Client = new AWS.S3(configSettings);
      await S3Client.uploadFile(e, fileName)
        .then((data) => {
          tempUri.push(data.location);
        })
        .catch((err) => {
          console.log("S3 Error", err);
          alert("Error Uploading Image");
        });

      return tempUri[0];
    } catch (error) {
      console.log("error--", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // const saltRounds = 10; // the number of salt rounds to use
  // function hashPassword(password) {
  //   const salt = bcrypt.genSaltSync(saltRounds);
  //   const hash = bcrypt.hashSync(password, salt);
  //   return hash;
  // }
  return (
    <>
      <div className="LoginAuth">
        <div>
          <div className="logininput">
            <h3 className="test-sign">Login sucessfullly </h3>
            <form onSubmit={handleSubmit}>
              <label>
                Choose a file:
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleImageUpload}
                  multiple
                />
              </label>
              <button type="submit">Upload</button>
            </form>

            <>
              <h1 className="authsingnin">First Name</h1>
              <input
                className="inputText"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
                placeholderColor={"#828282"}
                value={firstName}
              />
              <h1 className="authsingnin">Lat Name</h1>
              <input
                className="inputText"
                onChange={(e) => setlastName(e.target.value)}
                placeholder="Enter Lart Name"
                placeholderColor={"#828282"}
                value={lastName}
              />
              <h1 className="authsingnin">Phone Number</h1>
              <input
                className="inputText"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
                placeholderColor={"#828282"}
                value={phoneNumber}
                keyboardType="numeric"
              />

              <h1 className="authsingnin">password</h1>
              <input
                className="inputText"
                onChange={(e) => setPassword(e.target.value)}
                // editable={!spinnerState}
                placeholder="Enter password"
                placeholderColor={"#828282"}
                value={password}
              />
            </>
            <div>
              <div className="btnslmain">
                <button
                  className="btnsl"
                  onClick={() => {
                    checkInput();
                    // navigation.navigate("login");
                  }}
                >
                  <h1 className="authsingnin-btn-sign">Update</h1>
                </button>
                <dev></dev>
                {/* <h1 className="authsingnin">Already SignIn? Please LogIn</h1> */}

                {/* <button className="btnsl" onClick={() => {}}>
                  <h1 className="authsingnin-btn-login">LOGIN </h1>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;
