import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/CreateContentModel";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passowordRef = useRef<HTMLInputElement>(null);
  const navigate=useNavigate();
  async function signup() {
    const username = usernameRef.current?.value;
    const password = passowordRef.current?.value;
    await axios.post(`${BACKEND_URL}/v1/signup`, {
      username,
      password,
    });
    toast.success("Signup successful! You can now login.");
    navigate("/signin");
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passowordRef} placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button
            onClick={signup}
            loading={false}
            variant="primary"
            text="Signup"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
