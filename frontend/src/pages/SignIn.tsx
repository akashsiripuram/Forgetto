import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/CreateContentModel";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passowordRef = useRef<HTMLInputElement>(null);
  const navigate=useNavigate();
  async function signin() {
    const username = usernameRef.current?.value;
    const password = passowordRef.current?.value;
    const response=await axios.post(`${BACKEND_URL}/v1/signin`, {
      username,
      password,
    });
    if(typeof window !== "undefined"){
    localStorage.setItem("token", response.data.token);
    }
    toast.success("Signin successful!");
    navigate("/dashboard");

  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passowordRef} placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button
            onClick={signin}
            loading={false}
            variant="primary"
            text="Signin"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
