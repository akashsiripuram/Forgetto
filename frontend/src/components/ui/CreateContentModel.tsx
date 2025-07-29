import { CrossIcon } from "../../Icons/CrossIcon";
import { Button } from "./Button";

export default function CreateContentModel({ open, onClose }) {
  return (
    <div>
      {open && (
        <div className="flex justify-center w-screen h-screen bg-black fixed top-0 left-0 opacity-60">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input placeholder="Title" />
                <Input placeholder="Link" />
              </div>
              <div className="flex justify-center">
                <Button variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function Input({ onChange, placeholder }: { placeholder:string,onChange?: () => void }) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border rounded m-2"
        onChange={onChange}></input>
    </div>
  );
}
