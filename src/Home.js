import React from 'react';
import { useEffect,useState } from 'react';
import { config } from "../src/App";

const Home=()=>{
    const [userName,setUserName]=useState("");
    const [submitting,setSubmitting]=useState(false);
    const [tokenInfo,setTokenInfo]=useState(null);
    const [errorMessage,setErrorMessage]=useState(null);

 
// window.onload = function(){
//   alert("loaded");
// }
window.addEventListener("load", myFunction);
      
    function myFunction() {
      console.log("Inside form onload");
      const urlToken = `${config.endpoint}/generateToken`;
      console.log(urlToken);
          const options1 =  {   
              method: "GET",
              headers: {
            "Content-Type": "application/json",
          },
          mode:"no-cors",
        };
         fetch(urlToken, options1)
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
              if (json.error) {
                setErrorMessage(`${json.error}: ${json.info}`);
              } else {
                setTokenInfo(json);
                setErrorMessage("Token created");
              }
              setSubmitting(false);
            })
            .catch((err) => {
              setErrorMessage(" Please try again.");
              setSubmitting(false);
            });
        
      document.getElementById("message").innerHTML = "Token is generated.";
    };

  
    
  const submitForm = (e) => {
    e.preventDefault();
    if (!userName) {
      setErrorMessage(
        "something when wrong! We couldn't access the input values. :|"
      );
      return;
    }
    setSubmitting(true);
   
    const urlCreateUser = `${config.endpoint}/createUser`;
console.log(urlCreateUser);
    const options2 =  {   
        method: "POST",
        headers: {
      "Content-Type": "application/json",
    },
    mode:"no-cors",
    body: JSON.stringify({
      name: userName,
      
    }),
  };

    fetch(urlCreateUser, options2)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          setErrorMessage(`${json.error}: ${json.info}`);
        } else {
          setTokenInfo(json);
          setErrorMessage(false);
          document.getElementById("message").innerHTML = "User is Created.";
        }
        setSubmitting(false);
      })
      .catch((err) => {
        setErrorMessage(" Please try again.");
        setSubmitting(false);
      });
  };

  const handleClearButton = (e) => {
    setTokenInfo(null);
    setUserName("");
  };
  const handleInputChange = (e) => {
    if (e?.target?.value) {
      setUserName(e.target.value);
    }
   
  };

    return (
        <div className='Container'>
            <form onSubmit={submitForm} type="submit" className='Form'>
                <label>Enter the UserName</label>
                <input className='inputfield'
                    type="text"
                    onChange={handleInputChange}
                    id="userName"
                    title='UserName'
                    required
                />
                 <input type="hidden"               
                    id="tokenInfo"
                    title='TOKEN'
                     />
             
                <button id="submit-button" 
                    className='submitButton'
                    onClick={submitForm}
                    disabled={submitting}>
                    Submit
                 </button>
                 <p id='message'></p>
                    {errorMessage && <div className='errMessage'>{errorMessage}</div>}
                    {tokenInfo &&
                        <div><button id="clear-button" 
                            onClick={handleClearButton}>Clear</button>
                        <div> 
                            <label>Token Generated :</label>
                            <div>${tokenInfo}</div>
                            <p className='errMessage'>Please Save the Token Info as we do not save your token anywhere</p>
                        </div>
                    </div>
                }
            </form>
        </div>
    );

};
export default Home;