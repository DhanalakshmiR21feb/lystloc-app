import React from 'react';
import { useEffect,useState } from 'react';
const Home=()=>{
    const [userName,setUserName]=useState("");
    const [submitting,setSubmitting]=useState(false);
    const [tokenInfo,setTokenInfo]=useState(null);
    const [errorMessage,setErrorMessage]=useState(null);

    
  const submitForm = (e) => {
    e.preventDefault();
    if (!userName) {
      setErrorMessage(
        "something when wrong! We couldn't access the input values. :|"
      );
      return;
    }
    setSubmitting(true);

    const url = `${process.env.REACT_APP_API_BASE_URL}/createUser`;

    const options =  {   
        method: "POST",
        headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userName,
     
    }),
  };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          setErrorMessage(`${json.error}: ${json.info}`);
        } else {
          setTokenInfo(json);
          setErrorMessage(false);
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
                    required
                />
                <button id="submit-button" 
                    className='submitButton'
                    onClick={submitForm}
                    disabled={submitting}>
                    Create Token
                 </button>
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