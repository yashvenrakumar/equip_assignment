import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import bcrypt from "bcrypt";
import { saveAs } from "file-saver";
import bcrypt from "bcryptjs";
import AWS from "aws-sdk";
import dataJson from ".././data/8887694282.json";

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: "AKIA3KZVK3RM64X6YWWI",
  secretAccessKey: "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",
});

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [url, setUrl] = useState("www.abs/ada.png");
  const [imageArrayUrl, setImageArrayUrl] = useState(null);
  const checkInput = () => {
    if (
      phoneNumber === dataJson.phoneNumber &&
      password === dataJson.password
    ) {
      alert("you are already register ..........");
      navigate("/login");
    } else {
      const regNumber = /^[0]?[56789]\d{9}$/;

      if (firstName == "") return alert("Please enter firstName");
      if (lastName == "") return alert("Please enter lastName");
      if (phoneNumber == "") return alert("Please enter phone number");
      if (regNumber.test(phoneNumber) === false)
        return alert("Please enter valid phone number");

      if (password == "") return alert("Please enter password");

      userSignUp();
    }
  };
  // const hashedPassword = hashPassword(password);
  const userSignUp = async () => {
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
            <h3 className="test-sign">Sign In..</h3>
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
                type="password"
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
                  <h1 className="authsingnin-btn-sign">SIGN UP</h1>
                </button>
                <dev></dev>
                {/* <h1 className="authsingnin">Already SignIn? Please LogIn</h1> */}

                <button className="btnsl" onClick={() => {}}>
                  <h1 className="authsingnin-btn-login">LOGIN </h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

// const uploadImageToS3 = async (e) => {
// const configSettings = {
//   bucketName: "equip9-testing",
//   dirName: "yashvendra",
//   region: "ap-south-1",
//   accessKeyId: "AKIA3KZVK3RM64X6YWWI",
//   secretAccessKey: "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",
// };
//   var tempUri = "";

//   var fileName = `${Date.now()}-${e.name}` + ".jpeg";
//   var S3Client = new S3(configSettings);
//   await S3Client.uploadFile(e, fileName)
//     .then((data) => {
//       tempUri = data.location;
//       console.log("data", data);
//     })
//     .catch((err) => {
//       console.log("S3 Error", err);
//       alert("Error Uploading Image");
//     });

//   return tempUri;
// };

//import React, { useState } from "react";
// import AWS from "aws-sdk";

// const S3_BUCKET = "equip9-testing";
// const REGION = "ap-south-1";

// AWS.config.update({
//   accessKeyId: "AKIA3KZVK3RM64X6YWWI",
//   secretAccessKey: "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",
// });

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET },
//   region: REGION,
// });

// const Register = () => {
//   const [progress, setProgress] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileInput = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const uploadFile = async (file) => {
//     try {
//       const params = {
//         ACL: "public-read",
//         Body: file,
//         Bucket: S3_BUCKET,
//         Key: file.name,
//       };

//       await myBucket
//         .putObject(params)
//         .on("httpUploadProgress", (evt) => {
//           setProgress(Math.round((evt.loaded / evt.total) * 100));
//           console.log(
//             "Math.round((evt.loaded / evt.total) * 100",
//             Math.round((evt.loaded / evt.total) * 100)
//           );
//         })
//         .send((err) => {
//           if (err) console.log(err);
//         });
//     } catch (error) {
//       console.log("error--", error);
//     }
//   };

//   return (
//     <div>
//       <div>Native SDK File Upload Progress is {progress}%</div>
//       <input type="file" onChange={handleFileInput} />
//       <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
//     </div>
//   );
// };

// export default Register;
