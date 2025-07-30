import { useRef, useState } from "react";
import { CrossIcon } from "../../Icons/CrossIcon";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum contentType {
  Youtube = "youtube",
  Twitter = "twitter",
}
export default function CreateContentModel({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(contentType.Youtube);
  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    await axios.post(`${BACKEND_URL}/v1/content`,{link,type,title},{
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    onClose();
  }
  return (
    <div>
      {open && (
        <div>
          <div className="flex justify-center w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60"></div>
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white  opacity-100 p-4 rounded">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input ref={titleRef} placeholder="Title" />
                  <Input ref={linkRef} placeholder="Link" />
                </div>
                <div>
                  <h1>Type</h1>
                  <div className="flex gap-1 p-4">
                  <Button
                    onClick={() => setType(contentType.Youtube)}
                    variant={
                      type === contentType.Youtube ? "primary" : "secondary"
                    }
                    text="Youtube"
                  />
                  <Button
                    onClick={() => setType(contentType.Twitter)}
                    variant={
                      type === contentType.Twitter ? "primary" : "secondary"
                    }
                    text="Twitter"
                  />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Submit"
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
//@ts-ignore
export function Input({
  ref,
  placeholder,
}: {
  placeholder: string;
  ref?: any;
}) {
  return (
    <div>
      <input
        ref={ref}
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border rounded m-2"></input>
    </div>
  );
}
