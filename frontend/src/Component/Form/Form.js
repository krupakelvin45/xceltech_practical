import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../API/users";

function Form() {

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[userData,setUserData] = useState({});
  let navigate = useNavigate(); 

  async function login(e)
  {
    e.preventDefault();
    const userData = await userAPI.login(email,password);
    console.log(userData);
    setUserData(userData);
    if(userData.id){
      navigate("/products",{state:userData})
    }
  }

  async function signup(e)
  {
    e.preventDefault();
    const userData = await userAPI.userSignup(email,password);
    console.log(userData);
    setUserData(userData);
    if(userData.id){
      navigate("/products",{state:userData})
    }
  }

  return (
    <div className="container">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={(e)=>login(e)}>
          Login
        </button>
        <button type="submit" class="btn btn-primary ms-4" onClick={(e)=>signup(e)}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Form;
